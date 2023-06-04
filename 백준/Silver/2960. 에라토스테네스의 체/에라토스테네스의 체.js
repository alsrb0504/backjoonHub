const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);

const nums = new Array(N + 1).fill(true);
let cnt = 0;

for (let i = 2; i <= N; i++) {
  if (nums[i]) {
    for (let j = i; j <= N; j += i) {
      if (!nums[j]) continue;

      cnt++;
      nums[j] = false;

      if (cnt === K) {
        console.log(j);
        return;
      }
    }
  }
}