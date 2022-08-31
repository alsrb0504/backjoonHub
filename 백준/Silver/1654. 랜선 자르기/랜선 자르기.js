const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [K, N] = input[0].split(" ").map(Number);

const cables = [];

for (let i = 1; i <= K; i++) {
  cables.push(Number(input[i]));
}

const max = Math.max.apply(null, cables);

let high = max;
let low = 1;

while (true) {
  const mid = Math.floor((high + low) / 2);
  let cnt = 0;

  cables.forEach((v) => {
    const pieces = Math.floor(v / mid);
    cnt += pieces;
  });


  if (cnt < N) {
    //
    high = mid - 1;
    //
  } else {
    if (check(mid)) {
      console.log(mid);
      break;
    }

    low = mid + 1;
  }
}

function check(num) {
  const nextNum = num + 1;
  let cnt = 0;

  cables.forEach((v) => {
    const pieces = Math.floor(v / nextNum);
    cnt += pieces;
  });

  if (cnt < N) return true;
  else return false;
}