import { withRetry, withBaseUrl, withCache, withTiming, composeHOFs } from "./hof-wrappers"

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2"


const baseFetch = withBaseUrl(POKEAPI_BASE_URL)


const enhancedFetch = composeHOFs(baseFetch, [
  (fn) => withRetry(fn, 3, 500),
  (fn) => withCache(fn, 300000), // 5 minute cache
  (fn) => withTiming(fn, "Pokemon API Request"),
])

export const pokemonClient = {
  searchPokemon: async (query: string) => {
    const response = await enhancedFetch(`/pokemon/${query.toLowerCase()}`)
    if (!response.ok) {
      throw new Error(`Pokemon not found: ${query}`)
    }
    return response.json()
  },

 
  getMultiplePokemon: async (limit = 20, offset = 0) => {
    const response = await enhancedFetch(`/pokemon?limit=${limit}&offset=${offset}`)
    if (!response.ok) {
      throw new Error("Failed to fetch Pokemon list")
    }
    return response.json()
  },

  getPokemonByUrl: async (url: string) => {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Failed to fetch Pokemon details")
    }
    return response.json()
  },
}
