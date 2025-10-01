# Security Policy

## Supported Versions

We provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in ChatOverlay Generator, please report it privately to help us address it before public disclosure.

### How to Report

**Email:** denis.stalenkov@gmail.com

**Subject:** `[SECURITY] ChatOverlay - Brief description`

### What to Include

Please provide:
- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Any suggested fixes (if available)

### Response Timeline

- **Initial Response:** Within 48 hours
- **Status Update:** Within 7 days
- **Fix Timeline:** Depends on severity, typically within 30 days

### Disclosure Policy

- Please allow us reasonable time to address the issue before public disclosure
- We will credit you in the release notes (unless you prefer to remain anonymous)
- We will notify you when the issue is fixed

## Security Considerations

### Safe Usage

- Only use ChatOverlay.fuse files from official sources
- Verify file integrity when downloading from third parties
- Keep DaVinci Resolve updated to the latest version

### Emoji Spritesheet

- The emoji spritesheet is generated from trusted sources (Noto Emoji)
- If creating custom spritesheets, ensure images are from trusted sources
- Avoid loading untrusted image files

### Scripts

- Generation scripts require Node.js
- Review scripts before running if modifying
- Only run scripts from trusted sources

## Known Limitations

- Fuse plugins run within DaVinci Resolve's Lua sandbox
- Limited file system access by design
- No network access capabilities

## Questions?

For general security questions not related to vulnerabilities, feel free to open a public issue or discussion.
