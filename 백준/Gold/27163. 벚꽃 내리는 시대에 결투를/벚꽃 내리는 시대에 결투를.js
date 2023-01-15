const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

let [N, A, L] = input[0].split(" ").map(Number);
const data = input.slice(1, 1 + N).map((el) => el.split(" ").map(Number));
const dp = Array.from({ length: N + 1 }, () => new Array(L + 1).fill(-1));
const path = Array.from({ length: N + 1 }, () => new Array(L + 1).fill(-1));

dp[0][L] = A;

for (let i = 0; i < N; i++) {
  const [X, Y] = data[i];

  for (let j = 1; j <= L; j++) {
    if (dp[i][j] === -1) continue;

    // 근데 오라를 최대로
    if (X !== -1 && Y !== -1) {
      // 오라로 받을 수 있다면 ok
      if (dp[i][j] >= X && dp[i + 1][j] < dp[i][j] - X) {
        dp[i + 1][j] = dp[i][j] - X;
        // path[i + 1][j] = `0 A`;
        path[i + 1][j] = 0;
      }

      // 라이프로 받을 수 있다면 ok
      if (j - Y > 0 && dp[i + 1][j - Y] < dp[i][j]) {
        dp[i + 1][j - Y] = dp[i][j];
        // path[i + 1][j - Y] = `${Y} L`;
        path[i + 1][j - Y] = Y;
      }
    }

    // 2. 라이프로 공격 받을 수 없음. =>  무조건 오러로 받아야 함.
    // 단, 오러가 음수가 되도 가능.
    else if (Y === -1) {
      const max_val = Math.max(dp[i][j] - X, 0);

      if (dp[i + 1][j] < max_val) {
        dp[i + 1][j] = max_val;
        // path[i + 1][j] = `0 A`;
        path[i + 1][j] = 0;
      }
    }

    // 1. 오러로 공격 받을 수 없음. => 무조건 라이프에 데미지
    else if (X === -1) {
      if (j - Y > 0 && dp[i + 1][j - Y] < dp[i][j]) {
        dp[i + 1][j - Y] = dp[i][j];
        // path[i + 1][j - Y] = `${Y} L`;
        path[i + 1][j - Y] = Y;
      }
    }
  }
}

// console.table(path);
// console.table(dp);

const reverse = [];

for (let i = 1; i <= L; i++) {
  if (dp[N][i] !== -1) {
    let idx = i;

    for (let j = N; j > 0; j--) {
      const [X, Y] = data[j - 1];
      const prev = path[j][idx];

      // console.log(`j = ${j}, idx = ${idx}`);

      idx += Number(prev);

      if (prev !== 0) reverse.push("L");
      // 오라로 받거나, Y === 0
      else {
        if (Y === 0) reverse.push("L");
        else reverse.push("A");
      }
      // reverse.push(at);
    }

    console.log("YES" + "\n" + reverse.reverse().join(""));
    return;
  }
}

console.log("NO");
