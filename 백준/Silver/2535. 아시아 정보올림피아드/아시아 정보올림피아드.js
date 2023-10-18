const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const data = input.slice(1, 1 + N).map((el) => el.split(" ").map(Number));
data.sort((a, b) => b[2] - a[2]);

const answer = [];
const map = new Map();

for (let i = 0; i < N; i++) {
  const [nation, num, score] = data[i];

  if (answer.length === 3) break;

  if (map.has(nation)) {
    if (map.get(nation) >= 2) continue;

    answer.push(`${nation} ${num}`);
    map.set(nation, 2);
  } else {
    answer.push(`${nation} ${num}`);
    map.set(nation, 1);
  }
}

console.log(answer.join("\n"));
