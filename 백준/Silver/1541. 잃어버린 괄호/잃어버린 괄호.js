const readFileSyncAddress = '/dev/stdin';
let input = require("fs").readFileSync(readFileSyncAddress).toString().trim();

// 간단히 생각해보면
// -를 만나면 - 뒤의 숫자부터
// 계속 + 로 숫자를 크게 해야 함
// 그러다가 - 만나면 종료
// 55 - (50 + 40) - 40

const nums = [];
const opers = [];

// 숫자 추출
let tmp = input.split("+");
tmp.forEach((s) => {
  s.split("-").forEach((v) => nums.push(v));
});

// 연산자 추출
input.split("").forEach((ch) => {
  if (ch === "+" || ch === "-") opers.push(ch);
});


let answer = Number(nums[0]);
let stack = [];

let bracket = false;

for (let i = 0; i < opers.length; i++) {
  const oper = opers[i];
  const num = Number(nums[i + 1]);

  if (oper === "+") {
    // 현재 ( ) 안에 있는 경우 stack에 push
    if (bracket) {
      stack.push(num);
    }
    // 그렇지 않으면 걍 더함.
    else {
      answer += num;
    }
  } else {
    // 현재 ( ) 안에 있다면 stack 값들 합해서 빼고 다시 ( ) 활성화
    if (bracket) {
      answer -= stack.reduce((acc, cur) => acc + cur, 0);
      stack = [num];
    }
    // 그렇지 않다면 ( ) 활성화
    else {
      stack.push(num);
      bracket = true;
    }
  }

  // 마지막
  if (i === opers.length - 1 && stack.length !== 0) {
    answer -= stack.reduce((acc, cur) => acc + cur, 0);
  }

}

console.log(answer);