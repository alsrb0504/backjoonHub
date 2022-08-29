const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split(" ")
  .map(Number);

const lastNum = input[0];
let target = input[1];
let pos = 1;

while (true) {
  const cur = 9 * pos * Math.pow(10, pos - 1);

  if (target - cur <= 0) {
    break;
  }

  target -= cur;
  pos++;
}

let num = Math.pow(10, pos - 1);

while (true) {
  if (num > lastNum) {
    console.log(-1);
    return;
  }

  // 종료 조건
  if (target <= pos) {
    console.log(num.toString().charAt(target - 1));
    return;
  }

  num++;
  target -= pos;
}