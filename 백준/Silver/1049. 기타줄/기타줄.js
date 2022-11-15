const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);

const set_price = [];
const rest_price = [];

input.slice(1, 1 + M).map((line) =>
  line
    .split(" ")
    .map(Number)
    .forEach((el, idx) => {
      if (idx === 0) set_price.push(el);
      else rest_price.push(el);
    })
);

let min_set = Math.min(...set_price);
const min_rest = Math.min(...rest_price);

min_set = min_set > min_rest * 6 ? min_rest * 6 : min_set;

const need_set = Math.floor(N / 6);
const need_rest = N % 6;

let answer = 0;
answer += min_set * need_set;
answer += min_set > min_rest * need_rest ? min_rest * need_rest : min_set;
console.log(answer);
