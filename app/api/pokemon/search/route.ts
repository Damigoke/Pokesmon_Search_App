import { type NextRequest, NextResponse } from "next/server"
import { composeMiddleware, withErrorHandling, withLogging, withCORS } from "@/lib/middleware/route-middleware"
import { pokemonClient } from "@/lib/api/pokemon-client"


async function searchHandler(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 })
  }

  const pokemon = await pokemonClient.searchPokemon(query)

  return NextResponse.json({
    success: true,
    data: pokemon,
    timestamp: new Date().toISOString(),
  })
}


const enhancedHandler = composeMiddleware(withErrorHandling, withLogging, withCORS)(searchHandler)

export async function GET(req: NextRequest) {
  return enhancedHandler(req)
}
