# sql.js WASM Loading and CORS Issues

## Context
Using sql.js for browser-based SQLite database. The library requires loading a WASM binary file.

## Problem
The app shows a blank page because the WASM file fails to load due to CORS restrictions.

### The Issue
sql.js loads its WASM file from an external CDN:
```typescript
const SQL = await initSqlJs({
  locateFile: (file) => `https://sql.js.org/dist/${file}`,
});
```

When Vite is configured with strict Cross-Origin policies:
```typescript
// vite.config.ts
server: {
  headers: {
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp',  // BLOCKS external resources!
  },
},
```

The `require-corp` policy blocks all cross-origin resources that don't explicitly opt-in via `Cross-Origin-Resource-Policy` header.

## Solution

### Option 1: Use `credentialless` Policy (Recommended for Dev)
```typescript
server: {
  headers: {
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'credentialless',  // Less strict
  },
},
```

### Option 2: Host WASM Locally (Recommended for Production)
```bash
# Copy WASM to public folder
cp node_modules/sql.js/dist/sql-wasm.wasm public/
```

```typescript
const SQL = await initSqlJs({
  locateFile: (file) => `/${file}`,  // Serve from same origin
});
```

### Option 3: Remove COOP/COEP Headers (Dev Only)
```typescript
server: {
  headers: {
    // Remove or comment out these headers
  },
},
```

## Why COOP/COEP?
These headers are required for:
- `SharedArrayBuffer` (needed for some WASM features)
- High-resolution timers
- Cross-origin isolation

sql.js can work without `SharedArrayBuffer`, but performance may be reduced.

## Key Takeaways
- `Cross-Origin-Embedder-Policy: require-corp` blocks all external resources
- `credentialless` is a middle ground that allows anonymous cross-origin requests
- For production, bundle WASM files locally to avoid CDN dependencies
- Always check the Network tab when debugging blank pages - look for blocked/failed WASM requests

## Debugging Tips
1. Open DevTools → Network tab
2. Filter by "wasm" or look for red/blocked requests
3. Check Console for CORS or COEP errors
4. Errors will mention "Cross-Origin-Embedder-Policy"

## References
- [sql.js Documentation](https://sql.js.org/)
- [Cross-Origin-Embedder-Policy MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy)
- [SharedArrayBuffer and COOP/COEP](https://web.dev/cross-origin-isolation-guide/)
