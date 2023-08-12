const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, M, R] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + N).map((line) => line.split(" ").map(Number));
const answer = [];

for (let i = 0; i < R; i++) {
  let cnt = 0;

  while (cnt < Math.floor(N / 2) && cnt < Math.floor(M / 2)) {
    // 1. 아래
    let prev = map[cnt][cnt];
    for (let y = cnt + 1; y < N - cnt; y++) {
      const curr = map[y][cnt];
      map[y][cnt] = prev;
      prev = curr;
    }

    // 2. 오른쪽
    for (let x = cnt + 1; x < M - cnt; x++) {
      const curr = map[N - 1 - cnt][x];
      map[N - 1 - cnt][x] = prev;
      prev = curr;
    }

    // 3. 위
    for (let y = N - 2 - cnt; y >= cnt; y--) {
      const curr = map[y][M - 1 - cnt];
      map[y][M - 1 - cnt] = prev;
      prev = curr;
    }

    // 4. 왼쪽
    for (let x = M - 2 - cnt; x >= cnt; x--) {
      const curr = map[cnt][x];
      map[cnt][x] = prev;
      prev = curr;
    }

    cnt++;
  }
}

for (let i = 0; i < N; i++) {
  answer.push(map[i].join(" "));
}

console.log(answer.join("\n"));
