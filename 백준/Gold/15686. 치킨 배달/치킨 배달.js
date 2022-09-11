const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = [];
const houses = [];
const stores = [];
const stack = [];

let answer = Infinity;

for (let i = 1; i <= N; i++) {
  map.push(input[i].split(" ").map(Number));
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    const n = map[i][j];

    if (n === 1) {
      houses.push([i, j]);
    }
    if (n === 2) {
      stores.push([i, j]);
    }
  }
}

function dfs(cnt, start) {
  if (cnt === M) {
    answer = Math.min(answer, calcDist());
    return;
  }

  for (let i = start; i < stores.length; i++) {
    const cur = stores[i];
    stack.push(cur);
    dfs(cnt + 1, i + 1);
    stack.pop();
  }
}

function calcDist() {
  let totalDist = 0;

  houses.forEach((house) => {
    const [sy, sx] = house;
    let minDist = Infinity;

    stack.forEach((store) => {
      const [ey, ex] = store;
      const dist = Math.abs(ey - sy) + Math.abs(ex - sx);

      minDist = Math.min(minDist, dist);
    });

    totalDist += minDist;
  });

  return totalDist;
}

dfs(0, 0);

console.log(answer);