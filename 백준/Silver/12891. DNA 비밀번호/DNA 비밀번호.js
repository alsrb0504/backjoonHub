const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n")
  .map((el) => el.trimEnd());

const [N, S] = input[0].split(" ").map(Number);
const data = input[1];
const cond = input[2].split(" ").map(Number);
const q = {
  A: 0,
  C: 0,
  G: 0,
  T: 0,
};
let answer = 0;

for (let i = 0; i < S; i++) {
  q[data[i]]++;
}

if (checkCond()) answer++;

for (let i = S; i < N; i++) {
  const remove = data[i - S];
  const curr = data[i];

  q[remove]--;
  q[curr]++;

  if (checkCond()) answer++;
}

console.log(answer);

function checkCond() {
  if (q.A < cond[0]) return false;
  if (q.C < cond[1]) return false;
  if (q.G < cond[2]) return false;
  if (q.T < cond[3]) return false;
  return true;
}
