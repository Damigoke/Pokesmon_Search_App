"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { usePokemonStore } from "@/lib/store/pokemon-store"
import { transformPokemon } from "@/lib/utils/pokemon-transformers"
import { Loader2, Sparkles } from "lucide-react"

export function PokemonLoader() {
  const [isLoading, setIsLoading] = useState(false)
  const { setPokemons, setLoading, setError } = usePokemonStore()

  const loadMultiplePokemon = async (limit = 20) => {
    setIsLoading(true)
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/pokemon/list?limit=${limit}&offset=0`)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch Pokemon")
      }

      const transformed = result.data.map(transformPokemon)
      setPokemons(transformed)
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred")
      setPokemons([])
    } finally {
      setIsLoading(false)
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Button
        variant="outline"
        onClick={() => loadMultiplePokemon(10)}
        disabled={isLoading}
        className="gap-2 bg-transparent"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
        Load 10 Pokemon
      </Button>
      <Button
        variant="outline"
        onClick={() => loadMultiplePokemon(20)}
        disabled={isLoading}
        className="gap-2 bg-transparent"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
        Load 20 Pokemon
      </Button>
      <Button
        variant="outline"
        onClick={() => loadMultiplePokemon(50)}
        disabled={isLoading}
        className="gap-2 bg-transparent"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
        Load 50 Pokemon
      </Button>
    </div>
  )
}
