const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

let [h, w] = input.shift().split(" ").map(Number);

let start = [];
const dest = [];
const check = [];

for (let i = 0; i < h; i++) {
  start.push(input[i].trimEnd().split("").map(Number));
}
for (let i = h; i < h * 2; i++) {
  dest.push(input[i].trimEnd().split("").map(Number));
}

// 예외처리
if (h < 3 || w < 3) {
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (start[i][j] !== dest[i][j]) {
        console.log(-1);
        return;
      }
    }
  }

  console.log(0);
  return;
}

for (let i = 0; i < h; i++) {
  check[i] = [];
  for (let j = 0; j < w; j++) {
    if (start[i][j] !== dest[i][j]) {
      check[i][j] = true;
    } else {
      check[i][j] = false;
    }
  }
}

let cnt = 0;

for (let i = 0; i < h - 2; i++) {
  for (let j = 0; j < w - 2; j++) {
    if (check[i][j]) {
      cnt++;
      for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
          check[i + y][j + x] = !check[i + y][j + x];
        }
      }
    }
  }
}

for (let i = 0; i < h; i++) {
  for (let j = 0; j < w; j++) {
    if (check[i][j]) {
      console.log(-1);
      return;
    }
  }
}

console.log(cnt);
