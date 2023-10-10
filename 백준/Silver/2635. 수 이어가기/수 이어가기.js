const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n")
  .map((el) => el.trimEnd());

const N = Number(input[0]);
let maxLength = 0;
let maxResult = [];

for (let i = 0; i < N; i++) {
  let first = N;
  let second = N - i;
  const result = [first, second];

  while (first >= 0 && second >= 0) {
    const tmp = first - second;
    if (tmp < 0) break;

    result.push(tmp);
    first = second;
    second = tmp;
  }

  if (maxLength < result.length) {
    maxLength = result.length;
    maxResult = [...result];
  }
}

console.log(`${maxLength}\n${maxResult.join(" ")}`);
