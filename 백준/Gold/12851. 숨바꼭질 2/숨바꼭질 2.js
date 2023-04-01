const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const SIZE = 100000;
const [start, end] = input[0].split(" ").map(Number);

const visited = Array.from({ length: SIZE + 1 }, () => [Infinity, 0]);
visited[start][0] = 0;
visited[start][1] = 1;

const q = [[start, 0]];

while (q.length) {
  const [curr, cnt] = q.shift();

  const double = curr * 2;
  const next = curr + 1;
  const prev = curr - 1;

  const curr_cnt = visited[curr][1];

  // if (double <= end * 2 && double <= SIZE) {
  if (double <= SIZE) {
    if (visited[double][0] === cnt + 1) {
      visited[double][1] += curr_cnt;
    }

    if (visited[double][0] === Infinity) {
      visited[double][0] = cnt + 1;
      visited[double][1] = curr_cnt;
      q.push([double, cnt + 1]);
    }
  }

  // if (next <= end * 2 && double <= SIZE) {
  if (next <= SIZE) {
    if (visited[next][0] === cnt + 1) {
      visited[next][1] += curr_cnt;
    }

    if (visited[next][0] === Infinity) {
      visited[next][0] = cnt + 1;
      visited[next][1] = curr_cnt;
      q.push([next, cnt + 1]);
    }
  }

  if (prev >= 0) {
    if (visited[prev][0] === cnt + 1) {
      visited[prev][1] += curr_cnt;
    }

    if (visited[prev][0] === Infinity) {
      visited[prev][0] = cnt + 1;
      visited[prev][1] = curr_cnt;
      q.push([prev, cnt + 1]);
    }
  }
}

console.log(visited[end].join("\n"));
