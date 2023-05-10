const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);

const arr = Array.from({ length: 101 }, () => new Array(101).fill(false));
let cnt = 0;

input.slice(1, 1 + N).forEach((el) => {
  const [left, bottom] = el.split(" ").map(Number);

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      arr[left + i][bottom + j] = true;
    }
  }
});

for (let i = 0; i < 101; i++) {
  for (let j = 0; j < 101; j++) {
    if (arr[i][j]) cnt++;
  }
}

console.log(cnt);