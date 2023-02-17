const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const tc = Number(input[0]);
const answer = [];

for (let i = 0; i < tc; i++) {
  answer.push(solution(i * 3 + 1));
}

console.log(answer.join("\n"));

function solution(l) {
  const commands = input[l].trimEnd().split("");
  const N = Number(input[l + 1]);
  const str = input[l + 2].trimEnd();
  const arr = str
    .slice(1, str.length - 1)
    .split(",")
    .map(Number);

  // 예외처리 : 원소가 없는 경우
  if (N === 0) {
    arr.pop();

    if (commands.includes("D")) return "error";
  }

  let left = 0;
  let right = N - 1;
  let isReverse = false;

  for (let i = 0; i < commands.length; i++) {
    const comd = commands[i];

    if (comd === "R") {
      isReverse = !isReverse;
    } else {
      if (left > right) return "error";

      if (isReverse) {
        right--;
      } else {
        left++;
      }
    }
  }

  const result = arr.slice(left, right + 1);

  return `[${isReverse ? result.reverse().join(",") : result.join(",")}]`;
}
