# Copilot Instructions - Soc Ops (Social Bingo)

## Development Checklist
- [ ] Run `npm run lint` before committing
- [ ] Run `npm run test` to verify logic changes
- [ ] Run `npm run build` to ensure production build succeeds
- [ ] Test in browser at http://localhost:5173/ with `npm run dev`

## Architecture Overview

**Single-Page React App** for in-person social mixer games. Users tap 5×5 bingo board squares to mark people matching questions (e.g., "has a pet").

**Component Flow**: `App.tsx` → `useBingoGame` hook → `StartScreen` | `GameScreen` (→ `BingoBoard` → `BingoSquare`) + `BingoModal`

**Core Logic** (`src/utils/bingoLogic.ts`): Fisher-Yates shuffle of 24 questions + center FREE_SPACE (index 12), checks 12 win lines (5 rows, 5 cols, 2 diagonals), immutable updates, 21 unit tests.

**State**: Custom hook with localStorage persistence (versioned schema), 3 states (`'start' | 'playing' | 'bingo'`), computed winning square IDs.

## Tech Stack Critical Points

### Tailwind CSS v4
- **CSS-first config** via `@import "tailwindcss"` - NO `tailwind.config.js`
- Use `@theme` blocks for colors/fonts (see `.github/instructions/tailwind-4.instructions.md`)
- Custom colors: `bg-marked`, `bg-accent`, `border-marked-border`

### Vite
- Dynamic base path from `VITE_REPO_NAME` for GitHub Pages
- Vitest with jsdom for React component testing

### ESLint
- ESLint 9+ flat config (`eslint.config.js`)
- React Hooks via `eslint-plugin-react-hooks/flat`

## Conventions

**Files**: Components (PascalCase), Types (`src/types/index.ts`), Data (`questions.ts`), Utils (pure functions)

**Styling**: Template literals for dynamic classes, `isMarked ? 'bg-marked' : 'bg-white'` pattern, `aria-label`/`aria-pressed` required, `min-h-[60px]` touch targets

**TypeScript**: Strict mode, explicit Props interfaces, runtime validation for localStorage (`validateStoredData`)

## Critical Don'ts
- ❌ Don't modify FREE_SPACE logic (index 12 hardcoded)
- ❌ Don't use `tailwind.config.js` (v4 uses CSS @theme)
- ❌ Don't mutate state arrays (use map/spread)
- ❌ Don't skip localStorage validation

## Quick Reference
- **Questions**: `src/data/questions.ts`
- **Win logic**: `getWinningLines()` in `bingoLogic.ts`
- **Square styling**: `BingoSquare.tsx`
- **State persistence**: `StoredGameData` interface + version + validation
- **Animations**: `.github/instructions/frontend-design.instructions.md`
