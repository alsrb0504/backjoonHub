const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input.shift());
const coins = [...input.map((v) => [...v.trimEnd().split("")])];

const half = Math.floor(N / 2);
let min = Infinity;

function solve(bit) {
  const copy = coins.map((v) => [...v]);

  for (let i = 0; i < bit.length; i++) {
    if (bit[i] === "1") {
      for (let j = 0; j < N; j++) {
        copy[j][i] = flip(copy[j][i]);
      }
    }
  }
    
  let reverseCnt = 0;

  for (let i = 0; i < N; i++) {
    let Cnt = 0;

    for (let j = 0; j < N; j++) {
      if (copy[i][j] === "T") Cnt++;
    }

    if (Cnt > half) {
      for (let j = 0; j < N; j++) {
        copy[i][j] = flip(copy[i][j]);
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (copy[i][j] === "T") reverseCnt++;
    }
  }

  min = Math.min(min, reverseCnt);
}

function flip(val) {
  return val === "H" ? "T" : "H";
}

for (let i = 0; i < 1 << N; i++) {
  let bitMast = i.toString(2);

  if (bitMast.length < (1 << N) - 1) {
    const diff = (1 << N).toString(2).length - bitMast.length;

    for (let j = 0; j < diff - 1; j++) {
      bitMast = "0" + bitMast;
    }
  }

  solve(bitMast);
}

console.log(min);

function check(Arr) {
  let Cnt = 0;

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (Arr[y][x] === "T") Cnt++;
    }
  }

  return Cnt;
}