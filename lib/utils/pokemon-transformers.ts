/**
 * Functional data transformations for Pokemon data
 * Demonstrates map, filter, reduce, and other functional patterns
 */

import type { Pokemon } from "@/lib/store/pokemon-store"
import type { TransformedPokemon } from "@/lib/types/pokemon"

// Transform raw Pokemon data into user-friendly format
export function transformPokemon(pokemon: Pokemon): TransformedPokemon {
  // Use reduce to calculate total stats
  const totalStats = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)

  // Use map to extract stat values into structured object
  const statsMap = pokemon.stats.reduce((acc, stat) => {
    const statName = stat.stat.name
      .replace("special-attack", "specialAttack")
      .replace("special-defense", "specialDefense")
    return { ...acc, [statName]: stat.base_stat }
  }, {} as any)

  return {
    id: pokemon.id,
    name: pokemon.name,
    displayName: pokemon.name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    image: pokemon.sprites.other["artworks"].front_default || pokemon.sprites.front_default,
    types: pokemon.types.map((t) => t.type.name),
    totalStats,
    averageStat: Math.round(totalStats / pokemon.stats.length),
    primaryType: pokemon.types[0].type.name,
    height: pokemon.height,
    weight: pokemon.weight,
    abilities: pokemon.abilities.map((a) => a.ability.name),
    stats: {
      hp: statsMap.hp || 0,
      attack: statsMap.attack || 0,
      defense: statsMap.defense || 0,
      specialAttack: statsMap.specialAttack || 0,
      specialDefense: statsMap.specialDefense || 0,
      speed: statsMap.speed || 0,
    },
  }
}


export function filterByType(pokemons: TransformedPokemon[], type: string): TransformedPokemon[] {
  return pokemons.filter((p) => p.types.includes(type.toLowerCase()))
}


export function filterByMinStats(pokemons: TransformedPokemon[], minTotal: number): TransformedPokemon[] {
  return pokemons.filter((p) => p.totalStats >= minTotal)
}


export function sortPokemon(
  pokemons: TransformedPokemon[],
  sortBy: "name" | "id" | "totalStats" | "averageStat" = "id",
): TransformedPokemon[] {
  return [...pokemons].sort((a, b) => {
    if (sortBy === "name") return a.displayName.localeCompare(b.displayName)
    return (b[sortBy] as number) - (a[sortBy] as number)
  })
}


export function groupByType(pokemons: TransformedPokemon[]): Map<string, TransformedPokemon[]> {
  return pokemons.reduce((groups, pokemon) => {
    pokemon.types.forEach((type) => {
      const existing = groups.get(type) || []
      groups.set(type, [...existing, pokemon])
    })
    return groups
  }, new Map<string, TransformedPokemon[]>())
}


export function calculateAggregateStats(pokemons: TransformedPokemon[]) {
  if (pokemons.length === 0) {
    return {
      totalPokemon: 0,
      averageStats: 0,
      strongestPokemon: null,
      mostCommonType: null,
    }
  }

  
  const strongestPokemon = pokemons.reduce((strongest, current) =>
    current.totalStats > strongest.totalStats ? current : strongest,
  )

 
  const totalStatsSum = pokemons.reduce((sum, p) => sum + p.totalStats, 0)
  const averageStats = Math.round(totalStatsSum / pokemons.length)

 
  const typeCounts = pokemons.reduce(
    (counts, pokemon) => {
      pokemon.types.forEach((type) => {
        counts[type] = (counts[type] || 0) + 1
      })
      return counts
    },
    {} as Record<string, number>,
  )

  const mostCommonType = Object.entries(typeCounts).reduce(
    (most, [type, count]) => (count > (most.count || 0) ? { type, count } : most),
    { type: "", count: 0 },
  )

  return {
    totalPokemon: pokemons.length,
    averageStats,
    strongestPokemon,
    mostCommonType: mostCommonType.type,
  }
}
