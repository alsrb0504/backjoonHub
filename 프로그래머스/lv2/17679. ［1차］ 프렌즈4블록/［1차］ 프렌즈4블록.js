function solution(m, n, board) {
  const [H, W] = [m, n];
  let answer = 0;

  board = board.map((el) => el.split(""));
  const checkedBoard = Array.from({ length: H }, () =>
    new Array(W).fill(false)
  );

  // console.table(board);

  while (friendsFourBlcok()) {}

  return answer;

  function friendsFourBlcok() {
    let isPossible = false;

    for (let y = 0; y < H - 1; y++) {
      for (let x = 0; x < W - 1; x++) {
        if (board[y][x] !== ".") {
          const std = board[y][x];

          if (
            board[y][x + 1] === std &&
            board[y + 1][x] === std &&
            board[y + 1][x + 1] === std
          ) {
            isPossible = true;
            checkedBoard[y][x] = true;
            checkedBoard[y][x + 1] = true;
            checkedBoard[y + 1][x] = true;
            checkedBoard[y + 1][x + 1] = true;
          }
        }
      }
    }

    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        if (checkedBoard[y][x]) {
          answer++;
          board[y][x] = ".";
          checkedBoard[y][x] = false;
        }
      }
    }

    for (let x = 0; x < W; x++) {
      for (let y = H - 1; y >= 0; y--) {
        if (board[y][x] === ".") {
          for (let k = y - 1; k >= 0; k--) {
            if (board[k][x] !== ".") {
              [board[y][x], board[k][x]] = [board[k][x], board[y][x]];
                break;
            }
          }
        }
      }
    }

    return isPossible;
  }
}