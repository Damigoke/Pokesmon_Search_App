/**
 * Higher-Order Functions for API requests
 */


export function withRetry<T extends (...args: any[]) => Promise<any>>(fn: T, maxRetries = 3, delayMs = 1000): T {
  return (async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    let lastError: Error | null = null

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await fn(...args)
      } catch (error) {
        lastError = error as Error
        console.log(`Retry attempt ${attempt + 1}/${maxRetries} failed:`, error)

        if (attempt < maxRetries - 1) {
          await new Promise((resolve) => setTimeout(resolve, delayMs * (attempt + 1)))
        }
      }
    }

    throw lastError || new Error("Max retries exceeded")
  }) as T
}


export function withBaseUrl(baseUrl: string) {
  return async function fetchWithBase(endpoint: string, options?: RequestInit) {
    const url = endpoint.startsWith("http") ? endpoint : `${baseUrl}${endpoint}`
    console.log("Fetching from:", url)
    return fetch(url, options)
  }
}


export function withCache<T extends (...args: any[]) => Promise<any>>(fn: T, ttlMs = 60000): T {
  const cache = new Map<string, { data: any; timestamp: number }>()

  return (async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    const cacheKey = JSON.stringify(args)
    const cached = cache.get(cacheKey)

    if (cached && Date.now() - cached.timestamp < ttlMs) {
      console.log(" Cache hit for:", cacheKey)
      return cached.data
    }

    console.log(" Cache miss, fetching fresh data")
    const result = await fn(...args)
    cache.set(cacheKey, { data: result, timestamp: Date.now() })
    return result
  }) as T
}


export function withTiming<T extends (...args: any[]) => Promise<any>>(fn: T, label = "Function"): T {
  return (async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    const start = performance.now()
    try {
      const result = await fn(...args)
      const duration = performance.now() - start
      console.log(` ${label} took ${duration.toFixed(2)}ms`)
      return result
    } catch (error) {
      const duration = performance.now() - start
      console.log(` ${label} failed after ${duration.toFixed(2)}ms`)
      throw error
    }
  }) as T
}


export function composeHOFs<T extends (...args: any[]) => Promise<any>>(fn: T, wrappers: Array<(fn: T) => T>): T {
  return wrappers.reduce((wrappedFn, wrapper) => wrapper(wrappedFn), fn)
}
