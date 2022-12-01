const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [_, N] = input[0].split(" ").map(Number);
const data = input[1].split("");
const hbr = [];
const pers = [];
let answer = 0;

data.forEach((ch, idx) => {
  if (ch === "H") hbr.push(idx);
  else pers.push(idx);
});

// i : 햄버거, j : 사람
for (let i = 0, j = 0; i < hbr.length && j < pers.length; i++) {
  const h = hbr[i];
  let p = pers[j];
  const diff = Math.abs(h - p);

  if (diff <= N) {
    answer++;
    j++;
  } else {
    if (h < p) {
    } else {
      i--;
      j++;
    }
  }
}

console.log(answer);
