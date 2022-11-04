const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);

const nums = input
  .slice(1, 1 + N)
  .map((line) => line.split(" ").map(Number))
  .sort((a, b) => a[0] - b[0]);

let answer = 0;

class minHeap {
  constructor() {
    this.q = [null];
  }

  size() {
    return this.q.length;
  }

  heapPeek() {
    return this.q[1];
  }

  heapPush(item) {
    this.q.push(item);

    let curidx = this.size() - 1;
    let paridx = Math.floor(curidx / 2);

    // 부모가 자신보다 작아야 함.
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
      //
    }

    return min;
  }
}

const heap = new minHeap();

nums.forEach((el) => {
  const [s, t] = el;

  if (heap.size() === 1) heap.heapPush(t);
  else {
    const min = heap.heapPeek();

    if (s < min) {
      heap.heapPush(t);
    } else {
      heap.heapPop();
      heap.heapPush(t);
    }
  }
});

console.log(heap.size() - 1);
