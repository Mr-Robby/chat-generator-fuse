const fs = require("fs");
const path = require("path");
const { allEmoj } = require("./all-em-obj.js");

// Конфігурація шляхів
const sourceDir = "../../assets/noto-emoj"; // Папка з усіма емоджі
const targetDir = "../../assets/emoji"; // Папка для вибраних емоджі

// Створення плоского об'єкту з unicode як ключ
const emojiMap = {};
Object.values(allEmoj).forEach((category) => {
  category.forEach((emoji) => {
    emojiMap[emoji.unicode] = emoji.shortcode;
  });
});

// Створити цільову папку якщо не існує
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Функція копіювання емоджі
function copyEmojis() {
  let copiedCount = 0;
  let notFoundCount = 0;
  const notFound = [];

  console.log("Починаю копіювання емоджі...\n");

  // Спочатку отримаємо список всіх файлів
  const allFiles = fs
    .readdirSync(sourceDir)
    .filter((file) => file.endsWith(".png"));
  console.log(`Знайдено ${allFiles.length} PNG файлів у папці\n`);

  for (const [unicodeCode, shortcode] of Object.entries(emojiMap)) {
    // Конвертуємо Unicode формат U+1F600 в формат файлу 1f600
    // U+1F600 -> 1f600, U+1F600 U+200D U+FE0F -> 1f600_200d
    const fileCode = unicodeCode
      .split(/\s+/) // Розділяємо по пробілах
      .map(code => code.replace(/U\+/g, "")) // Прибираємо U+
      .filter(code => code.toLowerCase() !== "fe0f") // ВИДАЛЯЄМО FE0F повністю
      .join("_")
      .toLowerCase();

    // Розбиваємо на окремі коди для аналізу
    const codes = fileCode.split("_").filter(c => c);
    const mainCode = codes[0]; // Перший код завжди головний

    // Шукаємо файли що містять наш Unicode код
    const matchingFiles = allFiles.filter((file) => {
      const lowerFile = file.toLowerCase();

      // Точне співпадіння
      if (lowerFile === `emoji_u${fileCode}.png`) {
        return true;
      }

      // Якщо є кілька кодів, шукаємо файл що містить всі коди в правильному порядку
      if (codes.length > 1) {
        const fileName = lowerFile.replace("emoji_u", "").replace(".png", "");
        const fileCodes = fileName.split("_").filter(c => c);

        // Перевіряємо чи файл містить всі наші коди в тому ж порядку
        if (fileCodes.length < codes.length) return false;

        let fileIndex = 0;
        for (const code of codes) {
          const found = fileCodes.indexOf(code, fileIndex);
          if (found === -1) return false;
          fileIndex = found + 1;
        }
        return fileCodes[0] === mainCode; // Перший код повинен співпадати
      }

      // Для одиночних кодів
      return lowerFile === `emoji_u${mainCode}.png`;
    });

    if (matchingFiles.length > 0) {
      // Беремо перший знайдений файл
      const sourceFile = matchingFiles[0];
      const sourcePath = path.join(sourceDir, sourceFile);
      const targetPath = path.join(targetDir, `${fileCode}.png`);

      try {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`✓ ${shortcode} → ${sourceFile}`);
        copiedCount++;
      } catch (error) {
        console.error(`Помилка копіювання ${sourceFile}:`, error.message);
        notFound.push({ shortcode, unicodeCode, reason: "copy_error" });
        notFoundCount++;
      }
    } else {
      notFound.push({ shortcode, unicodeCode, reason: "not_found" });
      notFoundCount++;
      console.log(`✗ ${shortcode} (${unicodeCode}) - не знайдено файл`);
    }
  }

  console.log(`\n=== Результат ===`);
  console.log(`Скопійовано: ${copiedCount}`);
  console.log(`Не знайдено: ${notFoundCount}`);

  if (notFound.length > 0) {
    console.log("\nНе знайдені файли:");
    notFound.forEach(({ shortcode, unicodeCode, reason }) => {
      console.log(`- ${shortcode} (${unicodeCode}) - ${reason}`);
    });

    // Покажемо приклади файлів для ручного пошуку
    console.log("\nПриклади файлів у папці (перші 10):");
    allFiles.slice(0, 10).forEach((file) => console.log(`  ${file}`));
  }
}

// Генерація JS об'єкту
function generateJsMap() {
  const jsMapPath = path.join(targetDir, "emoji_map.js");
  let jsContent = "const emojiMap = {\n";

  for (const [unicodeCode, shortcode] of Object.entries(emojiMap)) {
    // Та сама логіка що й в copyEmojis - прибираємо FE0F
    const fileCode = unicodeCode
      .split(/\s+/)
      .map(code => code.replace(/U\+/g, ""))
      .filter(code => code.toLowerCase() !== "fe0f")
      .join("_")
      .toLowerCase();
    jsContent += `  "${shortcode}": "${fileCode}.png",\n`;
  }

  jsContent += "};\n\nmodule.exports = { emojiMap };";

  fs.writeFileSync(jsMapPath, jsContent);
  console.log(`\nJS мапінг збережено в: ${jsMapPath}`);
}

// Запуск
if (process.argv.includes("--js-only")) {
  generateJsMap();
} else {
  copyEmojis();
  generateJsMap();
}
