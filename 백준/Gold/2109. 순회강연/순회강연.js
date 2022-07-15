const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input.shift());
// input.shift();

if (N === 0) {
  console.log(0);
  return;
}

class maxHeap {
  constructor() {
    this.q = [null];
  }

  size() {
    return this.q.length;
  }

  heapPush(item) {
    // this.q.push(item);
    this.q.push(item);

    let curidx = this.size() - 1;
    let paridx = Math.floor(curidx / 2);

    // 부모가 자신보다 커야함.
    // while (this.q[curidx] > this.q[paridx] && curidx !== 1) {
    //   [this.q[curidx], this.q[paridx]] = [this.q[paridx], this.q[curidx]];
    //   curidx = paridx;
    //   paridx = Math.floor(curidx / 2);
    // }

    // 항상 존재하긴 할 것.
    while (curidx !== 1 && this.q[curidx][0] > this.q[paridx][0]) {
      [this.q[curidx], this.q[paridx]] = [this.q[paridx], this.q[curidx]];
      curidx = paridx;
      paridx = Math.floor(curidx / 2);
    }
  }

  heapPop() {
    // 빈 경우
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
      (this.q[leftidx] && this.q[curidx][0] < this.q[leftidx][0]) ||
      (this.q[rightidx] && this.q[curidx][0] < this.q[rightidx][0])
    ) {
      let maxidx = 0;

      if (this.q[rightidx]) {
        maxidx = this.q[leftidx][0] < this.q[rightidx][0] ? rightidx : leftidx;
      } else {
        maxidx = leftidx;
      }

      [this.q[curidx], this.q[maxidx]] = [this.q[maxidx], this.q[curidx]];

      curidx = maxidx;
      leftidx = maxidx * 2;
      rightidx = maxidx * 2 + 1;
      //
    }

    return min;
  }
}

const heap = new maxHeap();

const lectures = [];

input.forEach((data) => {
  const [p, d] = data.trimEnd().split(" ").map(Number);

  lectures.push([p, d]);
});

lectures.sort((a, b) => b[1] - a[1]);
lectures.forEach((v) => heap.heapPush(v));

// console.table(heap.q);

// console.table(lectures);

const lastDay = lectures[0][1];

// console.log(lastDay);

const check = new Array(lastDay + 1).fill(0);
// const check = new Array(20 + 1).fill(0);

while (heap.size() !== 1) {
  const [maxValue, day] = heap.heapPop();

  for (let i = day; i > 0; i--) {
    if (check[i] === 0) {
      check[i] = maxValue;
      break;
    }
  }
}

// let [maxValue, day] = heap.heapPop();

// console.table(check);
const sum = check.reduce((acc, cur) => acc + cur, 0);

// console.log(answer);
console.log(sum);