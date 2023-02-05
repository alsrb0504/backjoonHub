const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const M = Number(input[1]);
const city = input
  .slice(2, 2 + N)
  .map((el) => el.trimEnd().split(" ").map(Number));
const paths = input[2 + N].split(" ").map((el) => Number(el) - 1);
const indexArr = new Array(N).fill(0);

for (let i = 1; i < N; i++) indexArr[i] = i;

for (let i = 0; i < N; i++) {
  for (let j = i + 1; j < N; j++) {
    if (city[i][j] === 1) {
      Union(i, j);
    }
  }
}

for (let i = 1; i < M; i++) {
  if (!FindParent(paths[i - 1], paths[i])) {
    console.log("NO");
    return;
  }
}

console.log("YES");

// console.table(map);
// console.table(indexArr);

function GetParent(num) {
  if (indexArr[num] === num) return num;

  indexArr[num] = GetParent(indexArr[num]);
  return indexArr[num];
}

function Union(a, b) {
  const aParent = GetParent(a);
  const bParent = GetParent(b);

  if (aParent < bParent) indexArr[bParent] = aParent;
  else indexArr[aParent] = bParent;
}

function FindParent(a, b) {
  const aParent = GetParent(a);
  const bParent = GetParent(b);

  if (aParent === bParent) return true;
  else return false;
}