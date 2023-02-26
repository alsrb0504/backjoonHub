const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = input
  .slice(1, 1 + N)
  .map((el) => el.trimEnd().split("").map(Number));

let answer = 1;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    const curr = map[i][j];

    let cnt = 1;
    let isPossble = 1;

    while (true) {
      const right = j + cnt;
      const down = i + cnt;

      if (right >= M || down >= N) break;

      if (
        map[i][right] === curr &&
        map[down][j] === curr &&
        map[down][right] === curr
      ) {
        isPossble = cnt + 1;
      }

      cnt++;
    }

    answer = Math.max(isPossble * isPossble, answer);
  }
}

console.log(answer);
