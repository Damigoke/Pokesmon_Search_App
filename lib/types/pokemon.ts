export interface PokemonType {
  type: {
    name: string
  }
}

export interface PokemonStat {
  base_stat: number
  stat: {
    name: string
  }
}

export interface PokemonAbility {
  ability: {
    name: string
  }
}

export interface TransformedPokemon {
  id: number
  name: string
  displayName: string
  image: string
  types: string[]
  totalStats: number
  averageStat: number
  primaryType: string
  height: number
  weight: number
  abilities: string[]
  stats: {
    hp: number
    attack: number
    defense: number
    specialAttack: number
    specialDefense: number
    speed: number
  }
}
