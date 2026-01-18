# Branch Protection: Preventing Direct Commits to Main

## Context
Enforcing a pull request workflow to ensure code review and CI checks run before changes reach the main branch.

## Problem
Direct commits to `main` bypass:
- Code review
- CI/CD checks (tests, linting, type checking)
- Team discussion on changes
- Audit trail of why changes were made

## Solution

### 1. Local Protection: Pre-commit Hook

Add branch checking to `.husky/pre-commit`:

```bash
# Prevent direct commits to main/master branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [ "$BRANCH" = "main" ] || [ "$BRANCH" = "master" ]; then
  echo "❌ Direct commits to '$BRANCH' branch are not allowed!"
  echo ""
  echo "Please create a feature branch and submit a pull request:"
  echo "  git checkout -b feature/your-feature-name"
  echo "  git commit -m 'your message'"
  echo "  git push -u origin feature/your-feature-name"
  echo ""
  echo "To bypass this check (use sparingly):"
  echo "  git commit --no-verify -m 'your message'"
  exit 1
fi

# Run lint-staged
npx lint-staged
```

### 2. Remote Protection: GitHub Branch Rules

For server-side enforcement, configure GitHub branch protection:

1. Go to **Settings → Branches → Add rule**
2. Branch name pattern: `main`
3. Enable:
   - ✅ Require a pull request before merging
   - ✅ Require approvals (1 or more)
   - ✅ Require status checks to pass (select CI checks)
   - ✅ Require branches to be up to date
   - ✅ Do not allow bypassing the above settings

### GitHub Branch Protection via CLI

```bash
# Using GitHub CLI
gh api repos/{owner}/{repo}/branches/main/protection -X PUT -f \
  required_status_checks='{"strict":true,"contexts":["CI"]}' \
  enforce_admins=true \
  required_pull_request_reviews='{"required_approving_review_count":1}'
```

## Workflow After Protection

```bash
# 1. Create feature branch
git checkout -b feature/add-new-quiz

# 2. Make changes
# ... edit files ...

# 3. Commit (hooks run automatically)
git commit -m "feat(quiz): add new quiz category"

# 4. Push branch
git push -u origin feature/add-new-quiz

# 5. Create PR (via GitHub or CLI)
gh pr create --title "feat(quiz): add new quiz category" --body "Description..."

# 6. After review and CI passes, merge via GitHub UI or:
gh pr merge --squash
```

## Branch Naming Conventions

| Prefix | Purpose | Example |
|--------|---------|---------|
| `feature/` | New features | `feature/add-timer` |
| `fix/` | Bug fixes | `fix/login-error` |
| `docs/` | Documentation | `docs/update-readme` |
| `refactor/` | Code refactoring | `refactor/cleanup-utils` |
| `test/` | Test additions | `test/add-quiz-tests` |
| `chore/` | Maintenance | `chore/update-deps` |

## Bypassing Protection (Emergency Only)

### Local bypass:
```bash
git commit --no-verify -m "emergency fix"
```

### When to bypass:
- Critical hotfix that can't wait for CI
- Fixing broken CI configuration
- Initial project setup

### When NOT to bypass:
- "It's a small change"
- "I'm in a hurry"
- "Tests are flaky anyway"

## Key Takeaways

1. **Local hooks are advisory** - developers can bypass with `--no-verify`

2. **GitHub protection is enforced** - even admins can't push directly (if configured)

3. **Both layers together** provide:
   - Fast feedback (local hooks)
   - Guaranteed enforcement (GitHub rules)

4. **The PR workflow enables**:
   - Code review
   - CI verification
   - Discussion and documentation
   - Easy rollback via revert PR

5. **Branch naming conventions** help with:
   - Automatic changelog generation
   - PR labeling
   - Understanding change purpose

## References
- [GitHub Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [Husky Documentation](https://typicode.github.io/husky/)
- [Git Flow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
