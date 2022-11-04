const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);

const nums = input[1].split("").map(Number);

const stack = [];
let delete_cnt = 0;

for (let i = 0; i < N; i++) {
  const now = nums[i];

  if (stack.length === 0 || now <= stack[stack.length - 1] || delete_cnt === K)
    stack.push(now);
  else {
    while (stack.length && now > stack[stack.length - 1] && delete_cnt < K) {
      stack.pop();
      delete_cnt++;
    }

    stack.push(now);
  }
}

if (delete_cnt < K) {
  const rest = K - delete_cnt;
  for (let i = 0; i < rest; i++) stack.pop();
}

console.table(stack.join(""));