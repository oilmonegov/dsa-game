# Git Hooks and GitHub Workflows for Quality Control

## Context
Setting up automated quality checks to ensure code quality and consistency across the team.

## Solution

### Git Hooks (via Husky)

| Hook | Purpose | Tools Used |
|------|---------|------------|
| `pre-commit` | Lint and format staged files | lint-staged, ESLint, Prettier |
| `commit-msg` | Validate commit message format | commitlint |
| `pre-push` | Run type check and tests | TypeScript, Vitest |
| `post-checkout` | Auto-install deps if changed | npm |
| `post-merge` | Auto-install deps after pull | npm |

### Husky v9 Format
**Important:** Husky v9+ uses a simplified format. The old shebang/sourcing pattern is deprecated:

```bash
# OLD (deprecated, will fail in v10)
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
npx lint-staged

# NEW (v9+)
npx lint-staged
```

### Conventional Commits
All commits must follow the format:
```
<type>(<scope>): <description>

[optional body]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

### GitHub Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci.yml` | Push/PR | Lint, typecheck, test, build |
| `pr-check.yml` | PR | Validate PR title, add size labels |
| `release.yml` | Tag push | Build release, deploy to Pages |
| `codeql.yml` | Push/Weekly | Security analysis |
| `stale.yml` | Daily | Mark stale issues/PRs |

### Dependabot Configuration
- Weekly dependency updates
- Grouped by category (react, testing, linting, etc.)
- Auto-labeled PRs

## Key Takeaways
- Pre-commit hooks catch issues before they enter the codebase
- Conventional commits enable automated changelog generation
- CI workflows provide a safety net for all contributors
- Dependabot keeps dependencies updated with minimal manual effort
- Always use `--no-verify` sparingly and document why

## Common Issues

### ESLint Errors Blocking Commit
```bash
# Bypass hooks temporarily (use sparingly!)
git commit --no-verify -m "message"
```

### Commitlint Subject Case Error
Subject must be lowercase:
```bash
# Wrong
fix(lint): Resolve all ESLint errors

# Correct
fix(lint): resolve all eslint errors
```

## References
- [Husky Documentation](https://typicode.github.io/husky/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Actions](https://docs.github.com/en/actions)
