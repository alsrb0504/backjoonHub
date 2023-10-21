const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const data = input.slice(1, 1 + N).map((el) => el.trimEnd().split(""));
const nums = [];

for (let i = 0; i < N; i++) {
  const str = data[i];

  let stack = [];

  for (let j = 0; j < str.length; j++) {
    const ch = str[j];

    if ("0" <= ch && ch <= "9") {
      stack.push(ch);

      if (j === str.length - 1 && stack.length) {
        nums.push(BigInt(stack.join("")));
      }
    } else {
      if (stack.length) {
        nums.push(BigInt(stack.join("")));
      }
      stack = [];
    }
  }
}

console.log(
  nums
    .sort((a, b) => {
      if (a.length === b.length) {
        return a > b ? 1 : -1;
      }
      return a.length - b.length;
    })
    .join("\n")
);
