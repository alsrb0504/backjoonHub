const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const board = input.slice(1, 1 + N).map((el) => el.split(" ").map(Number));

let max = 0;
// console.table(board);

let cur_board = board.map((el) => [...el]);
// console.table(cur_board);

// const stack = [[board]];
const stack = [];

const path = [];

// moveSquare(1);
// console.table(cur_board);

// moveSquare(2);
// console.table(cur_board);

// moveSquare(0);
// console.table(cur_board);

// moveSquare(0);
// console.table(cur_board);

dfs(0);
console.log(max);

function dfs(cnt) {
  if (cnt === 5) {
    // 종료
    checkMax();
    return;
  }

  // [상, 하, 좌, 우]
  for (let i = 0; i < 4; i++) {
    saveSqaure();

    // 지울 것
    path.push(i);

    moveSquare(i);

    dfs(cnt + 1);

    // 지울 것
    path.pop();

    backSquare();
  }
}

function checkMax() {
  let tmp = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      // max = max < cur_board[i][j] ? cur_board[i][j] : max;
      tmp = tmp < cur_board[i][j] ? cur_board[i][j] : tmp;
    }
  }

  // console.table(cur_board);
  // console.log(`tmp = ${tmp}`);

  // console.log(path);

  max = max < tmp ? tmp : max;
}

function backSquare() {
  const copy = stack.pop();

  cur_board = copy.map((el) => [...el]);
}

function saveSqaure() {
  const copy = cur_board.map((el) => [...el]);

  stack.push(copy);
}

function moveSquare(idx) {
  // console.log(`move = ${idx}`);

  // [상, 하, 좌, 우]
  switch (idx) {
    // 위쪽 정렬.
    case 0: {
      for (let i = 0; i < N; i++) {
        const mv_stack = [];
        const result_stack = [];
        // 원소 삽입
        for (let j = 0; j < N; j++) {
          if (cur_board[j][i] !== 0) {
            // mv_stack.push(cur_board[j][i]);
            mv_stack.unshift(cur_board[j][i]);
          }
        }

        // console.log();
        // console.log(`mv_stack = ${mv_stack}`);

        while (mv_stack.length > 0) {
          if (
            mv_stack.length > 1 &&
            mv_stack[mv_stack.length - 1] === mv_stack[mv_stack.length - 2]
          ) {
            const n1 = mv_stack.pop();
            mv_stack.pop();
            result_stack.push(n1 * 2);
          } else {
            result_stack.push(mv_stack.pop());
          }
        }

        // console.log(`result_stack = ${result_stack}`);

        for (let j = 0; j < N; j++) {
          if (result_stack.length !== 0) {
            // cur_board[j][i] = result_stack.pop();
            cur_board[j][i] = result_stack.shift();
          } else {
            cur_board[j][i] = 0;
          }
        }
      }

      break;
    }
    // 아래쪽 정렬
    case 1: {
      for (let i = 0; i < N; i++) {
        const mv_stack = [];
        const result_stack = [];
        // 원소 삽입
        for (let j = N - 1; j >= 0; j--) {
          if (cur_board[j][i] !== 0) {
            mv_stack.push(cur_board[j][i]);
          }
        }

        while (mv_stack.length > 0) {
          if (
            mv_stack.length > 1 &&
            // mv_stack[mv_stack.length - 1] === mv_stack[mv_stack.length - 2]
            mv_stack[0] === mv_stack[1]
          ) {
            // const n1 = mv_stack.pop();
            const n1 = mv_stack.shift();

            // mv_stack.pop();
            mv_stack.shift();

            result_stack.push(n1 * 2);
          } else {
            result_stack.push(mv_stack.shift());
          }
        }

        // console.log(result_stack);

        for (let j = N - 1; j >= 0; j--) {
          if (result_stack.length !== 0) {
            // cur_board[j][i] = result_stack.pop();
            cur_board[j][i] = result_stack.shift();
          } else {
            cur_board[j][i] = 0;
          }
        }
      }

      break;
    }

    // 왼쪽 정렬.
    case 2: {
      for (let i = 0; i < N; i++) {
        const mv_stack = [];
        const result_stack = [];
        // 원소 삽입
        for (let j = N - 1; j >= 0; j--) {
          if (cur_board[i][j] !== 0) {
            // mv_stack.push(cur_board[i][j]);
            mv_stack.unshift(cur_board[i][j]);
          }
        }

        // console.log();
        // console.log(`mv_stack = ${mv_stack}`);

        while (mv_stack.length > 0) {
          if (
            mv_stack.length > 1 &&
            // mv_stack[mv_stack.length - 1] === mv_stack[mv_stack.length - 2]
            mv_stack[0] === mv_stack[1]
          ) {
            // const n1 = mv_stack.pop();
            const n1 = mv_stack.shift();
            // mv_stack.pop();
            mv_stack.shift();

            result_stack.push(n1 * 2);
          } else {
            // result_stack.push(mv_stack.pop());
            result_stack.push(mv_stack.shift());
          }
        }

        // console.log(`result_stack = ${result_stack}`);

        for (let j = 0; j < N; j++) {
          if (result_stack.length !== 0) {
            // cur_board[i][j] = result_stack.pop();
            cur_board[i][j] = result_stack.shift();
          } else {
            cur_board[i][j] = 0;
          }
        }
      }

      break;
    }
    // 오른쪽 정렬
    case 3: {
      for (let i = 0; i < N; i++) {
        const mv_stack = [];
        const result_stack = [];
        // 원소 삽입
        for (let j = 0; j < N; j++) {
          if (cur_board[i][j] !== 0) {
            mv_stack.push(cur_board[i][j]);
          }
        }

        while (mv_stack.length > 0) {
          if (
            mv_stack.length > 1 &&
            mv_stack[mv_stack.length - 1] === mv_stack[mv_stack.length - 2]
          ) {
            const n1 = mv_stack.pop();
            mv_stack.pop();
            // result_stack.push(n1 * 2);
            result_stack.unshift(n1 * 2);
          } else {
            // result_stack.push(mv_stack.pop());
            result_stack.unshift(mv_stack.pop());
          }
        }

        // console.log(result_stack);

        for (let j = N - 1; j >= 0; j--) {
          if (result_stack.length !== 0) {
            cur_board[i][j] = result_stack.pop();
          } else {
            cur_board[i][j] = 0;
          }
        }
      }

      break;
    }
  }
}
