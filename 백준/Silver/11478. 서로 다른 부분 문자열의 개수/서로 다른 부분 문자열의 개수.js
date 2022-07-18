const readFileSyncAddress = '/dev/stdin';

let input = require("fs").readFileSync(readFileSyncAddress).toString().trim();
// .split("\n");

const length = input.length;

const subSet = new Set();

for (let i = 0; i < length; i++) {
  let text = "";

  for (let j = i; j < length; j++) {
    text += input.substring(j, j + 1);
    subSet.add(text);
  }
}

console.log(subSet.size);