const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const tc = Number(input[0]);
const answer = [];
let lineIdx = 1;

for (let i = 0; i < tc; i++) {
  answer.push(solution(lineIdx));
}

console.log(answer.join("\n"));

function solution(line) {
  const N = Number(input[line]);
  const data = input.slice(line + 1, line + 1 + N).map((el) => el.trimEnd());

  lineIdx += N + 1;

  const unionData = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (i === j) continue;

      unionData.push(`${data[i]}${data[j]}`);
    }
  }

  for (const str of unionData) {
    if (isPalindrom(str)) return str;
  }

  return 0;
}

function isPalindrom(str) {
  let lt = 0;
  let rt = str.length - 1;

  while (lt <= rt) {
    if (str[lt] !== str[rt]) return false;
    lt++;
    rt--;
  }

  return true;
}
