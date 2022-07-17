const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

input.shift();
const haveCards = input.shift().split(" ").map(Number);
input.shift();
const findCards = input.shift().split(" ").map(Number);

const map = new Map();
let answer = "";

haveCards.forEach((card) => {
  if (map.has(card)) map.set(card, map.get(card) + 1);
  else map.set(card, 1);
});

findCards.forEach((card) => {
  if (map.has(card)) answer += map.get(card) + " ";
  else answer += 0 + " ";
});

console.log(answer.trimEnd());