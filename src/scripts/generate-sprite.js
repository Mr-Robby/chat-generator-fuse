const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { emojiMap: EMOJI_MAP } = require("../../assets/emoji/emoji_map.js");

const INPUT_FOLDER = "../../assets/emoji";
const OUTPUT_SPRITESHEET = "../../assets/emoji_spritesheet.png";
const OUTPUT_LUA_MAP = "../../assets/emoji_map.lua";
const EMOJI_SIZE = 32;

async function generateSpritesheet() {
  // Отримуємо список файлів які є в мапі
  const emojiEntries = Object.entries(EMOJI_MAP);

  console.log(`Генеруємо spritesheet для ${emojiEntries.length} emoji`);

  // Розраховуємо квадратну або близьку до квадратної сітку
  const cols = Math.ceil(Math.sqrt(emojiEntries.length));
  const rows = Math.ceil(emojiEntries.length / cols);

  const width = cols * EMOJI_SIZE;
  const height = rows * EMOJI_SIZE;

  const spritesheet = sharp({
    create: {
      width: width,
      height: height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  });

  const composites = [];
  const luaMap = [];

  for (let idx = 0; idx < emojiEntries.length; idx++) {
    const [emojiCode, filename] = emojiEntries[idx];
    const col = idx % cols;
    const row = Math.floor(idx / cols);

    const x = col * EMOJI_SIZE;
    const y = row * EMOJI_SIZE;

    const emojiPath = path.join(INPUT_FOLDER, filename);

    // Перевіряємо чи файл існує
    if (!fs.existsSync(emojiPath)) {
      console.warn(`⚠️  Файл не знайдено: ${filename}`);
      continue;
    }

    const emojiBuffer = await sharp(emojiPath)
      .resize(EMOJI_SIZE, EMOJI_SIZE, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    composites.push({
      input: emojiBuffer,
      left: x,
      top: y,
    });

    luaMap.push(`  ["${emojiCode}"] = ${idx},`);
    console.log(`${idx}: ${emojiCode} -> ${filename}`);
  }

  await spritesheet.composite(composites).png().toFile(OUTPUT_SPRITESHEET);

  console.log(`\n✅ Spritesheet: ${OUTPUT_SPRITESHEET}`);
  console.log(`📊 Розміри: ${cols} cols x ${rows} rows`);

  const luaContent = `local SPRITE_COLS = ${cols}
local SPRITE_ROWS = ${rows}

local EMOJI_SPRITESHEET_MAP = {
${luaMap.join("\n")}
}

return EMOJI_SPRITESHEET_MAP`;

  fs.writeFileSync(OUTPUT_LUA_MAP, luaContent);
  console.log(`✅ Lua мапа: ${OUTPUT_LUA_MAP}`);
}

generateSpritesheet().catch(console.error);
