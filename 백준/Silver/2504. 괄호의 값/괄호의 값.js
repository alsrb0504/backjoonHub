const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const str = input[0].split("");
const stack = [];

if (!isPossible()) {
  end();
  return;
}

for (let ch of str) {
  if (ch === "(" || ch === "[") {
    stack.push(ch);
  } else if (ch === ")") {
    let acc = 0;

    if (stack.length === 0) {
      end();
      return;
    }

    while (stack.length) {
      const top = stack.pop();

      if (top === "(") {
        acc === 0 ? stack.push(2) : stack.push(acc * 2);
        break;
      } else if (typeof top === "number") {
        acc += top;
      } else {
        end();
        return;
      }
    }
  } else if (ch === "]") {
    let acc = 0;

    if (stack.length === 0) {
      end();
      return;
    }

    while (stack.length) {
      const top = stack.pop();

      if (top === "[") {
        acc === 0 ? stack.push(3) : stack.push(acc * 3);
        break;
      } else if (typeof top === "number") {
        acc += top;
      } else {
        end();
      }
    }
  } else {
    end();
    return;
  }
}

const answer = stack.reduce((acc, cur) => acc + cur, 0);

console.log(typeof answer === "number" ? answer : 0);

function end() {
  console.log(0);
}

function isPossible() {
  let miniStack = [];

  for (let ch of str) {
    if (ch === "(" || ch === "[") miniStack.push(ch);
    else if (ch === ")") {
      if (miniStack.length === 0 || miniStack.at(-1) !== "(") return false;
      miniStack.pop();
    } else if (ch === "]") {
      if (miniStack.length === 0 || miniStack.at(-1) !== "[") return false;

      miniStack.pop();
    }
  }

  if (miniStack.length !== 0) return false;
  return true;
}
