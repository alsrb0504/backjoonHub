const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

input.shift();
const inOrder = input[0].split(" ").map(Number);
const postOrder = input[1].split(" ").map(Number);

const result = [];

const map = new Map();
inOrder.forEach((val, idx) => map.set(val, idx));

solution(0, inOrder.length - 1, 0, postOrder.length - 1);

function solution(inStart, inEnd, postStart, postEnd) {
  if (inStart === inEnd) {
    result.push(inOrder[inStart]);
    return;
  } else if (inStart > inEnd || postStart > postEnd) {
    return;
  }

  const root = postOrder[postEnd];
  const rootIdx = map.get(root);
  const leftSize = rootIdx - inStart;

  result.push(inOrder[rootIdx]);

  solution(inStart, rootIdx - 1, postStart, postStart + leftSize - 1);
  solution(rootIdx + 1, inEnd, postStart + leftSize, postEnd - 1);
}

console.log(result.join(" "));