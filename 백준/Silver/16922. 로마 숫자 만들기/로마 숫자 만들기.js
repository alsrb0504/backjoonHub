const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);

const nums = [1, 5, 10, 50];
const set = new Set();

// const visited = Array.from({ length: 4 }, () => new Array(20).fill(false));

// 조합
function solution(value, cnt, start) {
  if (cnt === N) {
    set.add(value);
    return;
  }

  for (let i = start; i < 4; i++) {
  

    // visited[i][cnt] = true;
    solution(value + nums[i], cnt + 1, i);
    // visited[i][cnt] = false;
  }
}

solution(0, 0, 0);
console.log(set.size);
