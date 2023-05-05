const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, dist] = input[0].split(" ").map(Number);
let roads = input.slice(1, 1 + N).map((el) => el.split(" ").map(Number));

roads = roads.filter((el) => {
  const [start, end, cost] = el;

  if (end > dist) return false;
  if (end - start < cost) return false;

  return true;
});

roads.sort((a, b) => a[1] - b[1]);

const dp = [...new Array(dist + 1).keys()];

roads.forEach((el) => {
  const [start, end, cost] = el;
  const updated = dp[start] + cost;

  if (updated < dp[end]) {
    for (let i = end; i <= dist; i++) {
      if (dp[i] > updated + i - end) dp[i] = updated + i - end;
    }
  }
});

console.log(dp[dist]);
