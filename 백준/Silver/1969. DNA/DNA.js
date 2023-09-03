const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, LENGTH] = input[0].split(" ").map(Number);
const dnas = input.slice(1, 1 + N).map((el) => el.trimEnd());
let answerDNA = "";
let answerCount = 0;

for (let i = 0; i < LENGTH; i++) {
  let map = new Map();
  for (let j = 0; j < N; j++) {
    const currDNA = dnas[j][i];
    map.set(currDNA, map.has(currDNA) ? map.get(currDNA) + 1 : 1);
  }

  const result = [...map];

  result.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] > b[0] ? 1 : -1;
    }
    return b[1] - a[1];
  });

  answerDNA += result[0][0];
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < LENGTH; j++) {
    if (answerDNA[j] !== dnas[i][j]) answerCount++;
  }
}

console.log(`${answerDNA}\n${answerCount}`);
