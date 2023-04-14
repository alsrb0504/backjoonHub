const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);

const pos = Array.from({ length: 2 ** N }, () =>
  new Array((2 ** N - 1) * 2).fill(" ")
);

if (N % 2 !== 0) {
  //
  if (N === 1) {
    console.log("*");
    return;
  } else {
    solution(2 ** N - 1, 1, N);
  }
} else {
  solution(1, 1, N);
}

const answer = [];

pos.forEach((el) => {
  answer.push(el.slice(1).join("").trimEnd());
});

answer.shift();

console.log(answer.join("\n"));

function solution(sy, sx, depth) {
  if (depth === 1) {
    pos[sy][sx] = "*";
    return;
  }

  const height = 2 ** depth - 1;
  const width = height * 2 - 1;

  // 홀수
  if (depth % 2 !== 0) {
    for (let y = 0; y < height; y++) {
      pos[sy - y][sx + y] = "*";
      pos[sy - y][sx + width - y - 1] = "*";
    }

    for (let x = sx; x < sx + width; x++) {
      pos[sy][x] = "*";
    }

    solution(sy - Math.floor(height / 2), sx + 2 ** (depth - 1), depth - 1);
  } else {
    for (let y = 0; y < height; y++) {
      pos[sy + y][sx + y] = "*";
      pos[sy + y][sx + width - y - 1] = "*";
    }

    for (let x = sx; x < sx + width; x++) {
      pos[sy][x] = "*";
    }

    solution(
      sy + Math.ceil(height / 2) - 1,
      sx + Math.ceil(height / 2),
      depth - 1
    );
  }
}
