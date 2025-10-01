# ChatOverlay Fuse - Complete Documentation

[🇺🇦 Українська версія](README.uk.md)

## Table of Contents

1. [Introduction](#introduction)
2. [What is Fuse](#what-is-fuse)
3. [ChatOverlay Purpose](#chatoverlay-purpose)
4. [Installation](#installation)
5. [Emoji Spritesheet Generation](#emoji-spritesheet-generation)
6. [Quick Start](#quick-start)
7. [User Interface](#user-interface)
8. [Message Formats](#message-formats)
9. [Technical Documentation](#technical-documentation)
10. [API Functions](#api-functions)
11. [Usage Examples](#usage-examples)
12. [Troubleshooting](#troubleshooting)
13. [Additional Resources](#additional-resources)

---

## Introduction

ChatOverlay is a plugin (Fuse) for DaVinci Resolve 20 that allows you to create animated chat overlays for videos. Perfect for streamers, video editors, and content creators who want to add interactive chat elements to their videos.

### Key Features

- ✅ Cyrillic support (Ukrainian, Russian)
- ✅ Colored nicknames
- ✅ Emoji support via spritesheet
- ✅ Smooth message appearance animation
- ✅ Automatic text wrapping
- ✅ Font, color, and size customization
- ✅ Text shadows
- ✅ Message delays
- ✅ Visible message limit

---

## What is Fuse

### General Information

**Fuse** is a plugin format for Blackmagic Fusion and DaVinci Resolve. These are scripts written in Lua that extend the program's functionality by adding new tools for image processing and effects.

### Fuse Advantages

| Feature | Description |
| --- | --- |
| **Speed** | Runs natively inside Fusion |
| **Flexibility** | Full access to Fusion API |
| **Portability** | Single .fuse file contains all logic |
| **Openness** | Code available for viewing and modification |

### Where Fuses are Used

- 🎬 Generators (creating images from scratch)
- 🎨 Effects (processing existing images)
- 🔧 Utilities (helper tools)
- 📊 Visualizations (charts, diagrams)

---

## ChatOverlay Purpose

ChatOverlay is designed for overlaying animated chat messages on video. Main use cases:

### 1. Streaming and Gameplay Recording

Recreating chat from Twitch, YouTube, or Discord over gameplay video.

### 2. Reactions and Reviews

Showing viewer comments during video reactions or streams.

### 3. Educational Content

Demonstrating questions and answers in tutorial videos.

### 4. Social Media

Creating chat-style content for TikTok, Instagram Reels, YouTube Shorts.

---

## Installation

### Step 1: Find the Fuses Folder

**Windows:**
```
C:\Users\[USERNAME]\AppData\Roaming\Blackmagic Design\DaVinci Resolve\Support\Fusion\Fuses\
```

**macOS:**
```
/Users/[USERNAME]/Library/Application Support/Blackmagic Design/DaVinci Resolve/Fusion/Fuses/
```

**Linux:**
```
/home/[USERNAME]/.local/share/DaVinciResolve/Fusion/Fuses/
```

### Step 2: Copy the File

Copy `ChatBox.fuse` to the Fuses folder.

### Step 3: Restart DaVinci Resolve

After restarting, the Fuse will appear in the menu **Effects → Generators → ChatOverlay**.

---

## Emoji Spritesheet Generation

ChatOverlay supports **971 emoji** through an automatically generated spritesheet. The project includes scripts for generating a spritesheet from Google's Noto Emoji.

### Emoji Source

Emoji are taken from the [**Noto Emoji**](https://github.com/googlefonts/noto-emoji) project by Google (Apache 2.0 license).

### Automatic Generation

The spritesheet is generated automatically with **dynamic dimensions** calculated for optimal placement of all emoji in a nearly square grid.

**Current parameters** (for 971 emoji):
- **Columns:** 32
- **Rows:** 31
- **Total count:** 971 emoji
- **Size of each emoji:** 32×32 pixels
- **Spritesheet size:** 1024×992 pixels

### How to Generate Spritesheet

**Step 1: Install Dependencies**

```bash
npm install
```

**Step 2: Run Generation Scripts**

```bash
# Copy needed emoji from noto-emoji
node src/scripts/copy-em.js

# Generate spritesheet and emoji_map.lua
node src/scripts/generate-sprite.js
```

**Step 3: Update ChatBox.fuse**

Copy generated content from `assets/emoji_map.lua` into `src/ChatBox.fuse`:

1. Open `assets/emoji_map.lua`
2. Copy the values of `SPRITE_COLS`, `SPRITE_ROWS`, and the entire `EMOJI_SPRITESHEET_MAP` table
3. Paste them into `src/ChatBox.fuse` replacing old values (lines 90-1065)

**⚠️ Important:** Due to Fusion security restrictions, .fuse files cannot load external files. Therefore, the emoji map must be manually copied into the code.

### Project Structure

```
chatOverlayGenerator/
├── src/
│   ├── ChatBox.fuse              # Main Fuse file
│   └── scripts/
│       ├── all-em-obj.js         # List of all emoji
│       ├── copy-em.js            # Copy needed emoji
│       └── generate-sprite.js    # Generate spritesheet
├── assets/
│   ├── emoji/                    # Copied PNG files
│   ├── noto-emoj/               # Source files (not in git)
│   ├── emoji_spritesheet.png    # Generated spritesheet
│   └── emoji_map.lua            # Generated coordinate map
└── package.json
```

### Customizing Emoji List

To change which emoji are included in the spritesheet, edit the `src/scripts/all-em-obj.js` file. It contains a list of all emoji grouped by categories.

After changes, run the scripts again to regenerate.

---

## Quick Start

### Basic Usage

1. **Add Node:**
   - Open the Fusion tab
   - In Effects Library find **Generators → ChatOverlay**
   - Drag to workspace

2. **Enter Messages:**
   ```
   User1: Hello!
   User2: How are you?
   User3: Great!
   ```

3. **Configure Fonts:**
   - Nick Font: choose font for nicknames
   - Message Font: choose font for messages

4. **Done!** Chat will appear in your video.

---

## User Interface

### Chat Settings

| Parameter | Description | Range | Default |
| --- | --- | --- | --- |
| **Chat Messages** | Text field for entering messages | Multi-line text | Example messages |
| **Max Visible Messages** | Maximum number of visible messages | 1-50 | 10 |
| **Line Spacing** | Line spacing | 0.5-3.0 | 1.3 |
| **Start Delay (ms)** | Delay before showing first message | 0-10000 | 0 |

### Size & Position

| Parameter | Description | Range | Default |
| --- | --- | --- | --- |
| **Position** | Center position of chat area | 0.0-1.0 (X, Y) | 0.5, 0.8 |
| **Area Width (pixels)** | Chat area width in pixels | 100-1920 | 400 |
| **Area Height (pixels)** | Chat area height in pixels | 100-1080 | 300 |

### Appearance

| Parameter | Description | Range | Default |
| --- | --- | --- | --- |
| **Text Align** | Text alignment | Left / Center / Right | Left |
| **Font Size (pixels)** | Font size in pixels | 10-200 | 40 |
| **Message Color (RGBA)** | Message text color | 0.0-1.0 (each channel) | White (1,1,1,1) |
| **Nick Font** | Font for nicknames | Font list | Must select |
| **Nick Style** | Nickname font style | Regular/Bold/Italic | Must select |
| **Message Font** | Font for messages | Font list | Must select |
| **Message Style** | Message font style | Regular/Bold/Italic | Must select |

### Emoji Spritesheet (Image Input)

| Parameter | Description | Type |
| --- | --- | --- |
| **Emoji Spritesheet** | Spritesheet image with emoji | Image Input |

---

## Message Formats

### 1. Plain Text

Messages without nickname:

```
This is just text
Another message
```

### 2. Message with Nickname

Format: `Nickname: text`

```
User1: Hello!
User2: How are you?
User3: Great!
```

### 3. Colored Nickname

Format: `{Nickname=#COLOR}: text`

```
{Admin=#FF0000}: Welcome!
{Moderator=#00FF00}: Please follow the rules
{User=#0000FF}: Understood!
```

**Supported color formats:**

| Format | Example | Description |
| --- | --- | --- |
| 6 characters | `#FF0000` | Red (RGB) |
| 3 characters | `#F00` | Red (short form) |
| Without # | `FF0000` | Also works |

### 4. Delay Between Messages

Format: `[+DELAY_MS] text`

```
User1: First message
[+1000] User2: Second message (after 1 second)
[+2000] User3: Third message (2 seconds after second)
```

### 5. Emoji

Format: using emoji codes in text

```
User1: Hello :smile:
User2: Cool :fire: :fire:
User3: :thumbsup: :heart:
```

#### ⚠️ IMPORTANT: Connecting Emoji Spritesheet

**For emoji to work, you must connect the Emoji Spritesheet!**

**Step 1: Add Loader**

1. In Fusion tab add **Loader** node (Media In → Loader)
2. Load PNG file with emoji spritesheet
3. Connect Loader to **"Emoji Spritesheet"** input on ChatOverlay node

```
[Loader] → [ChatOverlay (Emoji Spritesheet input)]
```

**Step 2: Spritesheet Requirements**

The spritesheet file must meet these requirements:

| Parameter | Value | Required |
| --- | --- | --- |
| **Format** | PNG with transparency (RGBA) | ✅ Yes |
| **Grid** | 32 columns × 31 rows (dynamically calculated) | ✅ Yes |
| **Emoji count** | 971 (auto-generated) | ✅ Yes |
| **Order** | Left to right, top to bottom | ✅ Yes |
| **Indexing** | Starts from 0 | ✅ Yes |
| **Size** | 1024×992 pixels (generated) | ⚠️ Important |
| **Quality** | High resolution for clarity | ⚠️ Important |

**Step 3: Verification**

After connecting the spritesheet:

1. Emoji should appear in Preview instead of codes
2. If you only see text - check Loader connection
3. If emoji don't display - check spritesheet format and structure

#### Supported Emoji

Supports **971 emoji** generated from Noto Emoji.

**Where to find emoji codes:**
- [Popular emoji examples](#emoji-list) - at end of documentation
- [Emoji Cheat Sheet](https://www.webfx.com/tools/emoji-cheat-sheet/) - convenient online reference
- `assets/emoji_map.lua` - complete list in project file

#### Where to Get Emoji Spritesheet?

**Option 1: Use Generated (Recommended)**

- Use included generation scripts (see [Emoji Spritesheet Generation](#emoji-spritesheet-generation))
- Ready spritesheet: `assets/emoji_spritesheet.png`
- Contains 971 emoji from Noto Emoji
- 32×31 dimensions calculated automatically

**Option 2: Use Another Source**

- Twemoji by Twitter (free, CC-BY license)
- OpenMoji (free, CC-BY-SA license)
- Other emoji sets in PNG format

**Option 3: Without Emoji**

- ChatOverlay can be used without emoji
- Simply don't connect Emoji Spritesheet
- Codes like `:smile:` will display as plain text

### 6. Combining Formats

All formats can be combined:

```
{Admin=#FF0000}: Welcome to the stream! :fire:
[+1000] {Moderator=#00FF00}: Thanks, Admin! :thumbsup:
[+500] User1: Hello everyone! :smile:
[+300] User2: :wave: Hi!
```

---

## Technical Documentation

### Architecture

ChatOverlay is built on a modular architecture with several key components:

```
┌─────────────────────────────────────┐
│         User Interface              │
│  (Create, NotifyChanged)            │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│      Message Parser                 │
│  (parseMessages, getMessages)       │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│      Text Processing                │
│  (wrapText, calculateTextWidth)     │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│      Rendering Pipeline             │
│  (Process, drawChatMessage)         │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│         Output Image                │
└─────────────────────────────────────┘
```

### Caching and Optimization

The system uses several levels of caching for performance optimization:

| Cache Type | Purpose | Variable |
| --- | --- | --- |
| **Text Cache** | Caching parsed text | `cachedText`, `cachedMessages` |
| **Font Cache** | Caching font objects | `cachedFonts` |
| **Font Metrics Cache** | Caching font metrics | `cachedFontMetrics` |
| **Image Cache** | Caching rendered image | `cachedImage` |
| **Emoji Cache** | Caching cut emoji | `cachedEmojiImages` |
| **Render Params Cache** | Caching render parameters | `lastRenderParams` |

---

## Usage Examples

### Example 1: Simple Chat

**Goal:** Create basic chat with 3 messages.

**Code:**
```
User1: Hello everyone!
User2: Hi!
User3: How are you?
```

**Settings:**
- Position: 0.5, 0.8
- Area Width: 400px
- Font Size: 40px
- Text Align: Left

### Example 2: Streamer Chat with Colors

**Goal:** Twitch chat simulation with moderator roles.

**Code:**
```
{StreamerName=#9146FF}: Welcome to the stream!
[+1000] {Moderator=#00FF00}: Hello everyone!
[+500] User1: :wave: Hi!
[+300] User2: Awesome! :fire:
[+500] {VIP=#FFD700}: Been waiting for this stream :smile:
```

**Settings:**
- Max Visible Messages: 5
- Line Spacing: 1.4
- Font Size: 35px
- Text Align: Left

### Example 3: Reactions with Emoji

**Goal:** Chat with lots of emoji.

**Code:**
```
User1: :fire: :fire: :fire:
[+200] User2: :thumbsup: :heart:
[+200] User3: AMAZING :star_struck:
[+200] User4: :clapping_hands: :clapping_hands:
[+200] User5: :muscle: LETS GO
```

**Settings:**
- Animation: smooth appearance every 200ms
- Max Visible Messages: 5

---

## Troubleshooting

### Problem: Text Not Displaying

**Possible causes:**

1. **Fonts not selected**
   - Solution: Select Nick Font and Message Font in settings

2. **Font size too small**
   - Solution: Increase Font Size to 30-50 pixels

3. **Text outside screen**
   - Solution: Check Position (must be in 0-1 range)

### Problem: Cyrillic Displaying Incorrectly

**Causes:**
- Font doesn't support Cyrillic

**Solution:**
- Use fonts with Cyrillic support:
  - Arial
  - Roboto
  - Open Sans
  - Noto Sans

### Problem: Emoji Not Appearing

**Possible causes:**

1. **Emoji Spritesheet not connected**
   - Solution: Connect spritesheet image to "Emoji Spritesheet" input

2. **Incorrect spritesheet format**
   - Solution: Ensure spritesheet has correct dimensions (generated has 32×31)
   - Format: PNG with transparency
   - Use generated `assets/emoji_spritesheet.png`

3. **Incorrect emoji code**
   - Solution: Use codes from EMOJI_SPRITESHEET_MAP table in .fuse file or `assets/emoji_map.lua`

### Problem: Slow Performance

**Optimization:**

1. **Reduce number of messages**
   - Max Visible Messages: 5-10 (instead of 50)

2. **Reduce render quality for preview**
   - Automatic: system uses quality 4 for fast preview

3. **Use cache**
   - Don't change parameters frequently
   - System automatically caches rendered frames

---

## Additional Resources

### Emoji List

ChatOverlay supports **971 emoji** generated from [Noto Emoji](https://github.com/googlefonts/noto-emoji).

#### Where to Find Complete List

Due to large number of emoji (971), complete list available in:
- **Project file:** `assets/emoji_map.lua` (after generation)
- **Online reference:** [Emoji Cheat Sheet](https://www.webfx.com/tools/emoji-cheat-sheet/) - convenient emoji code search

**Most Popular Emoji (examples):**

| Emoji | Code | Emoji | Code | Emoji | Code |
|-------|-----|-------|-----|-------|-----|
| 😀 | `:grinning_face:` | 😁 | `:grinning_face_with_big_eyes:` | 😂 | `:face_with_tears_of_joy:` |
| 😍 | `:smiling_face_with_heart_eyes:` | 😘 | `:face_blowing_a_kiss:` | 😉 | `:winking_face:` |
| 🤔 | `:thinking_face:` | 😎 | `:smiling_face_with_sunglasses:` | 👍 | `:thumbs_up:` |
| 👎 | `:thumbs_down:` | 👌 | `:OK_hand:` | 👏 | `:clapping_hands:` |
| 🙏 | `:folded_hands:` | 💪 | `:flexed_biceps:` | ❤️ | `:red_heart:` |
| 🔥 | `:fire:` | ✨ | `:sparkles:` | 🎉 | `:party_popper:` |
| 🚀 | `:rocket:` | ⭐ | `:star:` | 💎 | `:gem:` |
| 🏆 | `:trophy:` | 🐶 | `:dog_face:` | 🐱 | `:cat_face:` |
| 🍕 | `:pizza:` | ☕ | `:hot_beverage:` | 🎮 | `:video_game:` |

**Emoji Categories:**
- 😀 **Faces and Emotions** (~100 emoji)
- 👋 **Gestures and Hands** (~50 emoji)
- 👤 **People** (~200 emoji)
- 🐶 **Animals and Nature** (~150 emoji)
- 🍕 **Food and Drinks** (~100 emoji)
- ⚽ **Sports and Activities** (~80 emoji)
- 🚗 **Transport and Places** (~100 emoji)
- 💡 **Objects and Symbols** (~190 emoji)

**How to find needed code:**

1. Open `assets/emoji_map.lua` in text editor
2. Find line with needed emoji (search by name)
3. Use code in your message

**Example from emoji_map.lua:**
```lua
[":grinning_face:"] = 0,
[":fire:"] = 37,
[":red_heart:"] = 495,
```

---

### How to Use Emoji

Simply insert emoji code in message text:

```
User1: Hello! :smile: :wave:
User2: Cool! :fire: :thumbsup:
User3: :heart: :pizza: :coffee:
```

**Spritesheet Requirements:**

For emoji to work, spritesheet needs these parameters:

- **Grid size:** 32 columns × 31 rows (971 emoji, calculated automatically)
- **Format:** PNG with transparency (alpha channel)
- **Order:** left to right, top to bottom
- **Indexing:** starts from 0 (top left corner)
- **Source:** [Noto Emoji](https://github.com/googlefonts/noto-emoji)

---

### Supported Formats

| Element | Support |
| --- | --- |
| **Cyrillic** | ✅ Full support |
| **Latin** | ✅ Full support |
| **Emoji** | ✅ 971 emoji via spritesheet (Noto Emoji) |
| **Animation** | ✅ Smooth appearance |
| **Colors** | ✅ RGB, Hex |
| **Fonts** | ✅ All system fonts |

### Limitations

| Limitation | Value |
| --- | --- |
| Max Visible Messages | 50 |
| Max Font Size | 200px |
| Max Area Width | 1920px |
| Max Area Height | 1080px |
| Animation Duration | 200ms (fixed) |

### Technical Requirements

- **DaVinci Resolve:** version 18.0 or newer
- **Fusion:** built into DaVinci Resolve
- **Lua:** version built into Fusion

---

## License and Author

**Version:** 24
**Author:** Denys Stalenkov
**ID:** com.denys.chatoverlay

---

## Contact and Support

For bug reports, suggestions, and questions:

- **Email:** denis.stalenkov@gmail.com
- **GitHub:** [Mr-Robby/chat-generator-fuse](https://github.com/Mr-Robby/chat-generator-fuse)

---

_Documentation created: 2025
Last revision: 02.10.2025_
