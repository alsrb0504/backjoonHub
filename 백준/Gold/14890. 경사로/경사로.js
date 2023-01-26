const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [n, l] = input[0].split(" ").map(Number);
const board = input
  .slice(1, 1 + n)
  .map((el) => el.trimEnd().split(" ").map(Number));
let answer = 0;

function Check(arr) {
  // 경사로 사용 여부 체크
  const isCheck = new Array(n).fill(false);

  for (let i = 1; i < n; i++) {
    const prev = arr[i - 1];
    const curr = arr[i];
    const diff = curr - prev;

    if (diff === 0) continue;
    if (diff === 1) {
      let cnt = 0;

      for (let k = i - 1; k >= 0; k--) {
        if (cnt === l) break;
        if (isCheck[k]) return false;

        if (curr - arr[k] === 1) cnt++;
        else break;
      }
      if (cnt !== l) return false;

      for (let k = 0; k < cnt; k++) {
        isCheck[i - 1 - k] = true;
      }
    } else if (diff === -1) {
      let cnt = 1;

      for (let k = i + 1; k < n; k++) {
        if (cnt === l) break;
        if (isCheck[k]) return false;

        if (curr === arr[k]) cnt++;
        else break;
      }
      if (cnt !== l) return false;

      for (let k = 0; k < cnt; k++) {
        isCheck[i + k] = true;
      }
    } else return false;
  }

  return true;
}

for (let i = 0; i < n; i++) {
  if (Check(board[i])) answer++;
}

for (let x = 0; x < n; x++) {
  const board_col = [];

  for (let y = 0; y < n; y++) board_col.push(board[y][x]);

  if (Check(board_col)) answer++;
}

console.log(answer);