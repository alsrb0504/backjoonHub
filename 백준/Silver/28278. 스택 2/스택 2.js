const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const data = input.slice(1, 1 + N).map((el) => el.split(" ").map(Number));

class myStack {
  stack = [];

  push(num) {
    this.stack.push(num);
  }

  empty() {
    if (this.stack.length === 0) {
      return 1;
    } else {
      return 0;
    }
  }

  size() {
    return this.stack.length;
  }

  pop() {
    if (this.empty() === 1) {
      return -1;
    }

    return this.stack.pop();
  }

  top() {
    if (this.empty() === 1) {
      return -1;
    }
    return this.stack[this.stack.length - 1];
  }
}

const S = new myStack();
const answer = [];

for (const [command, num] of data) {
  switch (command) {
    case 1: {
      S.push(Number(num));
      break;
    }
    case 2: {
      answer.push(S.pop());
      break;
    }
    case 3: {
      answer.push(S.size());
      break;
    }
    case 4: {
      answer.push(S.empty());
      break;
    }
    case 5: {
      answer.push(S.top());
      break;
    }
    default:
      break;
  }
}

console.log(answer.join("\n"));
