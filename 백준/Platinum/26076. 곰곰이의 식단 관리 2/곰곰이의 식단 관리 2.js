const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const dy = [0, 0, -1, 1, -1, 1, 1, -1];
const dx = [-1, 1, 0, 0, 1, 1, -1, -1];

const ddy = [-2, -2, -2, -1, 0, 1, 2, 2, 2, 2, 2, 1, 0, -1, -2, -2];
const ddx = [0, 1, 2, 2, 2, 2, 2, 1, 0, -1, -2, -2, -2, -2, -2, -1];

const [H, W] = input[0].split(" ").map(Number);

const map = [
  new Array(W + 2).fill(1),
  ...input
    .slice(1, 1 + H)
    .map((el) => ("1 " + el + " 1").trimEnd().split(" ").map(Number)),
  new Array(W + 2).fill(1),
];

let visited = Array.from({ length: H + 2 }, () => new Array(W + 2).fill(false));

// 처음부터 갈 수 없다면 => 0.
if (!bfs(1, 1)) {
  console.log(0);
  return;
}

if (H === 1 || W === 1) {
  console.log(1);
  return;
}

const block_visited = Array.from({ length: H + 2 }, () =>
  new Array(W + 2).fill(0)
);

let group_cnt = 1;
// const possible_group = [];

const possible_set = new Set();
const possible_map = new Map();

// 벽 탐색
for (let i = 1; i <= H; i++) {
  for (let j = 1; j <= W; j++) {
    if (map[i][j] === 1 && block_visited[i][j] === 0) {
      // if (map[i][j] === 1 && block_visited[i][j] === 0) {

      const [is_check, up, rt, dn, lt] = blockBfs(i, j, group_cnt);

      if (is_check) {
        possible_set.add(group_cnt);
        possible_map.set(group_cnt, [up, rt, dn, lt]);
      }

      group_cnt++;
    }
  }
}

for (let i = 1; i <= H; i++) {
  for (let j = 1; j <= W; j++) {
    if (possible_set.has(block_visited[i][j]))
      if (makeWall(i, j, block_visited[i][j])) {
        console.log(1);
        return;
      }
  }
}

// 불가능
console.log(2);

function makeWall(y, x, idx) {
  for (let i = 0; i < 16; i++) {
    const [ny, nx] = [y + ddy[i], x + ddx[i]];

    if (ny < 0 || nx < 0 || ny > H + 1 || nx > W + 1) continue;
    if (block_visited[ny][nx] === idx || map[ny][nx] === 0) continue;

    // console.log(ny, nx);

    const curr = possible_map.get(idx);

    if (ny === 0 || ny === H + 1 || nx === 0 || nx === W + 1) {
      if (ny === 0 && (curr[3] > 0 || curr[2] > 0)) return true;
      if (nx === W + 1 && (curr[2] > 0 || curr[3] > 0)) return true;
      if (ny === H + 1 && (curr[0] > 0 || curr[1] > 0)) return true;
      if (nx === 0 && (curr[0] > 0 || curr[1] > 0)) return true;

      continue;
    }

    if (!possible_set.has(block_visited[ny][nx])) continue;

    // console.log(idx, block_visited[ny][nx]);
    // console.log(possible_map.get(idx));
    // console.log(possible_map.get(block_visited[ny][nx]));

    const side = possible_map.get(block_visited[ny][nx]);

    const sum = new Array(4).fill(0);
    for (let j = 0; j < 4; j++) {
      sum[j] = curr[j] + side[j];
    }

    // console.log(`y = ${y}, x = ${x}`);
    // console.log(`ny = ${ny}, nx = ${nx}`);

    // 직선
    if (x === nx && sum[1] > 0 && sum[3] > 0) {
      return true;
    }

    if (y === ny && sum[0] > 0 && sum[2] > 0) {
      return true;
    }

    // console.table(map);
    // console.log(sum);

    if ((sum[0] === 0 && sum[1] === 0) || (sum[2] === 0 && sum[3] === 0))
      return false;
    else return true;

    // 대각선
    if ((sum[0] > 0 && sum[3] > 0) || (sum[1] > 0 && sum[2] > 0)) return true;
    // else return false;  => 90퍼 실패..!
    // 아 이부분.. 어떻게 하지
    // else if ((sum[0] > 0 && sum[2] > 0) || (sum[1] > 0 && sum[1] > 0))
    //   return true;
    else {
      console.log(sum);

      return false;
    }
  }

  return false;
}

// 벽에 붙어있는 친구들만 카운트로 구분해
function blockBfs(y, x, cnt) {
  const q = [[y, x]];
  block_visited[y][x] = cnt;
  // let is_possible = false;

  // 상, 우, 하, 좌
  let is_possible = [0, 0, 0, 0];
  let is_check = false;

  while (q.length) {
    const [cy, cx] = q.shift();

    for (let i = 0; i < 8; i++) {
      const [ny, nx] = [cy + dy[i], cx + dx[i]];

      if (block_visited[ny][nx] !== 0 || map[ny][nx] === 0) continue;

      if (ny === 0 || ny === H + 1 || nx === 0 || nx === W + 1) {
        if (ny === 0) is_possible[0] = 1;
        if (nx === W + 1) is_possible[1] = 1;
        if (ny === H + 1) is_possible[2] = 1;
        if (nx === 0) is_possible[3] = 1;

        is_check = true;

        continue;
      }

      block_visited[ny][nx] = cnt;
      q.push([ny, nx]);
    }
  }

  return [is_check, ...is_possible];
}

function bfs(y, x) {
  visited = Array.from({ length: H + 2 }, () => new Array(W + 2).fill(false));

  const q = [[y, x]];
  visited[y][x] = true;

  while (q.length) {
    const [cy, cx] = q.shift();

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [cy + dy[i], cx + dx[i]];

      if (map[ny][nx] === 1 || visited[ny][nx]) continue;

      // if (ny === H && nx === W) return false;
      if (ny === H && nx === W) return true;

      visited[ny][nx] = true;
      q.push([ny, nx]);
    }
  }

  return false;
}