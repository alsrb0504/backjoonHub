const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n")
  .map((el) => el.trimEnd());

const LENGTH = Number(input[0]);
const N = Number(input[1]);
const data = input[2].split(" ").map(Number);

const map = new Map();

data.forEach((num, idx) => {
  // 1. 후보를 더 받을 수 있을 경우
  if (map.size < LENGTH) {
    // 1-1. 이미 추천받은 적이 있는 경우
    if (map.has(num)) {
      const { cnt, firstIdx } = map.get(num);
      map.set(num, {
        cnt: cnt + 1,
        firstIdx,
      });
    }
    // 1-2. 새롭게 추천받은 경우
    else {
      map.set(num, {
        cnt: 1,
        firstIdx: idx,
      });
    }
  }
  // 2. 이미 후보가 다 찬 경우
  else {
    // 2-1. 기존 후보
    if (map.has(num)) {
      const { cnt, firstIdx } = map.get(num);
      map.set(num, {
        cnt: cnt + 1,
        firstIdx,
      });
    }
    // 2-2. 새로운 후보 등록
    else {
      const arr = [...map].sort((a, b) => {
        if (a[1].cnt === b[1].cnt) {
          return a[1].firstIdx - b[1].firstIdx;
        }
        return a[1].cnt - b[1].cnt;
      });

      const removeNum = arr[0][0];

      map.delete(removeNum);
      map.set(num, {
        cnt: 1,
        firstIdx: idx,
      });
    }
  }
});

console.log([...map.keys()].sort((a, b) => a - b).join(" "));
