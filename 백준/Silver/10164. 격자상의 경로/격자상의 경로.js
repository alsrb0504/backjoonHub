const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [H, W, target] = input[0].split(" ").map(Number);
const dp = Array.from({ length: H }, () => new Array(W).fill(1));
let [ty, tx] = [0, 0];

if (target !== 0) {
  if (target % W === 0) {
    ty = Math.floor(target / W) - 1;
    tx = 4;
  } else {
    ty = Math.floor(target / W);
    tx = (target % W) - 1;
  }
}

findDest(0, 0, ty, tx);
findDest(ty, tx, H - 1, W - 1);

console.log(dp[H - 1][W - 1]);

function findDest(sy, sx, ey, ex) {
  for (let y = sy; y <= ey; y++) {
    for (let x = sx; x <= ex; x++) {
      // 첫 줄
      if (y === sy) {
        if (x === sx) continue;

        dp[y][x] = dp[y][x - 1];
      }
      // 첫 줄 이후
      else {
        if (x === sx) dp[y][x] = dp[y - 1][x];
        else dp[y][x] = dp[y - 1][x] + dp[y][x - 1];
      }
    }
  }
}
