const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

let [N, SIZE] = input[0].split(" ").map((el) => Number(el));
const cnt = Number(input[1]);
const data = input.slice(2, 2 + cnt).map(Number);

let lt = 1;
let rt = SIZE;
let answer = 0;

data.forEach((num) => {
  if (lt <= num && num <= rt) {
  } else if (num < lt) {
    const diff = lt - num;

    answer += diff;
    lt = num;
    rt = lt - 1 + SIZE;
  } else if (rt < num) {
    const diff = num - rt;

    answer += diff;
    rt = num;
    lt = rt + 1 - SIZE;
  }
});

console.log(answer);
