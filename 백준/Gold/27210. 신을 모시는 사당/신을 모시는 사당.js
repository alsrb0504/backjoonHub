const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const data = input[1].trimEnd().split(" ");

const lefts = data.map((el) => {
  if (el === "1") return 1;
  else return -1;
});

const rights = data.map((el) => {
  if (el === "1") return -1;
  else return 1;
});

const dp1 = [lefts[0]];
const dp2 = [rights[0]];

for (let i = 1; i < N; i++) {
  const acc1 = dp1[i - 1] + lefts[i];
  const acc2 = dp2[i - 1] + rights[i];

  if (acc1 < 0) dp1[i] = 0;
  else dp1[i] = acc1;

  if (acc2 < 0) dp2[i] = 0;
  else dp2[i] = acc2;
}

const answer = Math.max(Math.max(...dp1), Math.max(...dp2));
console.log(answer);