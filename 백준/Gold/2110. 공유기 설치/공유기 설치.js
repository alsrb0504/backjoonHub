const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, C] = input[0].split(" ").map(Number);

const dist = [];

for (let i = 1; i <= N; i++) {
  dist.push(Number(input[i]));
}

dist.sort((a, b) => a - b);
const max = Math.max.apply(null, dist);

let answer = 0;
let start = 1;
let end = max;

while (start <= end) {
  const mid = Math.floor((start + end) / 2);

  let prev = dist[0];
  let cnt = 1;

  for (let i = 1; i <= dist.length; i++) {
    if (dist[i] - prev >= mid) {
      cnt++;
      prev = dist[i];
    }
  }

  if (cnt >= C) {
    answer = Math.max(answer, mid);
    start = mid + 1;
  } else {
    end = mid - 1;
  }
}

console.log(answer);
