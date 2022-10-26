const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const parents = input.slice(1, 1 + N).map((line) => line.trimEnd());
const prefix = input.slice(1 + N, 1 + N + M).map((line) => line.trimEnd());

let answer = 0;

for (let i = 0; i < prefix.length; i++) {
  const str = prefix[i];
  const strLength = str.length;
  let isFind = false;

  for (let j = 0; j < N && !isFind; j++) {
    if (strLength > parents[j].length) continue;

    if (str === parents[j].slice(0, strLength)) {
      answer++;
      isFind = true;
    }
  }
}

console.log(answer);
