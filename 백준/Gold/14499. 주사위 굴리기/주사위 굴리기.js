const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, M, Y, X, _] = input[0].split(" ").map(Number);
const board = input.slice(1, 1 + N).map((el) => el.split(" ").map(Number));
const dy = [0, 0, 0, -1, 1];
const dx = [0, 1, -1, 0, 0];
const answer = [];

const dice = new Array(7).fill(0);

// 바텀, 상, 하, 좌, 우, 탑
const pos = [1, 2, 5, 4, 3, 6];

let [cy, cx] = [Y, X];

function MoveDice(cond) {
  const tmp = [...pos];
  switch (cond) {
    case 1: {
      pos[0] = tmp[4];
      pos[3] = tmp[0];
      pos[4] = tmp[5];
      pos[5] = tmp[3];
      break;
    }
    case 2: {
      pos[0] = tmp[3];
      pos[3] = tmp[5];
      pos[4] = tmp[0];
      pos[5] = tmp[4];
      break;
    }
    case 3: {
      pos[0] = tmp[1];
      pos[1] = tmp[5];
      pos[2] = tmp[0];
      pos[5] = tmp[2];
      break;
    }
    case 4: {
      pos[0] = tmp[2];
      pos[1] = tmp[0];
      pos[2] = tmp[5];
      pos[5] = tmp[1];
      break;
    }
    default: {
      break;
    }
  }
}

input[N + 1].split(" ").forEach((idx) => {
  const cond = Number(idx);

  const [ny, nx] = [cy + dy[cond], cx + dx[cond]];

  if (ny < 0 || nx < 0 || ny >= N || nx >= M) return;

  MoveDice(cond);

  if (board[ny][nx] === 0) board[ny][nx] = dice[pos[0]];
  else {
    dice[pos[0]] = board[ny][nx];
    board[ny][nx] = 0;
  }

  answer.push(dice[pos[5]]);

  [cy, cx] = [ny, nx];
});

console.log(answer.join("\n"));
