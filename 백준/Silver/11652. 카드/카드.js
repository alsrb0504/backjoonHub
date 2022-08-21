const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);

const map = new Map();

for (let i = 1; i <= N; i++) {
  const num = input[i].trimEnd();

  if (map.has(num)) {
    map.set(num, map.get(num) + 1);
  } else {
    map.set(num, 1);
  }
}

let max = 0;
let maxKey = "";

map.forEach((v, k) => {
  if (max < v) {
    max = v;
    maxKey = k;
  } else if (max === v) {
    maxKey = BigInt(maxKey) > BigInt(k) ? k : maxKey;
  }
});

console.log(maxKey);
