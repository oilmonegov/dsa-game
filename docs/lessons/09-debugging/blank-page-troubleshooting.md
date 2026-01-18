# Troubleshooting Blank Page Issues in React/Vite Apps

## Context
The development server runs but the browser shows a blank page.

## Common Causes

### 1. JavaScript Errors During Initialization
React apps fail silently if there's an unhandled error during initial render.

**Check:** Open browser DevTools (F12) → Console tab

### 2. Missing or Incorrect Root Element
```html
<!-- index.html must have this -->
<div id="root"></div>
```

### 3. CSS Not Loading
If Tailwind CSS isn't processing, you might see unstyled or blank content.

**Check:**
- Verify `@tailwind` directives in `index.css`
- Ensure `tailwind.config.js` includes all content paths

### 4. WASM/External Resource Loading Failures
Libraries like `sql.js` load WASM files from CDNs. If blocked or failed:

```typescript
// This can fail silently
const SQL = await initSqlJs({
  locateFile: (file) => `https://sql.js.org/dist/${file}`,
});
```

**Check:** Network tab for failed requests, especially `.wasm` files

### 5. React Strict Mode Double-Render Issues
`StrictMode` renders components twice in development, which can expose issues with side effects.

### 6. Path Alias Resolution
If `@/` path aliases aren't configured in both `tsconfig.json` AND `vite.config.ts`, imports will fail.

## Debugging Steps

1. **Open DevTools Console** - Look for red errors
2. **Check Network Tab** - Look for failed requests (especially WASM, CSS)
3. **Add Console Logs** - In main.tsx before render
4. **Remove Suspense/Lazy** - Test with direct imports
5. **Check Build** - Run `npm run build` to see TypeScript errors

## Quick Fixes

### Add Error Boundary
```tsx
// Wrap App in error boundary to catch render errors
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### Test Without Database
```tsx
// Temporarily skip DB init to isolate the issue
useEffect(() => {
  // Comment out DB initialization
  setIsInitializing(false);
}, []);
```

### Verify Vite Config Path Aliases
```typescript
// vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

## Key Takeaways
- Always check browser console first
- External resource loading (WASM, fonts) can fail silently
- React StrictMode doubles renders - watch for side effects
- Path aliases need configuration in BOTH tsconfig AND vite.config
