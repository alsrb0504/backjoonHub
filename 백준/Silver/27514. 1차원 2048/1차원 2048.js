const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const nums = input[1].split(" ").map(BigInt);
const map = new Array(64).fill(0);

nums.forEach((num) => {
  if (num === 0n) return;

  let tmp = num;
  let cnt = 0;

  while (tmp > 1n) {
    tmp = tmp / 2n;
    cnt++;
  }

  map[cnt]++;
});

for (let i = 0; i < 63; i++) {
  if (map[i] > 1) {
    const up = Math.floor(map[i] / 2);

    map[i + 1] += up;
  }
}

let answer = 1n;

for (let i = 63; i >= 0; i--) {
  if (map[i] > 0) {
    for (let j = 0; j < i; j++) {
      answer *= 2n;
    }

    console.log(answer.toString());
    return;
  }
}

console.log(0);
