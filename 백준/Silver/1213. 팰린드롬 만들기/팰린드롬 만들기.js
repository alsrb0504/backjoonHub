const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const message = "I'm Sorry Hansoo";

const map = new Map();
const size = input[0].length;
const isOdd = size % 2 === 1 ? true : false;

const answer = [];

input[0].split("").forEach((el) => {
  if (map.has(el)) {
    map.set(el, map.get(el) + 1);
  } else {
    map.set(el, 1);
  }
});

const arr = [...map].sort((a, b) => {
  return a[0].charCodeAt(0) - b[0].charCodeAt(0);
});

let isPossible = false;

// 홀수일 경우
if (isOdd) {
  let odd_cnt = 0;

  arr.forEach((el) => {
    if (el[1] % 2 === 1) odd_cnt++;
  });

  if (odd_cnt > 1) isPossible = true;
}
// 짝수일 경우
else {
  let odd_cnt = 0;

  arr.forEach((el) => {
    if (el[1] % 2 === 1) odd_cnt++;
  });

  if (odd_cnt > 0) isPossible = true;
}

// 불가능한 경우
if (isPossible) {
  console.log(message);
  return;
}

let odd_char = "";

arr.forEach((el) => {
  const [char, cnt] = el;
  const half = Math.floor(cnt / 2);

  if (cnt % 2 === 1) odd_char = char;

  for (let i = 0; i < half; i++) {
    answer.push(char);
  }
});

console.log(answer.join("") + odd_char + answer.reverse().join(""));
