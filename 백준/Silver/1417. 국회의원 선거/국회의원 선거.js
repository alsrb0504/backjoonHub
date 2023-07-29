const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const data = input.slice(1, 1 + N).map(Number);

let dasom = data.shift();
let count = 0;

data.sort((a, b) => b - a);

while (true) {
  let isPossible = true;

  for (let i = 0; i < data.length; i++) {
    if (dasom <= data[i]) {
      dasom++;
      data[i]--;
      count++;

      data.sort((a, b) => b - a);
      isPossible = false;
      break;
    }
  }

  if (isPossible) break;
}

console.log(count);
