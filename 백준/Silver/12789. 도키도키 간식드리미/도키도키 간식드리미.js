const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const data = input[1].split(" ").map(Number);
const stack = [];

const Nice = "Nice";
const Sad = "Sad";

let currIdx = 1;
let isPossible = true;

for (let i = 0; i < N; i++) {
  const curr = data[i];

  // 현재 번호가 맞지 않음
  if (currIdx !== curr) {
    // stack확인
    while (stack.length) {
      const top = stack.at(-1);

      // stack의 TOP이 일치한다면 POP
      if (top === currIdx) {
        currIdx++;
        stack.pop();
      } else {
        break;
      }
    }

    // 다시 확인
    if (currIdx !== curr) {
      stack.push(curr);
    } else {
      currIdx++;
    }
  }
  // 현재 번호가 맞음
  else {
    currIdx++;
  }
}

while (stack.length) {
  const curr = stack.pop();

  if (curr !== currIdx) {
    isPossible = false;
    break;
  }

  currIdx++;
}

console.log(isPossible ? Nice : Sad);
