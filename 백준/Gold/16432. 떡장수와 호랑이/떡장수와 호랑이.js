const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const dp = Array.from({ length: N }, () => new Array(10).fill(-1));
const records = Array.from({ length: N }, () => []);
const answer = [];

input.slice(1, 1 + N).map((el, idx) => {
  const nums = el.split(" ").map(Number);

  for (let i = 1; i < nums.length; i++) {
    records[idx].push(nums[i]);
  }
});

records[0].forEach((el) => {
  dp[0][el] = 0;
});

records.forEach((nums, idx) => {
  if (idx !== 0) {
    nums.forEach((el) => {
      for (let i = 1; i < 10; i++) {
        if (el !== i && dp[idx - 1][i] !== -1) {
          dp[idx][el] = i;
          break;
        }
      }
    });
  }
});

for (let i = 1; i < N; i++) {}

for (let i = 1; i < 10; i++) {
  if (dp[N - 1][i] !== -1) {
    findRecord(N - 1, i);
    break;
  }
}

function findRecord(day, idx) {
  if (day === -1) return;

  answer.push(idx);

  findRecord(day - 1, dp[day][idx]);
}

if (answer.length === 0) console.log(-1);
else console.log(answer.reverse().join("\n"));
