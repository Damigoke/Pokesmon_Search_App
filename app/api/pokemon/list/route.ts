import { type NextRequest, NextResponse } from "next/server"
import { composeMiddleware, withErrorHandling, withLogging, withCORS } from "@/lib/middleware/route-middleware"
import { pokemonClient } from "@/lib/api/pokemon-client"


async function listHandler(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const limit = Number.parseInt(searchParams.get("limit") || "20")
  const offset = Number.parseInt(searchParams.get("offset") || "0")

  const response = await pokemonClient.getMultiplePokemon(limit, offset)

 
  const pokemonDetails = await Promise.all(
    response.results.map((p: { url: string }) => pokemonClient.getPokemonByUrl(p.url)),
  )

  return NextResponse.json({
    success: true,
    data: pokemonDetails,
    count: response.count,
    timestamp: new Date().toISOString(),
  })
}


const enhancedHandler = composeMiddleware(withErrorHandling, withLogging, withCORS)(listHandler)

export async function GET(req: NextRequest) {
  return enhancedHandler(req)
}
