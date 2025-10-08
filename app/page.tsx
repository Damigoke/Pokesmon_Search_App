import { PokemonSearch } from "@/components/pokemon-search"
import { PokemonGrid } from "@/components/pokemon-grid"
import { PokemonLoader } from "@/components/bulk-pokemon-loader"
import { PokemonFilters } from "@/components/pokemon-filters"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-12 space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent text-balance">
            Pokemon Search
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover and explore Pokemon using our modern search interface powered by functional programming and clean
            architecture
          </p>
        </header>

        <PokemonSearch />
        <PokemonLoader />
        <PokemonFilters />
        <PokemonGrid />
      </div>
    </main>
  )
}
