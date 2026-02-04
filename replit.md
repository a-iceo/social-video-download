# UniLoad.io - Social Media Video Downloader

## Overview

UniLoad.io is a web application that allows users to download videos from various social media platforms (TikTok, Instagram, YouTube, Twitter/X). Users paste a video URL, the app processes it through a third-party API, and returns download links. The application features a modern dark-themed UI with neon accents, smooth animations, and ad monetization support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack Query (React Query) for server state
- **Styling**: Tailwind CSS with custom dark theme (neon cyan/magenta accents)
- **UI Components**: shadcn/ui component library (Radix primitives)
- **Animations**: Framer Motion for smooth transitions
- **Fonts**: DM Sans (body) and Outfit (display/headings)

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript (ESM modules)
- **Build Tool**: Vite for frontend, esbuild for server bundling
- **API Pattern**: REST endpoints defined in `shared/routes.ts` with Zod validation

### Data Storage
- **Database**: PostgreSQL via Drizzle ORM
- **Schema Location**: `shared/schema.ts`
- **Migrations**: Drizzle Kit (`drizzle-kit push`)
- **Connection**: Direct pool connection via `pg` package

### Key Design Patterns
- **Shared Types**: Schema and API routes defined in `shared/` folder, used by both client and server
- **Type-safe API**: Zod schemas validate both request inputs and response outputs
- **Monorepo Structure**: Client (`client/`), server (`server/`), and shared code (`shared/`) in single repo

### File Structure
```
├── client/src/          # React frontend
│   ├── components/      # UI components (including shadcn/ui)
│   ├── pages/           # Route pages (Home, Privacy, Terms)
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utilities and query client
├── server/              # Express backend
│   ├── routes.ts        # API endpoint handlers
│   ├── storage.ts       # Database operations
│   └── db.ts            # Drizzle/PostgreSQL connection
├── shared/              # Shared code between client/server
│   ├── schema.ts        # Drizzle schema definitions
│   └── routes.ts        # API route definitions with Zod
└── migrations/          # Database migrations
```

## External Dependencies

### Third-Party APIs
- **RapidAPI Social Downloader**: Uses `social-download-all-in-one.p.rapidapi.com` API to process video URLs and extract download links
- **Environment Variable**: `RAPIDAPI_KEY` required for API authentication

### Database
- **PostgreSQL**: Required for storing download history
- **Environment Variable**: `DATABASE_URL` connection string required

### Advertising
- **Adsterra**: Ad network integration planned (consent-based loading)
- Cookie consent banner manages user preferences for personalized ads

### Key npm Dependencies
- `drizzle-orm` / `drizzle-zod`: Database ORM and Zod integration
- `@tanstack/react-query`: Server state management
- `framer-motion`: Animations
- `react-icons`: Platform brand icons
- `zod`: Runtime type validation
- Full shadcn/ui component suite via Radix primitives