const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const W = Number(input[1]);

const MAX = 1000 + 2;
const events = input.slice(2, 2 + W).map((el) => el.split(" ").map(Number));
const dp = Array.from({ length: MAX }, () => new Array(MAX).fill(0));
const path = [];

events.unshift([1, 1]);
events.push([N, N]);

const minDist = FindMinPath(0, W + 1, 1);
ShowPath(0, W + 1);
console.log(`${minDist}\n${path.join("\n")}`);

function GetDistance(pos1, pos2) {
  return (
    Math.abs(events[pos1][0] - events[pos2][0]) +
    Math.abs(events[pos1][1] - events[pos2][1])
  );
}

function FindMinPath(p1, p2, next) {
  if (next > W) return 0;
  if (dp[p1][p2] !== 0) return dp[p1][p2];

  const p1Cost = GetDistance(p1, next) + FindMinPath(next, p2, next + 1);
  const p2Cost = GetDistance(p2, next) + FindMinPath(p1, next, next + 1);

  return (dp[p1][p2] = Math.min(p1Cost, p2Cost));
}

function ShowPath(p1, p2) {
  for (let next = 1; next <= W; next++) {
    const p1Cost = GetDistance(p1, next) + dp[next][p2];
    const p2Cost = GetDistance(p2, next) + dp[p1][next];

    if (p1Cost < p2Cost) {
      path.push(1);
      p1 = next;
    } else {
      path.push(2);
      p2 = next;
    }
  }
}
