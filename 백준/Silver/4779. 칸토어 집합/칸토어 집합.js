const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n")
  .map((el) => el.trimEnd());

const answer = [];
const tc = input.map(Number);

for (const N of tc) {
  answer.push(solution(N));
}

console.log(answer.join("\n"));

function solution(N) {
  const arr = new Array(3 ** N + 1).fill("-");

  cantor(1, 3 ** N);

  return arr.slice(1).join("");

  function cantor(startIdx, length) {
    if (length === 1) return;

    const splitedLength = length / 3;

    for (let i = 0; i < splitedLength; i++) {
      arr[startIdx + splitedLength + i] = " ";
    }

    cantor(startIdx, splitedLength);
    cantor(startIdx + 2 * splitedLength, splitedLength);
  }
}
