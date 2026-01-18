# Contributing to DSA Game

Thank you for your interest in contributing to DSA Game! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment. Be kind, constructive, and professional in all interactions.

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/dsa-game.git
   cd dsa-game
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Running Locally

```bash
# Start development server
npm run dev

# Run tests
npm test

# Run linting
npm run lint

# Type checking
npm run typecheck
```

## Development Workflow

1. **Create an issue** first to discuss significant changes
2. **Create a branch** from `main` with a descriptive name:
   - `feature/add-quiz-timer`
   - `fix/traversal-order-bug`
   - `docs/update-readme`
3. **Make your changes** following our coding standards
4. **Write/update tests** for your changes
5. **Commit** using conventional commit format
6. **Push** and create a Pull Request

## Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/). All commits must follow this format:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no code change |
| `refactor` | Code restructuring, no behavior change |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `build` | Build system or dependencies |
| `ci` | CI/CD configuration |
| `chore` | Maintenance tasks |
| `revert` | Reverting a commit |

### Examples

```bash
feat(quiz): add category filtering
fix(traversal): correct postorder sequence
docs(readme): add installation instructions
test(scoring): add streak multiplier tests
```

## Pull Request Process

1. **Ensure all checks pass**:
   - Linting (`npm run lint`)
   - Type checking (`npm run typecheck`)
   - Tests (`npm test`)
   - Build (`npm run build`)

2. **Update documentation** if needed

3. **Fill out the PR template** completely

4. **Request review** from maintainers

5. **Address feedback** promptly

### PR Title

PR titles should also follow conventional commit format:
```
feat(quiz): add difficulty selection
```

### PR Size

Keep PRs focused and reasonably sized:
- **XS**: < 10 lines
- **S**: < 100 lines
- **M**: < 500 lines
- **L**: < 1000 lines (consider splitting)
- **XL**: > 1000 lines (should be split)

## Coding Standards

### TypeScript

- Enable strict mode
- Prefer `interface` over `type` for object shapes
- Use explicit return types for functions
- Avoid `any` - use `unknown` if type is truly unknown

### React

- Functional components with hooks
- Use descriptive component names
- Keep components focused (single responsibility)
- Extract reusable logic into custom hooks

### Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing (use Tailwind's scale)

### File Structure

```
src/
├── components/
│   └── ComponentName/
│       ├── index.tsx        # Main component
│       ├── ComponentName.test.tsx
│       └── types.ts         # Component-specific types
├── hooks/
│   └── useHookName.ts
├── utils/
│   └── utilName.ts
└── types/
    └── index.ts             # Shared types
```

### Naming Conventions

| Item | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `QuizCard.tsx` |
| Hooks | camelCase with `use` prefix | `useScore.ts` |
| Utils | camelCase | `calculateScore.ts` |
| Constants | UPPER_SNAKE_CASE | `MAX_QUESTIONS` |
| Types/Interfaces | PascalCase | `QuestionData` |

## Testing

### What to Test

- Utility functions (unit tests)
- Custom hooks (with `@testing-library/react-hooks`)
- Component behavior (integration tests)
- User interactions

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific file
npm test -- QuizCard

# Watch mode
npm test -- --watch
```

### Test Structure

```typescript
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Test implementation
  });

  it('should handle user interaction', () => {
    // Test implementation
  });
});
```

## Questions?

Feel free to:
- Open a [Discussion](https://github.com/chux/dsa-game/discussions)
- Ask in an issue with the `question` label

Thank you for contributing! 🎉
