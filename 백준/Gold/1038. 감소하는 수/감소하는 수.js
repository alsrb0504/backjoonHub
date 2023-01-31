const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);

if (N < 10) {
  console.log(N);
  return;
}

if (N > 1022) {
  console.log(-1);
  return;
}

let curr = [1, 0];
let idx = 10;

while (idx < N) {
  // console.log(curr.join(""));

  let isUp = false;

  let up_fir = -1;
  let up_sec = -1;

  for (let i = 1; i < curr.length; i++) {
    if (curr[i - 1] - curr[i] !== 1) {
      // curr[i]++;
      up_fir = i - 1;
      up_sec = i;

      isUp = true;
      // break;
    } else {
    }
  }

  if (isUp) {
    curr[up_sec]++;

    let num = 0;
    for (let i = curr.length - 1; i > up_sec; i--) {
      curr[i] = num++;
    }
  } else {
    const curr_size = curr.length;

    // if (curr_size === 10) {
    //   curr = [-1];
    //   break;
    // }

    if (curr[0] === 9) {
      curr = [];

      for (let i = curr_size; i >= 0; i--) {
        curr.push(i);
      }
    } else {
      curr = [curr[0] + 1];

      for (let i = curr_size - 2; i >= 0; i--) {
        curr.push(i);
      }
    }
  }

  idx++;
}

console.log(curr.join(""));
