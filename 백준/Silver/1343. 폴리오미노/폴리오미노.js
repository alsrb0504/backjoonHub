const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const str = input[0].split("");
const answer = [];

let cnt = 0;
let isPossible = true;

for (let i = 0; i < str.length; i++) {
  const cur = str[i];

  if (cur === ".") {
    if (cnt > 0) {
      if (!calc(cnt)) {
        isPossible = false;
        break;
      }
      cnt = 0;
    }

    answer.push(".");
  } else {
    cnt++;
  }
}

if (!isPossible) {
  console.log(-1);
} else {
  if (calc(cnt)) {
    console.log(answer.join(""));
  } else {
    console.log(-1);
  }
}

function calc(num) {
  if (num % 2 !== 0) return false;

  const four = Math.floor(num / 4);
  const two = (num - four * 4) / 2;

  for (let i = 0; i < four; i++) answer.push("AAAA");
  for (let i = 0; i < two; i++) answer.push("BB");

  return true;
}
