const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trim()
  .split(" ");

const [n, k] = input.map(Number);

const MAX = 100000;
const visited = new Array(MAX + 1).fill(false);
const length = new Array(MAX + 1).fill(0);

bfs();

function bfs() {
  const queue = [n];
  visited[n] = true;

  while (queue.length !== 0) {
    const cur = queue.shift();

    if (cur === k) {
      console.log(length[k]);
      return;
    }

    // 3가지 경우를 방문
    let next1 = cur - 1;
    let next2 = cur + 1;
    let next3 = cur * 2;

    // 1. X - 1
    if (next1 >= 0 && visited[next1] === false) {
      queue.push(next1);
      visited[next1] = true;

      if (length[next1] !== 0) {
        length[next1] =
          length[next1] < length[cur] + 1 ? length[next1] : length[cur] + 1;
      } else {
        length[next1] = length[cur] + 1;
      }
    }

    // 2. X + 1
    if (next2 <= MAX && visited[next2] === false) {
      queue.push(next2);
      visited[next2] = true;

      if (length[next2] !== 0) {
        length[next2] =
          length[next2] < length[cur] + 1 ? length[next2] : length[cur] + 1;
      } else {
        length[next2] = length[cur] + 1;
      }
    }

    // 3. X * 2
    if (next3 <= MAX && visited[next3] === false) {
      queue.push(next3);
      visited[next3] = true;
      if (length[next3] !== 0) {
        length[next3] =
          length[next3] < length[cur] + 1 ? length[next3] : length[cur] + 1;
      } else {
        length[next3] = length[cur] + 1;
      }
    }
  }
}