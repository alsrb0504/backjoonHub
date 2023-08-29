const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const YES = " is acceptable.";
const NO = " is not acceptable.";
const words = input.map((el) => el.trimEnd());
words.pop();
const answer = [];

const aeiou = new Set(["a", "e", "i", "o", "u"]);

for (const word of words) {
  if (validateWord(word)) answer.push(`<${word}>${YES}`);
  else answer.push(`<${word}>${NO}`);
}

console.log(answer.join("\n"));

function validateWord(str) {
  let isIncludeAeiou = false;

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];

    if (aeiou.has(ch)) isIncludeAeiou = true;

    if (i > 0) {
      const prevCh = str[i - 1];
      if (prevCh === ch && ch !== "e" && ch !== "o") return false;
    }
    if (i > 1) {
      const prevprevCh = str[i - 2];
      const prevCh = str[i - 1];

      if (aeiou.has(prevprevCh) && aeiou.has(prevCh) && aeiou.has(ch))
        return false;
      if (!aeiou.has(prevprevCh) && !aeiou.has(prevCh) && !aeiou.has(ch))
        return false;
    }
  }

  return isIncludeAeiou;
}
