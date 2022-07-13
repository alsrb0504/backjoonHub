class maxHeap {
  constructor() {
    this.q = [null];
  }

  size() {
    return this.q.length;
  }

  heapPush(item) {
    this.q.push(item);

    let curidx = this.size() - 1;
    let paridx = Math.floor(curidx / 2);

    // 부모가 자신보다 커야함.
    // 2차원 배열이라 부모 요소가 있는지 확인해야 함.
    while (
      this.q[paridx] &&
      this.q[curidx][1] > this.q[paridx][1] &&
      curidx !== 1
    ) {
      [this.q[curidx], this.q[paridx]] = [this.q[paridx], this.q[curidx]];
      curidx = paridx;
      paridx = Math.floor(curidx / 2);
    }
  }

  heapPop() {
    // 빈 경우
    // 예외 처리.
    if (this.size() === 1) return [0, 0];

    const min = this.q[1];

    if (this.size() <= 2) this.q = [null];
    else this.q[1] = this.q.pop();

    let curidx = 1;
    let leftidx = curidx * 2;
    let rightidx = curidx * 2 + 1;

    // 자식이 없는 경우
    if (this.q[leftidx] === null) return min;

    // 자식이 하나
    if (this.q[rightidx] === null) {
      if (this.q[curidx] < this.q[leftidx]) {
        [this.q[curidx], this.q[leftidx]] = [this.q[leftidx], this.q[curidx]];
      }
      return min;
    }

    // 자식이 둘 다 존재.
    while (
      (this.q[leftidx] && this.q[curidx][1] < this.q[leftidx][1]) ||
      (this.q[rightidx] && this.q[curidx][1] < this.q[rightidx][1])
    ) {
      let maxidx = 0;

      if (this.q[rightidx]) {
        maxidx = this.q[leftidx][1] < this.q[rightidx][1] ? rightidx : leftidx;
      } else {
        maxidx = leftidx;
      }

      [this.q[curidx], this.q[maxidx]] = [this.q[maxidx], this.q[curidx]];

      curidx = maxidx;
      leftidx = maxidx * 2;
      rightidx = maxidx * 2 + 1;
    }

    return min;
  }
}

const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, K] = input.shift().trimEnd().split(" ").map(Number);

const jewels = [];
const bags = [];
let result = 0;

for (let i = 0; i < N; i++) jewels.push(input[i].split(" ").map(Number));
for (let i = N; i < N + K; i++) bags.push(Number(input[i]));

// 무게 순 내림차순 + 같으면 가성비 높은 순.
jewels.sort((a, b) => a[0] - b[0]);

// 무게 순 내림차순.
bags.sort((a, b) => a - b);

const heap = new maxHeap();

// 한 번 탐색한 보석은 다시 보지 않기 위한 index
let jewelIdx = 0;

bags.forEach((w) => {
  for (let i = jewelIdx; i < jewels.length; i++) {
    if (jewels[i][0] <= w) {
      jewelIdx++;
      heap.heapPush(jewels[i]);
    }
    // 무게 초과하는 보석이 나오면 탐색 중지.
    else {
      break;
    }
  }

  result += heap.heapPop()[1];
});

console.log(result);
