"use client"

import type React from "react"

import { useState } from "react"
import { Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { usePokemonStore } from "@/lib/store/pokemon-store"
import { transformPokemon } from "@/lib/utils/pokemon-transformers"

export function PokemonSearch() {
  const [query, setQuery] = useState("")
  const { setPokemons, setLoading, setError, isLoading, setSearchQuery } = usePokemonStore()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setSearchQuery(query)
    setError(null)

    try {
      const response = await fetch(`/api/pokemon/search?q=${encodeURIComponent(query.trim())}`)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch Pokemon")
      }

      // Transform the single Pokemon into an array
      const transformed = transformPokemon(result.data) as any
      setPokemons([transformed])
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred")
      setPokemons([])
    } finally {
      setLoading(false)
    }
  }

  const loadRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 898) + 1
    setQuery(randomId.toString())
    setLoading(true)
    setSearchQuery(`Random: ${randomId}`)

    try {
      const response = await fetch(`/api/pokemon/search?q=${randomId}`)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch Pokemon")
      }

      const transformed = transformPokemon(result.data) as any
      setPokemons([transformed])
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred")
      setPokemons([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name or ID (e.g., pikachu, 25)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 text-base"
            disabled={isLoading}
          />
        </div>
        <Button type="submit" size="lg" disabled={isLoading || !query.trim()} className="h-12 px-8">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
        </Button>
      </form>
      <div className="flex justify-center">
        <Button variant="outline" onClick={loadRandomPokemon} disabled={isLoading} className="gap-2 bg-transparent">
          Surprise Me
        </Button>
      </div>
    </div>
  )
}
