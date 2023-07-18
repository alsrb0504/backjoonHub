const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const str = input[0].split("");
let isU = false;
let isC1 = false;
let isP = false;
let isC2 = false;

for (const ch of str) {
  if (ch === "U") isU = true;
  if (ch === "C") {
    if (isU && !isC1) isC1 = true;
    else if (isU && isC1 && isP && !isC2) isC2 = true;
  }
  if (ch === "P" && isU && isC1) isP = true;
}

if (isU && isC1 && isP && isC2) console.log("I love UCPC");
else console.log("I hate UCPC");
