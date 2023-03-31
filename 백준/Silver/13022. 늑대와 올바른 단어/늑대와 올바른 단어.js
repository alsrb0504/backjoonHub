const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const str = input[0].split("");
const words = [];
let [prev, acc] = ["", 0];

for (let ch of str) {
  if (prev !== ch) {
    words.push([prev, acc]);

    acc = 1;
    prev = ch;
  } else {
    acc++;
  }
}

words.push([prev, acc]);
words.shift();

if (words.length % 4 !== 0) {
  console.log(0);
  return;
}

for (let i = 0; i < Math.floor(words.length / 4); i++) {
  if (!checkInvalid(i * 4)) {
    console.log(0);
    return;
  }
}

console.log(1);

function checkInvalid(idx) {
  const [_, fir_acc] = words[idx];

  if (words[idx][0] !== "w") return false;
  if (words[idx + 1][0] !== "o" || words[idx + 1][1] !== fir_acc) return false;
  if (words[idx + 2][0] !== "l" || words[idx + 2][1] !== fir_acc) return false;
  if (words[idx + 3][0] !== "f" || words[idx + 3][1] !== fir_acc) return false;

  return true;
}
