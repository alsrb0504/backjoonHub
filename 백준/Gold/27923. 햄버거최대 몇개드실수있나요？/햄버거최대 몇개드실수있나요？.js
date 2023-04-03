const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, K, L] = input[0].split(" ").map(Number);
const hamburgeres = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => b - a);

const cokes = input[2].split(" ").map(Number);
const cokeMap = new Map();
const cokeEffects = new Array(N + 1).fill(0);
const cokeAcc = new Array(N + 1).fill(0);
let answer = 0;

cokes.forEach((coke) => {
  cokeMap.set(coke, cokeMap.has(coke) ? cokeMap.get(coke) + 1 : 1);
});

for (let [key, val] of cokeMap) {
  cokeEffects[key] += val;
  if (key + L <= N) cokeEffects[key + L] -= val;
}

for (let i = 1; i <= N; i++) {
  cokeAcc[i] = cokeAcc[i - 1] + cokeEffects[i];
}

cokeAcc.sort((a, b) => b - a);

hamburgeres.forEach((hambur, idx) => {
  while (hambur !== 0 && cokeAcc[idx] > 0) {
    hambur = Math.floor(hambur / 2);
    cokeAcc[idx]--;
  }

  answer += hambur;
});

console.log(answer);
