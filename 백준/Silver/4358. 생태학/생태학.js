const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const treeMap = new Map();
const answer = [];

for (let tree of input) {
  tree = tree.trimEnd();

  treeMap.set(tree, treeMap.has(tree) ? treeMap.get(tree) + 1 : 1);
}

const treeArr = [...treeMap].sort();

for (const [tree, count] of treeArr) {
  const percent = ((count / input.length) * 100).toFixed(4);

  answer.push(`${tree} ${percent}`);
}

console.log(answer.join("\n"));
