const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [W, H] = input[0].split(" ").map(Number);

const answer = [];

// 짝수일 경우 => 성공
if ((W * H) % 2 === 0) {
  for (let i = 1; i <= W; i++) {
    answer.push([i, 1]);
  }

  for (let i = 2; i <= H; i++) {
    answer.push([W, i]);
  }

  let isReverse = true;

  if (W % 2 === 1) {
    for (let i = 0; i < H - 1; i++) {
      for (let j = 0; j < W - 1; j++) {
        if (isReverse) {
          answer.push([W - 1 - j, H - i]);
        } else {
          answer.push([j + 1, H - i]);
        }
      }

      isReverse = !isReverse;
    }
  } else {
    for (let i = W - 1; i > 0; i--) {
      for (let j = 0; j < H - 1; j++) {
        if (isReverse) {
          answer.push([i, H - j]);
        } else {
          answer.push([i, 2 + j]);
        }
      }

      isReverse = !isReverse;
    }
  }
} else {
  for (let i = 1; i <= W; i++) {
    answer.push([i, 1]);
  }

  for (let i = 2; i <= H; i++) {
    answer.push([W, i]);
  }

  let isReverse = true;

  for (let i = W - 1; i > 2; i--) {
    for (let j = 0; j < H - 1; j++) {
      if (isReverse) {
        answer.push([i, H - j]);
      } else {
        answer.push([i, 2 + j]);
      }
    }

    isReverse = !isReverse;
  }

  answer.push([2, H]);

  isReverse = true;

  for (let i = H - 1; i > 1; i--) {
    for (let j = 0; j < 2; j++) {
      if (isReverse) answer.push([2 - j, i]);
      else answer.push([j + 1, i]);
    }

    isReverse = !isReverse;
  }
}

const result = W * H;

const str = [];

answer.forEach((el) => {
  str.push(el.join(" "));
});

if (result % 2 === 0) {
  console.log(result + "\n" + str.join("\n"));
} else {
  console.log(result - 1 + "\n" + str.join("\n"));
}
