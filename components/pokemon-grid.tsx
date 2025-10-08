"use client"

import { usePokemonStore } from "@/lib/store/pokemon-store"
import { PokemonCard } from "./pokemon-card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"

export function PokemonGrid() {
  const { pokemons, isLoading, error } = usePokemonStore()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Searching for Pokemon...</p>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (pokemons.length === 0) {
    return (
      <div className="text-center py-20 space-y-4">
        <div className="text-6xl">🔍</div>
        <h3 className="text-xl font-semibold text-balance">No Pokemon Found</h3>
        <p className="text-muted-foreground text-pretty">Try searching for a Pokemon by name or ID</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  )
}
