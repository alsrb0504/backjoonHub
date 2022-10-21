const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const nums = input.slice(1, 1 + N).map(Number);
let answer = [];

class MaxHeap {
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
    while (this.q[curidx] > this.q[paridx] && curidx !== 1) {
      [this.q[curidx], this.q[paridx]] = [this.q[paridx], this.q[curidx]];
      curidx = paridx;
      paridx = Math.floor(curidx / 2);
    }
  }

  heapPop() {
    // 빈 경우
    if (this.size() === 1) return -1;

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
      this.q[curidx] < this.q[leftidx] ||
      this.q[curidx] < this.q[rightidx]
    ) {
      const maxidx = this.q[leftidx] < this.q[rightidx] ? rightidx : leftidx;

      [this.q[curidx], this.q[maxidx]] = [this.q[maxidx], this.q[curidx]];

      curidx = maxidx;
      leftidx = maxidx * 2;
      rightidx = maxidx * 2 + 1;
      //
    }

    return min;
  }

  // 복사
  heapCopy(arr) {
    this.q = [...arr];
  }
}

class MinHeap {
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
    while (this.q[curidx] < this.q[paridx] && curidx !== 1) {
      [this.q[curidx], this.q[paridx]] = [this.q[paridx], this.q[curidx]];
      curidx = paridx;
      paridx = Math.floor(curidx / 2);
    }
  }

  heapPop() {
    // 빈 경우
    if (this.size() === 1) return -1;

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
      if (this.q[curidx] > this.q[leftidx]) {
        [this.q[curidx], this.q[leftidx]] = [this.q[leftidx], this.q[curidx]];
      }
      return min;
    }

    // 자식이 둘 다 존재.
    while (
      this.q[curidx] > this.q[leftidx] ||
      this.q[curidx] > this.q[rightidx]
    ) {
      const maxidx = this.q[leftidx] > this.q[rightidx] ? rightidx : leftidx;

      [this.q[curidx], this.q[maxidx]] = [this.q[maxidx], this.q[curidx]];

      curidx = maxidx;
      leftidx = maxidx * 2;
      rightidx = maxidx * 2 + 1;
    }

    return min;
  }

  // 복사
  heapCopy(arr) {
    this.q = [...arr];
  }
}

const maxHeap = new MaxHeap();
const minHeap = new MinHeap();

nums.forEach((val, idx) => {
  if (maxHeap.size() <= minHeap.size()) maxHeap.heapPush(val);
  else minHeap.heapPush(val);

  if (maxHeap.q[1] > minHeap.q[1]) {
    const min = minHeap.heapPop();
    const max = maxHeap.heapPop();
    minHeap.heapPush(max);
    maxHeap.heapPush(min);
  }

  answer.push(maxHeap.q[1]);
});

console.log(answer.join("\n").trimEnd());
