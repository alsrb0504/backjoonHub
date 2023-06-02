const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const tc = Number(input[0]);
const answer = [];
let line = 1;

for (let i = 0; i < tc; i++) {
  const N = Number(input[line]);
  answer.push(solution(line + 1, N));
  line += N + 1;
}

console.log(answer.join("\n"));

function solution(curLine, N) {
  const map = new Map();

  for (let i = 0; i < N; i++) {
    const [item, category] = input[curLine + i].trimEnd().split(" ");

    if (map.has(category)) map.get(category).add(item);
    else map.set(category, new Set().add(item));
  }

  const data = [];
  map.forEach((set) => {
    data.push(set.size);
  });

  let result = 1;
  data.forEach((val) => {
    result *= val + 1;
  });

  return result - 1;
}
