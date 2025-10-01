# Contributing to ChatOverlay Generator

Thank you for your interest in contributing to ChatOverlay Generator! 🎉

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- DaVinci Resolve version
- Screenshots if applicable

### Suggesting Features

Feature requests are welcome! Please:
- Check if the feature was already requested
- Describe the use case
- Explain why it would be useful

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - Follow existing code style
   - Test your changes in DaVinci Resolve
   - Update documentation if needed
4. **Commit your changes**
   ```bash
   git commit -m "Add feature: description"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request**

### Documentation

Documentation improvements are always welcome! You can contribute to:
- README files (English and Ukrainian)
- Code comments
- Usage examples
- Troubleshooting guides

### Emoji Support

To add or modify emoji:
1. Edit `src/scripts/all-em-obj.js`
2. Run generation scripts:
   ```bash
   node src/scripts/copy-em.js
   node src/scripts/generate-sprite.js
   ```
3. Update `src/ChatBox.fuse` with new `emoji_map.lua` content

## Code Style

- Use 2 spaces for indentation
- Follow existing Lua conventions for .fuse files
- Add comments for complex logic
- Keep functions focused and documented

## Testing

Before submitting:
- Test in DaVinci Resolve 18.0+
- Verify emoji display correctly
- Check text wrapping and alignment
- Test with Cyrillic characters

## Questions?

Feel free to open an issue for any questions or discussions!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
