const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const parent = new Array(N).fill(0);
const edgeColor = new Array(N).fill(0);
// const visited = new Array(N).fill(false);
const check = new Array(N).fill(false);

const answer = [];

let temp = 0;

// 3 * 10 ^ 5
// 10^ 3
// 3 * 10^8

for (let i = 1; i <= K; i++) {
  const [command, a, b, color] = input[i].split(" ").map(Number);

  if (command === 1) {
    paintTree(a, b, color);
  } else if (command === 2) {
    parent[a] = b;
  } else {
    answer.push(countColor(a, b));
  }
}

console.log(answer.join("\n"));

function findLCA(a, b) {
  if (a === b) return a;
  let cnt = 0;
  temp++;
  while (cnt <= 1000) {
    if (a != 0) {
      if (check[a] === temp) return a;
      check[a] = temp;
      a = parent[a];
    }
    if (b != 0) {
      if (check[b] === temp) return b;
      check[b] = temp;
      b = parent[b];
    }
    if (a === b && a === 0) return 0;
    cnt++;
  }

  return 0;
}

function paintTree(a, b, color) {
  const lca = findLCA(a, b);

  while (a !== lca) {
    edgeColor[a] = color;
    a = parent[a];
  }
  while (b !== lca) {
    edgeColor[b] = color;
    b = parent[b];
  }
}

function countColor(a, b) {
  const lca = findLCA(a, b);
  const colorSet = new Set();

  while (a !== lca) {
    colorSet.add(edgeColor[a]);
    a = parent[a];
  }
  while (b !== lca) {
    colorSet.add(edgeColor[b]);
    b = parent[b];
  }

  return colorSet.size;
}
