/**
 * Route Middleware HOFs for Pokesmon API routes
 */

import { type NextRequest, NextResponse } from "next/server"

export type RouteHandler = (req: NextRequest) => Promise<NextResponse>

export function withErrorHandling(handler: RouteHandler): RouteHandler {
  return async (req: NextRequest) => {
    try {
      return await handler(req)
    } catch (error) {
      console.error(" API Error:", error)
      return NextResponse.json(
        {
          error: error instanceof Error ? error.message : "Internal server error",
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      )
    }
  }
}

export function withCORS(handler: RouteHandler): RouteHandler {
  return async (req: NextRequest) => {
    const response = await handler(req)
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type")
    return response
  }
}


export function withLogging(handler: RouteHandler): RouteHandler {
  return async (req: NextRequest) => {
    const start = Date.now()
    console.log(` ${req.method} ${req.url} - Started`)

    const response = await handler(req)

    const duration = Date.now() - start
    console.log(` ${req.method} ${req.url} - ${response.status} (${duration}ms)`)

    return response
  }
}


const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function withRateLimit(handler: RouteHandler, maxRequests = 10, windowMs = 60000): RouteHandler {
  return async (req: NextRequest) => {
    const ip = req.headers.get("x-forwarded-for") || "unknown"
    const now = Date.now()
    const record = rateLimitMap.get(ip)

    if (record && now < record.resetTime) {
      if (record.count >= maxRequests) {
        return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })
      }
      record.count++
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    }

    return handler(req)
  }
}


export function composeMiddleware(...middlewares: Array<(handler: RouteHandler) => RouteHandler>) {
  return (handler: RouteHandler): RouteHandler => {
    return middlewares.reduceRight((wrapped, middleware) => middleware(wrapped), handler)
  }
}
