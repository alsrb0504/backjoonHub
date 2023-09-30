const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n")
  .map((el) => el.trimEnd());

const N = Number(input[0]);
const answer = [];

for (let i = 0; i < N; i++) {
  answer.push(`${i + 1} ${solution(i + 1)}`);
}

console.log(answer.join("\n"));

function solution(i) {
  const nums = input[i].split(" ").map(Number);

  let cnt = 0;

  nums.shift();

  for (let j = 0; j < 20; j++) {
    const curr = nums[j];

    for (let k = j + 1; k < 20; k++) {
      const next = nums[k];

      if (curr > next) cnt++;
    }
  }

  return cnt;
}
