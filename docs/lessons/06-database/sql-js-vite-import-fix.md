# Fixing sql.js Import Issues with Vite

## Context
Using sql.js (SQLite compiled to WebAssembly) in a Vite + React + TypeScript project.

## Problem
The app showed a blank page with console errors:

```
Uncaught SyntaxError: The requested module '/node_modules/sql.js/dist/sql-wasm.js'
does not provide an export named 'default'
```

Followed by:
```
Failed to initialize database: TypeError: initFn is not a function
```

## Root Cause
Two issues combined:

### 1. Vite optimizeDeps Configuration
```typescript
// vite.config.ts - WRONG
optimizeDeps: {
  exclude: ['sql.js'],  // Excluding breaks ESM interop
}
```

When sql.js is excluded from Vite's dependency optimization, Vite doesn't transform the CommonJS exports properly for ESM consumption.

### 2. ESM/CommonJS Interop
sql.js uses CommonJS exports:
```javascript
// sql.js internal export
module.exports = initSqlJs;
module.exports.default = initSqlJs;
```

Vite needs to pre-bundle this to create proper ESM exports.

## Solution

### Step 1: Include sql.js in optimizeDeps
```typescript
// vite.config.ts - CORRECT
optimizeDeps: {
  include: ['sql.js'],  // Let Vite optimize and transform
}
```

### Step 2: Use Static Import
```typescript
// database.ts - CORRECT
import initSqlJs from 'sql.js';
import type { Database as SqlJsDatabase } from 'sql.js';

const SQL = await initSqlJs({
  locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
});
```

### Step 3: Clear Vite Cache
After changing vite.config.ts, clear the cache:
```bash
rm -rf node_modules/.vite
npm run dev
```

## What Didn't Work

### Dynamic Import Wrapper
```typescript
// Attempted workaround - didn't work reliably
async function loadSqlJs(config) {
  const module = await import('sql.js');
  const initFn = module.default || module;
  return await initFn(config);
}
```
This failed because Vite's transformation of the excluded module was inconsistent.

### Importing from dist path
```typescript
// Also didn't work
import initSqlJs from 'sql.js/dist/sql-wasm.mjs';
```
The `.mjs` file doesn't exist in the sql.js package.

## Key Takeaways

1. **Don't exclude CommonJS packages from Vite's optimizeDeps** - Vite's pre-bundling is what makes CJS → ESM interop work

2. **Use `include` instead of `exclude`** for packages with complex module formats

3. **Clear `node_modules/.vite`** after changing optimization settings

4. **Static imports are more reliable** than dynamic imports for CommonJS interop

5. **Check the actual package exports** before assuming module structure:
   ```bash
   node -e "import('sql.js').then(m => console.log(Object.keys(m)))"
   ```

## CORS Headers Note
Also ensure your Vite server headers allow WASM loading:

```typescript
// vite.config.ts
server: {
  headers: {
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'credentialless',  // Not 'require-corp'
  },
}
```

Using `require-corp` blocks external WASM files from CDNs.

## References
- [Vite Dependency Pre-Bundling](https://vitejs.dev/guide/dep-pre-bundling.html)
- [sql.js Documentation](https://sql.js.org/)
- [Vite CommonJS Handling](https://vitejs.dev/guide/features.html#npm-dependency-resolving-and-pre-bundling)
