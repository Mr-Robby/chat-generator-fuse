# Chat Overlay Generator для DaVinci Resolve

Плагін Fuse для DaVinci Resolve, який створює анімовані накладки чату для відео. Ідеально підходить для стрімерів, відеоредакторів та контент-мейкерів.

[🇬🇧 English Version](README.md) | [📖 Повна документація](docs/README.uk.md)

## ✨ Можливості

- ✅ **971 емодзі** - Автоматично згенерований spritesheet з Noto Emoji
- ✅ **Підтримка кирилиці** - Українська та російська мови
- ✅ **Кольорові нікнейми** - Налаштування кольорів для користувачів
- ✅ **Плавна анімація** - Елегантна поява повідомлень
- ✅ **Перенос тексту** - Автоматичне перенесення на новий рядок
- ✅ **Затримки** - Налаштування часу появи повідомлень
- ✅ **Налаштування стилю** - Шрифти, кольори, розміри, тіні

## 📥 Встановлення

### Швидке встановлення

1. Завантажте `ChatBox.fuse` з [Releases](https://github.com/Mr-Robby/chat-generator-fuse/releases)
2. Скопіюйте в папку Fuses:
   - **Windows:** `C:\Users\[ІМ'Я]\AppData\Roaming\Blackmagic Design\DaVinci Resolve\Support\Fusion\Fuses\`
   - **macOS:** `/Users/[ІМ'Я]/Library/Application Support/Blackmagic Design/DaVinci Resolve/Fusion/Fuses/`
   - **Linux:** `/home/[ІМ'Я]/.local/share/DaVinciResolve/Fusion/Fuses/`
3. Перезапустіть DaVinci Resolve
4. Знайдіть в **Effects → Generators → ChatOverlay**

### З підтримкою емодзі

1. Завантажте `emoji_spritesheet.png` з [Releases](https://github.com/Mr-Robby/chat-generator-fuse/releases)
2. У Fusion додайте нод **Loader**
3. Завантажте `emoji_spritesheet.png`
4. З'єднайте Loader з входом **"Emoji Spritesheet"** на ChatOverlay

## 🚀 Швидкий старт

### Базовий чат

```
User1: Привіт!
User2: Вітаю!
User3: Як справи?
```

### З кольорами та емодзі

```
{Admin=#FF0000}: Ласкаво просимо на стрім! :fire:
[+1000] {Moderator=#00FF00}: Дякую! :thumbsup:
[+500] User1: Привіт всім! :wave:
```

### Формати

- **Простий текст**: `Повідомлення без нікнейму`
- **З нікнеймом**: `Користувач: Текст повідомлення`
- **Кольоровий нікнейм**: `{Користувач=#FF0000}: Повідомлення`
- **Затримка**: `[+1000] Повідомлення` (затримка 1000мс)
- **Емодзі**: `:fire:` `:heart:` `:thumbsup:`

Коди емодзі: [Emoji Cheat Sheet](https://www.webfx.com/tools/emoji-cheat-sheet/)

## 🛠️ Розробка

### Генерація Emoji Spritesheet

```bash
# Встановіть залежності
npm install

# Скопіюйте потрібні емодзі
node src/scripts/copy-em.js

# Згенеруйте spritesheet
node src/scripts/generate-sprite.js
```

Створюються:
- `assets/emoji_spritesheet.png` - Spritesheet (1024×992px, сітка 32×31)
- `assets/emoji_map.lua` - Мапа координат емодзі

### Оновлення ChatBox.fuse

Після генерації вручну скопіюйте вміст з `assets/emoji_map.lua` в `src/ChatBox.fuse` (рядки 90-1065).

## 📖 Документація

- [Повна документація](docs/README.md) - Детальний посібник з прикладами
- [Emoji Cheat Sheet](https://www.webfx.com/tools/emoji-cheat-sheet/) - Пошук кодів емодзі

## 🎯 Використання

- **Стрімінг** - Накладки чату для Twitch, YouTube, Discord
- **Реакції** - Показ коментарів під час реакцій
- **Навчальні відео** - Формат питань та відповідей
- **Соціальні мережі** - TikTok, Instagram Reels, YouTube Shorts

## 📄 Ліцензія

Проєкт ліцензований під MIT License - деталі в [LICENSE](LICENSE).

### Подяки

- **Емодзі** - [Noto Emoji](https://github.com/googlefonts/noto-emoji) від Google (Apache 2.0)

## 👤 Автор

**Денис Стальонков**
- Email: denis.stalenkov@gmail.com
- GitHub: [@Mr-Robby](https://github.com/Mr-Robby)

---

**Версія:** 24
**Вимоги:** DaVinci Resolve 18.0+
