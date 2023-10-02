const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n")
  .map((el) => el.trimEnd());

const [N, K] = input[0].split(" ").map(Number);

let rest = N;

for (let i = 0; i < K - 1; i++) {
  let exp = 0;

  while (rest - 2 ** exp > 0) {
    exp++;
  }

  if (exp > 0) {
    rest -= 2 ** (exp - 1);
  }
}

let exp = 0;

while (rest - 2 ** exp > 0) {
  exp++;
}

console.log(2 ** exp - rest);
