const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);

const primes = [];
const accPrimes = [];
const visited = new Array(N + 1).fill(true);
visited[0] = false;
visited[1] = false;

let acc = 0;
let answer = 0;

// 소수 구하기
for (let i = 2; i <= N; i++) {
  for (let j = i * 2; j <= N; j += i) {
    visited[j] = false;
  }
}

for (let i = 2; i <= N; i++) {
  if (visited[i]) primes.push(i);
}

primes.forEach((value, idx) => {
  acc += value;

  accPrimes[idx] = acc;
});

for (let i = primes.length - 1; i >= 0; i--) {
  const curAcc = accPrimes[i];

  // 누적합이 작아지면 만들 수 없음.
  if (curAcc < N) break;

  // 현재 누적값이 같다면 다음으로
  if (curAcc === N) {
    answer++;
    continue;
  }

  for (let j = i - 1; j >= 0; j--) {
    const result = curAcc - accPrimes[j];

    if (result > N) {
      break;
    }

    if (result === N) {
      answer++;
      continue;
    }
  }
}

console.log(answer);
