const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(BigInt);

const visited = new Array(N).fill(false);
const stack = [];

const answer = [];

function dfs(cnt) {
  // console.log(`cnt = ${cnt}`);
  // console.log(stack);

  if (cnt === N) {
    // console.log(stack);
    answer.push(stack.join(" "));
    return;
  }

  for (let i = 0; i < N; i++) {
    if (visited[i]) continue;

    // 굳이 다 탐색할 필요는 없음.
    // 나누기 3 or 곱하기 3이 되는 경우만 탐색
    if (stack.length === 0) {
      stack.push(arr[i]);

      visited[i] = true;
      dfs(1);
      visited[i] = false;

      stack.pop();
    } else {
      const x = stack[stack.length - 1];
      const next = arr[i];

      // bigInt?

      if ((x % 3n === 0n && next * 3n === x) || x * 2n === next) {
        // console.log("check");

        // console.log(stack);

        visited[i] = true;
        stack.push(next);
        dfs(cnt + 1);
        stack.pop();
        visited[i] = false;
      }
    }
  }
}

dfs(0);

console.log(answer[0]);