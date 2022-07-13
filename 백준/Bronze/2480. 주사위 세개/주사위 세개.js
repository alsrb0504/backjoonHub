const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trim()
  .split(" ");

const [fir, sec, thi] = input;

const result = new Array(7).fill(0);

result[fir]++;
result[sec]++;
result[thi]++;

const MAX = Math.max(...result);

switch (MAX) {
  case 3: {
    const find = result.findIndex((val) => val === 3);
    console.log(10000 + find * 1000);
    break;
  }
  case 2: {
    const find = result.findIndex((val) => val === 2);
    console.log(1000 + find * 100);
    break;
  }
  case 1: {
    for (let i = 6; i > 0; i--) {
      if (result[i] === 1) {
        console.log(100 * i);
        break;
      }
    }
    break;
  }
  default: {
    return;
  }
}
