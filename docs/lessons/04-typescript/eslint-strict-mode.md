# Handling TypeScript Strict Mode with ESLint

## Context
Using TypeScript strict mode with ESLint's `@typescript-eslint/recommended-requiring-type-checking` rules for maximum type safety.

## Problem
Third-party libraries like `sql.js` have incomplete type definitions, causing many ESLint errors:
- `@typescript-eslint/no-unsafe-assignment`
- `@typescript-eslint/no-unsafe-call`
- `@typescript-eslint/no-unsafe-member-access`
- `@typescript-eslint/no-unsafe-return`

## Solution

### Option 1: File-Level Disable (Use Sparingly)
```typescript
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
import { Database } from 'sql.js';
// ... code using sql.js
```

### Option 2: Add to ESLint Ignore Patterns
```javascript
// .eslintrc.cjs
module.exports = {
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'vitest.config.ts',  // Config files often have type issues
    'vite.config.ts',
  ],
  // ...
};
```

### Option 3: Create Custom Type Declarations
```typescript
// src/types/sql.js.d.ts
declare module 'sql.js' {
  export interface Database {
    run(sql: string, params?: SqlValue[]): void;
    exec(sql: string, params?: SqlValue[]): QueryExecResult[];
    export(): Uint8Array;
  }
  // ... more types
}
```

### Option 4: Adjust ESLint Rules (Less Strict)
```javascript
// .eslintrc.cjs
rules: {
  '@typescript-eslint/no-unsafe-assignment': 'warn',  // or 'off'
  '@typescript-eslint/no-unsafe-call': 'warn',
  // ...
}
```

## Key Takeaways
- Strict TypeScript is valuable but requires handling third-party type gaps
- Create custom `.d.ts` files for libraries with poor type definitions
- Use file-level disables for isolated cases, ESLint ignore for config files
- Document why rules are disabled to help future maintainers
- The `@typescript-eslint/recommended-requiring-type-checking` ruleset requires `parserOptions.project`

## Common Errors and Fixes

### "Parsing error: ESLint was configured to run on X but none of those TSConfigs include this file"
Add the file to `ignorePatterns` in `.eslintrc.cjs` or include it in `tsconfig.json`.

### Unused ESLint Disable Directive
If you add a disable comment but the rule isn't actually triggered:
```
error  Unused eslint-disable directive (no problems were reported)
```
Remove the unnecessary disable comment.

## References
- [typescript-eslint](https://typescript-eslint.io/)
- [TypeScript Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)
