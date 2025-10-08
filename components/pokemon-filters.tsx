"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { usePokemonStore } from "@/lib/store/pokemon-store"
import { filterByType, filterByMinStats, sortPokemon, calculateAggregateStats } from "@/lib/utils/pokemon-transformers"
import { Filter, TrendingUp, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
]

export function PokemonFilters() {
  const { pokemons, setPokemons } = usePokemonStore()
  const [selectedType, setSelectedType] = useState<string>("all")
  const [minStats, setMinStats] = useState<number>(0)
  const [sortBy, setSortBy] = useState<"name" | "id" | "totalStats" | "averageStat">("id")
  const [originalPokemons] = useState(pokemons)

  if (pokemons.length === 0) return null

  // Calculate aggregate stats using reduce
  const stats = calculateAggregateStats(pokemons)

  const applyFilters = () => {
    let filtered = [...originalPokemons]

    // Apply type filter using functional filter
    if (selectedType !== "all") {
      filtered = filterByType(filtered, selectedType)
    }

    // Apply stats filter using functional filter
    if (minStats > 0) {
      filtered = filterByMinStats(filtered, minStats)
    }

    // Apply sorting using functional sort
    filtered = sortPokemon(filtered, sortBy)

    setPokemons(filtered)
  }

  const clearFilters = () => {
    setSelectedType("all")
    setMinStats(0)
    setSortBy("id")
    setPokemons(originalPokemons)
  }

  const hasActiveFilters = selectedType !== "all" || minStats > 0 || sortBy !== "id"

  return (
    <div className="space-y-4">
      <Card className="border-2">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters & Sorting
            </h3>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
                <X className="h-3 w-3" />
                Clear
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Filter by Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  {POKEMON_TYPES.map((type) => (
                    <SelectItem key={type} value={type} className="capitalize">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Min Total Stats</label>
              <Select value={minStats.toString()} onValueChange={(v) => setMinStats(Number(v))}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any</SelectItem>
                  <SelectItem value="300">300+</SelectItem>
                  <SelectItem value="400">400+</SelectItem>
                  <SelectItem value="500">500+</SelectItem>
                  <SelectItem value="600">600+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">Pokedex Number</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="totalStats">Total Stats</SelectItem>
                  <SelectItem value="averageStat">Average Stat</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={applyFilters} className="w-full gap-2">
            <Filter className="h-4 w-4" />
            Apply Filters
          </Button>
        </CardContent>
      </Card>

      {stats.totalPokemon > 0 && (
        <Card className="border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardContent className="p-6">
            <h3 className="font-semibold flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4" />
              Aggregate Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Pokemon</p>
                <p className="text-2xl font-bold">{stats.totalPokemon}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Average Stats</p>
                <p className="text-2xl font-bold">{stats.averageStats}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Strongest</p>
                <p className="text-lg font-bold capitalize">{stats.strongestPokemon?.displayName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Most Common Type</p>
                <Badge className="capitalize">{stats.mostCommonType}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
