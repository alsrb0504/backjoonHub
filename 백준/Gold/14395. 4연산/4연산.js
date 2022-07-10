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
      // visited[mul] = true;
      checkSet.add(mul);
    }

    const plus = s + s;
    if (plus <= MAX ** !checkSet.has(plus)) {
      q.push([plus, result + "+"]);
      checkSet.add(plus);
    }

    // ? 항상 0인데 의미가 잇나?
    // const minus = s - s;

    // 나누기
    if (!checkSet.has(1)) {
      q.push([1, result + "/"]);
      checkSet.add(1);
    }
  }

  return -1;
}

console.log(bfs());