
import { create } from "zustand"
import { TransformedPokemon } from "../types/pokemon"

export interface Pokemon {
  id: number
  name: string
  sprites: {
    front_default: string
    other: {
      "official-artwork": {
        front_default: string
      }
    }
  }
  types: Array<{
    type: {
      name: string
    }
  }>
  stats: Array<{
    base_stat: number
    stat: {
      name: string
    }
  }>
  height: number
  weight: number
  abilities: Array<{
    ability: {
      name: string
    }
  }>
}

interface PokemonStore {
  pokemons: Pokemon[]
  isLoading: boolean
  error: string | null
  searchQuery: string
  setPokemons: (pokemons: Pokemon[]) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  setSearchQuery: (query: string) => void
  clearResults: () => void
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  pokemons: [],
  isLoading: false,
  error: null,
  searchQuery: "",
  setPokemons: (pokemons) => set({ pokemons , error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  clearResults: () => set({ pokemons: [], error: null, searchQuery: "" }),
}))
