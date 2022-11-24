const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);

const plugs = [];

let answer = 0;

for (let i = 0; i < K; i++) {
  const cur = nums[i];

  if (plugs.length < N) {
    // console.log(cur);

    if (plugs.findIndex((el) => el === cur) === -1) {
      plugs.push(nums[i]);
    }
    // console.table(plugs);
  }

  const findIdx = plugs.findIndex((el) => el === cur);

  // 찾지 못한 경우
  if (findIdx === -1) {
    let max = -1;
    let max_dist = 0;
    let next_idx;

    // 현재 플러그에서 가장 쓰이지 않는 것을 찾음.
    plugs.forEach((el) => {
      next_idx = i + 1;

      while (next_idx < K) {
        if (nums[next_idx] === el) {
          break;
        }

        next_idx++;
      }

      // console.log(`현재 기기 = ${el}, next_idx = ${next_idx}`);

      // 다음 번호가 가장 큰 것을 찾음.
      if (next_idx === K) {
        max_dist = 101;
        max = el;
      } else {
        if (next_idx > max_dist) {
          max = el;
          max_dist = next_idx;
        }
      }
    });

    // -1인 경우 제외
    if (max === -1) {
      plugs[0] = cur;
    } else {
      const max_idx = plugs.findIndex((el) => el === max);

      // console.log();
      // console.table(plugs);
      // console.log(`max = ${max}, max_idx = ${max_idx}`);
      // console.log();

      plugs[max_idx] = cur;
    }

    // console.log(`i = ${i}, cur = ${cur}`);
    // console.log(`교체 :  max = ${max}`);
    // console.log(`max_idx = ${max_idx}, max = ${max}`);

    // console.table(plugs);

    // console.log();

    answer++;
  }
}

console.log(answer);
