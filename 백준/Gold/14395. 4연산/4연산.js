const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split(" ");

let [cur, dest] = input.map(Number);

if (cur === dest) {
  console.log(0);
  return;
}

const MAX = Math.max(cur, dest);
// 방문처리용
// map과 set 중 map이 해시 검색으로 더 빠를 것 같긴한데..
// Set으로 해도 통과.
const checkSet = new Set();

function bfs() {
  const q = [[cur, ""]];
  checkSet.add(cur);

  while (q.length) {
    let [s, result] = q.shift();

    if (s === dest) return result;

    const mul = s * s;
    if (mul <= MAX && !checkSet.has(mul)) {
      q.push([mul, result + "*"]);
      checkSet.add(mul);
    }

    const plus = s + s;
    if (plus <= MAX ** !checkSet.has(plus)) {
      q.push([plus, result + "+"]);
      checkSet.add(plus);
    }

    // 빼기는 결과가 항상 0이라 의미가 없음.

    // 나누기 : 한 번 실행.
    if (!checkSet.has(1)) {
      q.push([1, result + "/"]);
      checkSet.add(1);
    }
  }

  return -1;
}

console.log(bfs());