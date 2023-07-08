const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);

let isPossible = false;
let count = 3;
let i = 2;
let tmp = i ** 3;

for (; i <= 1e6; i++) {
  tmp = i ** 3;
  count = 3;

  while (count <= 40) {
    if ((N * (i - 1)) % (tmp - 1) === 0) {
      isPossible = true;
      break;
    }

    if (tmp > 1e12) break;

    tmp *= i;
    count++;
  }

  if (isPossible) break;
}

if (!isPossible) {
  console.log(-1);
} else {
  const answer = [];
  let a = (N * (i - 1)) / (tmp - 1);

  for (let j = 0; j < count; j++) {
    answer.push(a);
    a *= i;
  }

  console.log(count + "\n" + answer.join(" "));
}
