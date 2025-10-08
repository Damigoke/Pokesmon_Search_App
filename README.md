# Pokemon Search App - Technical Test

A modern Pokemon search application built with Next.js 15, TypeScript, and functional programming patterns. This project demonstrates clean architecture, SOLID principles, and advanced React patterns.

## Features

### Core Requirements

- **Search Functionality**: Search Pokemon by name or ID through custom API endpoints
- **Functional Transformations**: Extensive use of `map`, `filter`, and `reduce` for data manipulation
- **Higher-Order Functions**: 
  - API Request Wrappers: `withRetry`, `withBaseUrl`, `withCache`, `withTiming`
  - Route Middleware: `withErrorHandling`, `withCORS`, `withLogging`, `withRateLimit`
- **State Management**: Zustand store for global state management
- **Modern UI**: Clean, responsive design with shadcn/ui components
- **Code Quality**: Follows SOLID and DRY principles throughout

### Bonus Features

- **Interactive Pokemon Cards**: Beautiful cards with stats visualization, types, and abilities
- **Bulk Loading**: Load multiple Pokemon at once (10, 20, or 50)
- **Advanced Filtering**: Filter by type and minimum stats
- **Sorting**: Sort by name, ID, total stats, or average stat
- **Aggregate Statistics**: Real-time stats using reduce (total count, averages, strongest Pokemon)
- **Random Pokemon**: "Surprise Me" feature for random discoveries
- **Smooth Animations**: Hover effects and transitions for better UX

## Architecture

### Higher-Order Functions

#### API Request Wrappers (`lib/api/hof-wrappers.ts`)
- `withRetry`: Automatic retry logic with exponential backoff
- `withBaseUrl`: URL composition for consistent API calls
- `withCache`: In-memory caching with TTL
- `withTiming`: Performance monitoring
- `composeHOFs`: Function composition for combining multiple HOFs

#### Route Middleware (`lib/middleware/route-middleware.ts`)
- `withErrorHandling`: Centralized error handling
- `withCORS`: Cross-origin resource sharing
- `withLogging`: Request/response logging
- `withRateLimit`: Simple rate limiting
- `composeMiddleware`: Middleware composition

### Functional Transformations (`lib/utils/pokemon-transformers.ts`)

- **map**: Transform raw API data into user-friendly format
- **filter**: Filter Pokemon by type and stats
- **reduce**: Calculate totals, averages, and find strongest Pokemon
- **sort**: Multiple sorting strategies

### State Management

Zustand store (`lib/store/pokemon-store.ts`) manages:
- Pokemon collection
- Loading states
- Error handling
- Search queries

### API Routes

- `/api/pokemon/search`: Search single Pokemon by name/ID
- `/api/pokemon/list`: Fetch multiple Pokemon with pagination

## Design Principles

### SOLID

- **Single Responsibility**: Each component/function has one clear purpose
- **Open/Closed**: HOFs allow extension without modification
- **Liskov Substitution**: Middleware can be swapped without breaking functionality
- **Interface Segregation**: Clean type definitions in `lib/types/pokemon.ts`
- **Dependency Inversion**: Components depend on abstractions (store, transformers)

### DRY

- Reusable HOF wrappers
- Shared transformation utilities
- Composable middleware
- Type definitions prevent duplication

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **State Management**: Zustand
- **UI Library**: shadcn/ui (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS v4
- **API**: PokéAPI (via custom endpoints)
- **Fonts**: Geist Sans & Geist Mono

## Getting Started

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

\`\`\`
├── app/
│   ├── api/
│   │   └── pokemon/
│   │       ├── search/route.ts    # Single Pokemon search
│   │       └── list/route.ts      # Bulk Pokemon fetch
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── pokemon-search.tsx         # Search input component
│   ├── pokemon-card.tsx           # Pokemon display card
│   ├── pokemon-grid.tsx           # Grid layout
│   ├── pokemon-filters.tsx        # Filtering & sorting
│   └── bulk-pokemon-loader.tsx    # Bulk loading buttons
├── lib/
│   ├── api/
│   │   ├── hof-wrappers.ts        # API HOFs
│   │   └── pokemon-client.ts      # API client
│   ├── middleware/
│   │   └── route-middleware.ts    # Route HOFs
│   ├── store/
│   │   └── pokemon-store.ts       # Zustand store
│   ├── types/
│   │   └── pokemon.ts             # Type definitions
│   └── utils/
│       └── pokemon-transformers.ts # Functional transformations
└── README.md
\`\`\`

## Key Highlights

1. **Functional Programming**: Extensive use of pure functions, HOFs, and composition
2. **Type Safety**: Full TypeScript coverage with strict types
3. **Performance**: Caching, retry logic, and optimized rendering
4. **UX**: Smooth animations, loading states, and error handling
5. **Maintainability**: Clean code structure following best practices
6. **Scalability**: Modular architecture ready for expansion

## Design Choices

- **Zustand over Redux**: Simpler API, less boilerplate, better TypeScript support
- **shadcn/ui**: Accessible, customizable components with Radix UI primitives
- **Functional Transformers**: Separate data transformation logic for testability
- **Composed HOFs**: Flexible, reusable wrappers that can be mixed and matched
- **Vibrant Theme**: Pokemon-inspired color palette (blues, pinks, greens) for playful feel

## Future Enhancements

- Unit tests for HOFs and transformers
- Pokemon comparison feature
- Favorites/bookmarking system
- Advanced search with multiple filters
- Type effectiveness calculator
- Evolution chain visualization

---

Built with care for the technical test. Demonstrates clean code, functional programming, and modern React patterns.
