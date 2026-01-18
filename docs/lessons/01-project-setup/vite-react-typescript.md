# Setting Up a Modern React Project with Vite and TypeScript

## Context
Creating a new React project for the DSA Learning Game that needs fast development experience, TypeScript support, and modern tooling.

## Solution

### Tech Stack Chosen
- **Vite** - Fast build tool with HMR (Hot Module Replacement)
- **React 18** - UI library with hooks
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **Vitest** - Fast unit testing

### Project Structure
```
src/
├── components/     # React components organized by feature
│   ├── common/     # Reusable UI components
│   ├── quiz/       # Quiz module components
│   └── diagram/    # Diagram module components
├── data/           # Static data (questions, etc.)
├── db/             # Database layer (sql.js)
├── hooks/          # Custom React hooks
├── store/          # Zustand state stores
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

### Key Configuration Files
| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite build configuration |
| `tsconfig.json` | TypeScript compiler options |
| `tailwind.config.js` | Tailwind CSS customization |
| `.eslintrc.cjs` | ESLint rules |
| `.prettierrc` | Code formatting rules |

## Key Takeaways
- Vite provides significantly faster cold starts than Create React App
- Path aliases (`@/`) make imports cleaner and more maintainable
- Separate `tsconfig.node.json` for build tooling prevents type conflicts
- Feature-based folder structure scales better than type-based (components/, hooks/, etc.)

## References
- [Vite Documentation](https://vitejs.dev/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
