const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const tree = new Array(N).fill(-1);

input[1]
  .trimEnd()
  .split(" ")
  .map(Number)
  .forEach((el, idx) => {
    tree[idx] = el;
  });

const remove_idx = Number(input[2]);

tree[remove_idx] = 999;
const removes = [remove_idx];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < removes.length; j++) {
    if (removes[j] === tree[i]) {
      tree[i] = 999;
      removes.push(i);
      i = -1;
      break;
    }
  }
}

let answer = 0;
const cnt = new Array(N).fill(0);

for (let i = 0; i < N; i++) {
  // if (tree[i] && tree[i] !== -1) {
  if (tree[i] >= 0 && tree[i] !== 999) {
    // console.log(`tree[i] = ${tree[i]}`);
    cnt[tree[i]]++;
  }
}

for (let i = 0; i < N; i++) {
  if (tree[i] < 51 && cnt[i] === 0) {
    // console.log(`i = ${i}`);
    answer++;
  }
}

// console.table(tree);
// console.table(cnt);
console.log(answer);