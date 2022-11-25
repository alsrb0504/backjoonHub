const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  size() {
    return this.heap.length - 1;
  }

  add(num) {
    if (this.size() === 0) {
      this.heap.push(num);
      return;
    }

    this.heap.push(num);

    let cur_idx = this.size();
    let par_idx = Math.floor(cur_idx / 2);

    while (this.heap[cur_idx] < this.heap[par_idx] && cur_idx !== 1) {
      [this.heap[cur_idx], this.heap[par_idx]] = [
        this.heap[par_idx],
        this.heap[cur_idx],
      ];

      cur_idx = par_idx;
      par_idx = Math.floor(cur_idx / 2);
    }
  }

  pop() {
    const curr_size = this.size();

    if (curr_size === 0) {
      return -1;
    }

    if (curr_size === 1) {
      return this.heap.pop();
    }

    const min = this.heap[1];
    this.heap[1] = this.heap.pop();

    let cur_idx = 1;
    let lt_idx = cur_idx * 2;
    let rt_idx = cur_idx * 2 + 1;

    // 자식이 없다면
    if (!this.heap[lt_idx]) {
      return min;
    }

    // 자식이 하나라면
    if (!this.heap[rt_idx]) {
      if (this.heap[cur_idx] > this.heap[lt_idx]) {
        this.swap(cur_idx, lt_idx);
      }
      return min;
    }

    // 자식이 둘 이상
    while (
      this.heap[lt_idx] < this.heap[cur_idx] ||
      this.heap[rt_idx] < this.heap[cur_idx]
    ) {
      const min_idx = this.heap[lt_idx] > this.heap[rt_idx] ? rt_idx : lt_idx;

      this.swap(cur_idx, min_idx);

      cur_idx = min_idx;
      lt_idx = cur_idx * 2;
      rt_idx = cur_idx * 2 + 1;
    }

    return min;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
}

const heap = new MinHeap();
const [N, M] = input[0].split(" ").map(Number);

input[1]
  .split(" ")
  // .map(Number)
  .map(BigInt)
  .forEach((n) => heap.add(n));

for (let i = 0; i < M; i++) {
  const n1 = heap.pop();
  const n2 = heap.pop();
  const sum = n1 + n2;
  heap.add(sum);
  heap.add(sum);
}

let answer = 0n;

for (let i = 0; i < N; i++) {
  answer += heap.heap[i + 1];
}

console.log(answer.toString());