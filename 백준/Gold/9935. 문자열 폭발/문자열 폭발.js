const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const str = input[0].trimEnd();
const bomb = input[1].trimEnd();
const bombLength = bomb.length;
const stack = [];

for (let i = 0; i < str.length; i++) {
  stack.push(str[i]);
  if (stack.length >= bombLength) {
    const topStr = stack
      .slice(stack.length - bombLength, stack.length)
      .join("");

    if (topStr === bomb) {
      for (let j = 0; j < bombLength; j++) stack.pop();
    }
  }
}

console.log(stack.length > 0 ? stack.join("") : "FRULA");