/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Type must be one of the following
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation only
        'style',    // Formatting, no code change
        'refactor', // Code restructuring
        'perf',     // Performance improvement
        'test',     // Adding/updating tests
        'build',    // Build system or dependencies
        'ci',       // CI/CD configuration
        'chore',    // Maintenance tasks
        'revert',   // Reverting a commit
      ],
    ],
    // Subject (description) rules
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-max-length': [2, 'always', 72],
    // Type rules
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    // Scope rules (optional but if present, must be lowercase)
    'scope-case': [2, 'always', 'lower-case'],
    // Body rules
    'body-max-line-length': [2, 'always', 100],
    // Header (entire first line) rules
    'header-max-length': [2, 'always', 100],
  },
  // Custom prompt settings for interactive commits
  prompt: {
    questions: {
      type: {
        description: 'Select the type of change you are committing',
        enum: {
          feat: {
            description: 'A new feature',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: 'A bug fix',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          docs: {
            description: 'Documentation only changes',
            title: 'Documentation',
            emoji: '📚',
          },
          style: {
            description: 'Changes that do not affect the meaning of the code',
            title: 'Styles',
            emoji: '💎',
          },
          refactor: {
            description: 'A code change that neither fixes a bug nor adds a feature',
            title: 'Code Refactoring',
            emoji: '📦',
          },
          perf: {
            description: 'A code change that improves performance',
            title: 'Performance Improvements',
            emoji: '🚀',
          },
          test: {
            description: 'Adding missing tests or correcting existing tests',
            title: 'Tests',
            emoji: '🚨',
          },
          build: {
            description: 'Changes that affect the build system or external dependencies',
            title: 'Builds',
            emoji: '🛠',
          },
          ci: {
            description: 'Changes to CI configuration files and scripts',
            title: 'Continuous Integrations',
            emoji: '⚙️',
          },
          chore: {
            description: "Other changes that don't modify src or test files",
            title: 'Chores',
            emoji: '♻️',
          },
          revert: {
            description: 'Reverts a previous commit',
            title: 'Reverts',
            emoji: '🗑',
          },
        },
      },
      scope: {
        description: 'What is the scope of this change (e.g., quiz, traversal, db)',
      },
      subject: {
        description: 'Write a short, imperative tense description of the change',
      },
      body: {
        description: 'Provide a longer description of the change',
      },
      isBreaking: {
        description: 'Are there any breaking changes?',
      },
      breakingBody: {
        description: 'A BREAKING CHANGE commit requires a body. Please provide details',
      },
      breaking: {
        description: 'Describe the breaking changes',
      },
      isIssueAffected: {
        description: 'Does this change affect any open issues?',
      },
      issuesBody: {
        description: 'If issues are closed, the commit requires a body. Please provide details',
      },
      issues: {
        description: 'Add issue references (e.g., "fix #123", "re #123")',
      },
    },
  },
};
