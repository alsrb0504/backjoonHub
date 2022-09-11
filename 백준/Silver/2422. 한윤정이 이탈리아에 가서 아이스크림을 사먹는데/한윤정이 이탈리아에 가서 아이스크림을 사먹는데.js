const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = new Map();
const selected = [];
let answer = 0;

for (let i = 1; i <= M; i++) {
  const [n1, n2] = input[i].split(" ").map(Number);

  if (map.get(n1)) map.set(n1, [...map.get(n1), n2]);
  else map.set(n1, [n2]);

  if (map.get(n2)) map.set(n2, [...map.get(n2), n1]);
  else map.set(n2, [n1]);
}

function solution(cnt, start) {
  if (cnt === 3) {
    if (check()) answer++;
    return;
  }

  for (let i = start + 1; i <= N; i++) {
    const next = i;

    selected.push(next);
    solution(cnt + 1, next);
    selected.pop();
  }
}

function check() {
  const [n1, n2, n3] = selected;

  // map.get(n1) === undefined => false 처리.
  if (map.get(n1) && map.get(n1).findIndex((v) => v === n2) !== -1)
    return false;
  if (map.get(n1) && map.get(n1).findIndex((v) => v === n3) !== -1)
    return false;
  if (map.get(n2) && map.get(n2).findIndex((v) => v === n3) !== -1)
    return false;
  return true;
}

solution(0, 0);
console.log(answer);