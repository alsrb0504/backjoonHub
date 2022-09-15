const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = new Map();
const set = new Set();
let answer = Infinity;

function insertMap(a, b) {
  if (map.has(a)) map.get(a).push(b);
  else map.set(a, [b]);
}

for (let i = 1; i <= M; i++) {
  const [n1, n2] = input[i].split(" ").map(Number);

  insertMap(n1, n2);
  insertMap(n2, n1);

  set.add(n1);
  set.add(n2);
}

const nums = [...set];

for (let i = 0; i < nums.length; i++) {
  const fir = nums[i];
  const firArr = map.get(fir);

  if (firArr.length < 2) continue;

  for (let j = 0; j < firArr.length; j++) {
    const sec = firArr[j];
    const secArr = map.get(sec);

    if (secArr.length < 2) continue;

    for (let k = 0; k < secArr.length; k++) {
      const thi = secArr[k];
      const thiArr = map.get(thi);

      for (let t = 0; t < thiArr.length; t++) {
        if (fir === thiArr[t]) {
          const sum = firArr.length + secArr.length + thiArr.length;
          answer = Math.min(answer, sum - 6);
        }
      }
    }
  }
}

console.log(answer === Infinity ? -1 : answer);