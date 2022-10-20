const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
let answer = [];

class MaxHeap {
  constructor() {
    this.heap = [Number.MAX_SAFE_INTEGER];
  }

  push(num) {
    if (this.heap.length === 1) {
      this.heap.push(num);
      return;
    }

    this.heap.push(num);
    let curidx = this.heap.length - 1;
    let paridx = Math.floor(curidx / 2);

    while (this.heap[curidx] > this.heap[paridx]) {
      [this.heap[curidx], this.heap[paridx]] = [
        this.heap[paridx],
        this.heap[curidx],
      ];

      curidx = paridx;
      paridx = Math.floor(curidx / 2);
    }
  }

  pop() {
    if (this.heap.length === 1) return 0;

    const max = this.heap[1];

    if (this.heap.length === 2) {
      this.heap.pop();
      return max;
    }

    this.heap[1] = this.heap.pop();

    let curidx = 1;
    let ltidx = curidx * 2;
    let rtidx = curidx * 2 + 1;

    // 자식이 없는 경우
    if (!this.heap[ltidx]) {
      return max;
    }

    // 자식이 하나 있는 경우
    if (!this.heap[rtidx]) {
      if (this.heap[curidx] < this.heap[ltidx]) {
        [this.heap[curidx], this.heap[ltidx]] = [
          this.heap[ltidx],
          this.heap[curidx],
        ];
      }
      return max;
    }

    // 자식이 둘 다 있는 경우
    while (
      this.heap[curidx] < this.heap[ltidx] ||
      this.heap[curidx] < this.heap[rtidx]
    ) {
      if (this.heap[ltidx] < this.heap[rtidx]) {
        [this.heap[curidx], this.heap[rtidx]] = [
          this.heap[rtidx],
          this.heap[curidx],
        ];
        curidx = rtidx;
      } else {
        [this.heap[curidx], this.heap[ltidx]] = [
          this.heap[ltidx],
          this.heap[curidx],
        ];
        curidx = ltidx;
      }

      ltidx = curidx * 2;
      rtidx = curidx * 2 + 1;
    }

    return max;
  }
}

const heap = new MaxHeap();

for (let i = 1; i <= N; i++) {
  const num = Number(input[i]);

  if (num === 0) {
    answer.push(heap.pop());
  } else {
    heap.push(num);
  }
}

console.log(answer.join("\n").trimEnd());