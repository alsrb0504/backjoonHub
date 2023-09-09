const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const board = input.map((line) => line.split(" ").map(Number));

board.unshift([]);
for (let i = 0; i < 20; i++) {
  board[i].unshift(0);
}
board.forEach((line) => line.push(0));
board.push(new Array(21).fill(0));

let answerWin = 0;
let answer = [];

// console.table(board);

// 1. 가로
for (let i = 1; i < 20; i++) {
  let acc = [];
  for (let j = 1; j <= 20; j++) {
    const curr = board[i][j];

    if (acc.length === 0 && curr !== 0) {
      acc.push(curr);
    } else {
      if (acc.at(-1) !== curr) {
        // 종료!
        if (acc.length === 5) {
          answerWin = acc.at(-1);
          answer = `${i} ${j - 5}`;
          break;
        }

        acc = [curr];
        continue;
      }

      acc.push(curr);
    }

    if (curr === 0) {
      acc = [];
      continue;
    }
  }
}

// 2. 세로
for (let j = 1; j < 20; j++) {
  let acc = [];
  for (let i = 1; i <= 20; i++) {
    const curr = board[i][j];

    if (acc.length === 0 && curr !== 0) {
      acc.push(curr);
    } else {
      if (acc.at(-1) !== curr) {
        // 종료!
        if (acc.length === 5) {
          answerWin = acc.at(-1);
          answer = `${i - 5} ${j}`;
          break;
        }

        // acc = [];
        acc = [curr];
        continue;
      }

      acc.push(curr);
    }

    if (curr === 0) {
      acc = [];
      continue;
    }
  }
}

// 3. 오른쪽 아래 대각선
for (let i = 15; i > 0; i--) {
  let acc = [];

  for (let j = i, x = 1; j <= 20; j++, x++) {
    const curr = board[j][x];

    if (acc.length === 0 && curr !== 0) {
      acc.push(curr);
    } else {
      if (acc.at(-1) !== curr) {
        // 종료!
        if (acc.length === 5) {
          answerWin = acc.at(-1);
          answer = `${j - 5} ${x - 5}`;
          break;
        }

        acc = [curr];
        continue;
      }

      acc.push(curr);
    }

    if (curr === 0) {
      acc = [];
      continue;
    }
  }
}

for (let j = 1; j < 20; j++) {
  let acc = [];

  for (let i = j, y = 1; i <= 20; i++, y++) {
    const curr = board[y][i];

    if (acc.length === 0 && curr !== 0) {
      acc.push(curr);
    } else {
      if (acc.at(-1) !== curr) {
        // 종료!
        if (acc.length === 5) {
          answerWin = acc.at(-1);
          answer = `${y - 5} ${i - 5}`;
          break;
        }

        acc = [curr];
        continue;
      }

      acc.push(curr);
    }

    if (curr === 0) {
      acc = [];
      continue;
    }
  }
}

// 4. 왼쪽 아래 대각선
for (let j = 1; j < 20; j++) {
  let acc = [];

  for (let i = j, y = 1; i >= 0; i--, y++) {
    const curr = board[y][i];

    if (acc.length === 0 && curr !== 0) {
      acc.push(curr);
    } else {
      if (acc.at(-1) !== curr) {
        // 종료!
        if (acc.length === 5) {
          answerWin = acc.at(-1);
          answer = `${y - 1} ${i + 1}`;
          break;
        }

        acc = [curr];
        continue;
      }

      acc.push(curr);
    }

    if (curr === 0) {
      acc = [];
      continue;
    }
  }
}

for (let i = 1; i < 20; i++) {
  let acc = [];

  for (let j = i, x = 19; j <= 20; j++, x--) {
    const curr = board[j][x];

    if (acc.length === 0 && curr !== 0) {
      acc.push(curr);
    } else {
      if (acc.at(-1) !== curr) {
        // 종료!
        if (acc.length === 5) {
          answerWin = acc.at(-1);
          answer = `${j - 1} ${x + 1}`;
          break;
        }

        acc = [curr];
        continue;
      }

      acc.push(curr);
    }

    if (curr === 0) {
      acc = [];
      continue;
    }
  }
}

if (answerWin === 0) {
  console.log(0);
} else {
  console.log(answerWin + "\n" + answer);
}

// console.table(board);
