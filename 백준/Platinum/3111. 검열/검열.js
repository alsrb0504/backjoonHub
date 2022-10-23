const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const A = input[0].trimEnd();
let T = input[1].trimEnd();

let answer = "";

const fStack = [];
const eStack = [];

let f_start_idx = 0;
let e_start_idx = T.length - 1;

let f_flag = true;

while (f_start_idx <= e_start_idx) {
  // 앞에서 찾았었다면 뒤에서부터 찾기
  if (!f_flag) {
    fStack.push(T[f_start_idx++]);

    if (fStack.length >= A.length) {
      if (fStack.slice(fStack.length - A.length).join("") === A) {
        f_flag = true;

        for (let i = 0; i < A.length; i++) {
          fStack.pop();
        }

        continue;
      }
    }
  } else {
    eStack.push(T[e_start_idx--]);

    if (eStack.length >= A.length) {
      if (
        eStack
          .slice(eStack.length - A.length)
          .reverse()
          .join("") === A
      ) {
        f_flag = false;
        for (let i = 0; i < A.length; i++) {
          eStack.pop();
        }

        continue;
      }
    }
  }
}

// 프론트의 뒤에 하나씩 넣는 방식으로
while (eStack.length) {
  fStack.push(eStack.pop());
  // console.log(fStack.join(""));

  if (fStack.length < A.length) continue;

  if (fStack.slice(fStack.length - A.length).join("") === A) {
    for (let i = 0; i < A.length; i++) {
      fStack.pop();
    }
  }
}

console.log(fStack.join(""));