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

    while (cur_idx > 1 && this.heap[cur_idx][0] < this.heap[par_idx][0]) {
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
      if (this.heap[cur_idx][0] > this.heap[lt_idx][0]) {
        this.swap(cur_idx, lt_idx);
      }
      return min;
    }

    // 자식이 둘 이상
    while (
      lt_idx < this.size() &&
      (this.heap[lt_idx][0] < this.heap[cur_idx][0] ||
        this.heap[rt_idx][0] < this.heap[cur_idx][0])
    ) {
      const min_idx =
        this.heap[lt_idx][0] > this.heap[rt_idx][0] ? rt_idx : lt_idx;

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

class MaxHeap {
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

    while (cur_idx > 1 && this.heap[cur_idx][0] > this.heap[par_idx][0]) {
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

    const max = this.heap[1];
    this.heap[1] = this.heap.pop();

    let cur_idx = 1;
    let lt_idx = cur_idx * 2;
    let rt_idx = cur_idx * 2 + 1;

    // 자식이 없다면
    if (!this.heap[lt_idx]) {
      return max;
    }

    // 자식이 하나라면
    if (!this.heap[rt_idx]) {
      if (this.heap[cur_idx][0] < this.heap[lt_idx][0]) {
        this.swap(cur_idx, lt_idx);
      }
      return max;
    }

    // 자식이 둘 이상
    while (
      lt_idx < this.size() &&
      (this.heap[lt_idx][0] > this.heap[cur_idx][0] ||
        this.heap[rt_idx][0] > this.heap[cur_idx][0])
    ) {
      const min_idx =
        this.heap[lt_idx][0] < this.heap[rt_idx][0] ? rt_idx : lt_idx;

      this.swap(cur_idx, min_idx);

      cur_idx = min_idx;
      lt_idx = cur_idx * 2;
      rt_idx = cur_idx * 2 + 1;
    }

    return max;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
}

function solution(operations) {
  // var answer = [];

  const minHeap = new MinHeap();
  const maxHeap = new MaxHeap();
  const used = new Set();

  operations.forEach((el, idx) => {
    const [command, num] = el.split(" ");
    // console.log(command, num);

    if (command === "I") {
      minHeap.add([Number(num), idx]);
      maxHeap.add([Number(num), idx]);
    }

    if (command === "D" && num === "-1") {
      while (minHeap.size()) {
        const [_, pushIdx] = minHeap.pop();

        if (!used.has(pushIdx)) {
          used.add(pushIdx);
          break;
        }
      }

      // console.log(pushIdx);
    }

    if (command === "D" && num === "1") {
      while (maxHeap.size()) {
        const [_, pushIdx] = maxHeap.pop();

        if (!used.has(pushIdx)) {
          used.add(pushIdx);
          break;
        }
      }

      // console.log(pushIdx);
    }
  });

  let min = 0;
  let max = 0;

  while (minHeap.size()) {
    const [num, pushIdx] = minHeap.pop();

    if (!used.has(pushIdx)) {
      min = num;
      break;
    }
  }

  while (maxHeap.size()) {
    const [num, pushIdx] = maxHeap.pop();

    if (!used.has(pushIdx)) {
      max = num;
      break;
    }
  }

  return [max, min];

  // return answer;
}