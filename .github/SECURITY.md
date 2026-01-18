# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of DSA Game seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### How to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to:
- Email: security@example.com (replace with actual contact)

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

### What to Include

Please include the following information in your report:

- Type of vulnerability (e.g., XSS, SQL injection, etc.)
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### What to Expect

- A confirmation of receipt within 48 hours
- An assessment of the vulnerability within 7 days
- Regular updates on our progress
- Credit in the security advisory (if desired)

### Safe Harbor

We support safe harbor for security researchers who:

- Make a good faith effort to avoid privacy violations, destruction of data, and interruption or degradation of our services
- Only interact with accounts you own or with explicit permission from the account holder
- Do not exploit a security issue you discover for any reason other than testing
- Report vulnerabilities promptly
- Do not publish details of the vulnerability before we've had a chance to address it

## Security Best Practices

This application:

- Stores data locally in the browser (localStorage/IndexedDB)
- Does not transmit sensitive data to external servers
- Does not collect personal information
- Uses only client-side processing

### For Users

- Keep your browser updated
- Be cautious when using the application on shared computers
- Clear browser data if using on a public computer
