const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);

const map = new Map();
const visited = new Array(N).fill(false);

input.slice(1, 1 + N).map((el, idx) => {
  const car_num = el.trimEnd();
  map.set(car_num, idx);
});

const cars = [...map.keys()];

let answer = 0;

let curr_idx = 0;
let curr_order = cars[0];

input.slice(1 + N, 1 + N * 2).forEach((el, out_idx) => {
  const car_num = el.trimEnd();
  const input_idx = map.get(car_num);

  // 달라
  if (curr_order !== car_num) {
    answer++;
  }
  // 같아 => 다음에 지나가지 않은 차를 찾아야 함.
  else {
    while (curr_idx < N - 1) {
      curr_idx++;

      if (!visited[curr_idx]) {
        curr_order = cars[curr_idx];
        break;
      }
    }
  }

  visited[input_idx] = true;
});

console.log(answer);
