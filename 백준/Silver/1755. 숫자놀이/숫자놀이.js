const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const str = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  0: "zero",
};

const reverseStr = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  zero: 0,
};

const [start, end] = input[0].split(" ").map(Number);
const nums = [];

for (let i = start; i <= end; i++) {
  const num = i
    .toString()
    .split("")
    .map((el) => str[el]);

  nums.push(num.join(" "));
}

nums.sort();

const answer = nums.map((el) => {
  const num = el.split(" ").map((ch) => reverseStr[ch]);
  return num.join("");
});

const result = [];

for (let i = 0; i < answer.length; i += 10) {
  result.push(answer.slice(i, i + 10).join(" "));
}

console.log(result.join("\n"));
