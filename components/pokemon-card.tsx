"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TransformedPokemon } from "@/lib/types/pokemon"
import { Sparkles, Zap, Shield, Heart, Gauge } from "lucide-react"
import Image from "next/image"

interface PokemonCardProps {
  pokemon: TransformedPokemon
}

const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-cyan-300",
  fighting: "bg-red-600",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-yellow-700",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-600",
  dark: "bg-gray-700",
  steel: "bg-gray-500",
  fairy: "bg-pink-400",
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2">
      <CardHeader className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-balance">{pokemon.displayName}</CardTitle>
            <p className="text-sm text-muted-foreground">#{pokemon.id.toString().padStart(3, "0")}</p>
          </div>
          <div className="flex gap-2">
            {pokemon.types.map((type) => (
              <Badge key={type} className={`${typeColors[type]} text-white border-0`}>
                {type}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-center">
          <div className="relative w-48 h-48 bg-gradient-to-br from-muted/50 to-muted rounded-full p-4">
            <Image
              src={pokemon.image || "/placeholder.svg?height=200&width=200"}
              alt={pokemon.displayName}
              width={200}
              height={200}
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground">Height</p>
            <p className="font-semibold">{(pokemon.height / 10).toFixed(1)} m</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Weight</p>
            <p className="font-semibold">{(pokemon.weight / 10).toFixed(1)} kg</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Stats
            </h3>
            <Badge variant="secondary" className="font-mono">
              Total: {pokemon.totalStats}
            </Badge>
          </div>

          <div className="space-y-2">
            <StatBar icon={Heart} label="HP" value={pokemon.stats.hp} max={255} color="bg-red-500" />
            <StatBar icon={Zap} label="Attack" value={pokemon.stats.attack} max={255} color="bg-orange-500" />
            <StatBar icon={Shield} label="Defense" value={pokemon.stats.defense} max={255} color="bg-yellow-500" />
            <StatBar
              icon={Sparkles}
              label="Sp. Atk"
              value={pokemon.stats.specialAttack}
              max={255}
              color="bg-blue-500"
            />
            <StatBar
              icon={Shield}
              label="Sp. Def"
              value={pokemon.stats.specialDefense}
              max={255}
              color="bg-green-500"
            />
            <StatBar icon={Gauge} label="Speed" value={pokemon.stats.speed} max={255} color="bg-purple-500" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-sm">Abilities</h3>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map((ability) => (
              <Badge key={ability} variant="outline" className="capitalize">
                {ability.replace("-", " ")}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface StatBarProps {
  icon: React.ElementType
  label: string
  value: number
  max: number
  color: string
}

function StatBar({ icon: Icon, label, value, max, color }: StatBarProps) {
  const percentage = (value / max) * 100

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Icon className="h-3 w-3" />
          {label}
        </span>
        <span className="font-mono font-semibold">{value}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
