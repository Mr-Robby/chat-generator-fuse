# Chat Overlay Generator for DaVinci Resolve

A Fuse plugin for DaVinci Resolve that creates animated chat overlays for videos, perfect for streamers, video editors, and content creators.

[🇺🇦 Українська версія](README.uk.md) | [📖 Full Documentation](docs/README.md)

## ✨ Features

- ✅ **971 Emoji Support** - Auto-generated spritesheet from Noto Emoji
- ✅ **Cyrillic Support** - Full Ukrainian and Russian text support
- ✅ **Colored Nicknames** - Customizable colors per user
- ✅ **Smooth Animations** - Elegant message appearance
- ✅ **Text Wrapping** - Automatic text wrapping
- ✅ **Message Delays** - Timed message appearance
- ✅ **Customizable Styling** - Fonts, colors, sizes, shadows

## 📥 Installation

### Quick Install

1. Download `ChatBox.fuse` from [Releases](https://github.com/Mr-Robby/chat-generator-fuse/releases)
2. Copy to your Fuses folder:
   - **Windows:** `C:\Users\[USERNAME]\AppData\Roaming\Blackmagic Design\DaVinci Resolve\Support\Fusion\Fuses\`
   - **macOS:** `/Users/[USERNAME]/Library/Application Support/Blackmagic Design/DaVinci Resolve/Fusion/Fuses/`
   - **Linux:** `/home/[USERNAME]/.local/share/DaVinciResolve/Fusion/Fuses/`
3. Restart DaVinci Resolve
4. Find it in **Effects → Generators → ChatOverlay**

### With Emoji Support

1. Download `emoji_spritesheet.png` from [Releases](https://github.com/Mr-Robby/chat-generator-fuse/releases)
2. In Fusion, add a **Loader** node
3. Load `emoji_spritesheet.png`
4. Connect Loader to ChatOverlay's **"Emoji Spritesheet"** input

## 🚀 Quick Start

### Basic Chat

```
User1: Hello!
User2: Hi there!
User3: How are you?
```

### With Colors and Emoji

```
{Admin=#FF0000}: Welcome to the stream! :fire:
[+1000] {Moderator=#00FF00}: Thanks! :thumbsup:
[+500] User1: Hello everyone! :wave:
```

### Format Options

- **Simple text**: `Message without nickname`
- **With nickname**: `Username: Message text`
- **Colored nickname**: `{Username=#FF0000}: Colored message`
- **Delay**: `[+1000] Message` (1000ms delay)
- **Emoji**: `:fire:` `:heart:` `:thumbsup:`

Find emoji codes at [Emoji Cheat Sheet](https://www.webfx.com/tools/emoji-cheat-sheet/)

## 🎨 Customization

- **Fonts** - Choose any system font for nicknames and messages
- **Colors** - RGB or Hex color support
- **Size & Position** - Adjustable area size and screen position
- **Line Spacing** - Control message spacing
- **Text Alignment** - Left, center, or right
- **Max Messages** - Limit visible messages (1-50)

## 🛠️ Development

### Prerequisites

- Node.js 16+
- npm

### Generate Emoji Spritesheet

```bash
# Install dependencies
npm install

# Copy needed emoji from noto-emoji
node src/scripts/copy-em.js

# Generate spritesheet and map
node src/scripts/generate-sprite.js
```

This will create:
- `assets/emoji_spritesheet.png` - The spritesheet (1024×992px, 32×31 grid)
- `assets/emoji_map.lua` - Emoji coordinate map

### Update ChatBox.fuse

After generating, manually copy the contents from `assets/emoji_map.lua` into `src/ChatBox.fuse` (lines 90-1065) due to Fusion security restrictions.

### Project Structure

```
chatOverlayGenerator/
├── src/
│   ├── ChatBox.fuse              # Main Fuse plugin
│   └── scripts/
│       ├── all-em-obj.js         # Emoji list
│       ├── copy-em.js            # Copy emoji script
│       └── generate-sprite.js    # Generate spritesheet
├── assets/
│   ├── emoji/                    # Copied emoji PNGs
│   ├── emoji_spritesheet.png    # Generated spritesheet
│   └── emoji_map.lua            # Generated coordinate map
├── docs/
│   └── README.md                # Full documentation (Ukrainian)
└── package.json
```

## 📖 Documentation

- [Full Documentation (Ukrainian)](docs/README.md) - Complete guide with examples
- [Emoji Cheat Sheet](https://www.webfx.com/tools/emoji-cheat-sheet/) - Find emoji codes

## 🎯 Use Cases

- **Streaming** - Twitch, YouTube, Discord chat overlays
- **Reactions** - Show viewer comments during reactions
- **Tutorials** - Q&A format videos
- **Social Media** - TikTok, Instagram Reels, YouTube Shorts

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Third-Party Credits

- **Emoji** - [Noto Emoji](https://github.com/googlefonts/noto-emoji) by Google (Apache 2.0)

## 👤 Author

**Denys Stalenkov**
- Email: denis.stalenkov@gmail.com
- GitHub: [@Mr-Robby](https://github.com/Mr-Robby)

## ⭐ Support

If you find this project helpful, please consider giving it a star on GitHub!

---

**Version:** 24
**Requirements:** DaVinci Resolve 18.0+
