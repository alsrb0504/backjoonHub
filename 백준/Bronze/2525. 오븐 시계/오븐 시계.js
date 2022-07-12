const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

let [hh, mm] = input[0].trimEnd().split(" ").map(Number);
let rest = Number(input[1]);

// 최대 남은 시간은 1000분 => 대략 18시간
// 최대 시간은 23 + 18 = 41시간.
while (rest !== 0) {
  if (rest <= 60) {
    mm += rest;
    rest = 0;
  } else {
    const rest_hour = Math.floor(rest / 60);
    hh += rest_hour;
    rest -= rest_hour * 60;
  }
}

if (mm >= 60) {
  mm -= 60;
  hh++;
}

if (hh > 23) {
  hh = hh - 24;
}

let answer = `${hh} ${mm}`;
console.log(answer);