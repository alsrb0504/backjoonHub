// 2차원 최대힙
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

    // [거리, rest]
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
      const max_idx =
        this.heap[lt_idx][0] < this.heap[rt_idx][0] ? rt_idx : lt_idx;

      this.swap(cur_idx, max_idx);

      cur_idx = max_idx;
      lt_idx = cur_idx * 2;
      rt_idx = cur_idx * 2 + 1;
    }

    return max;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
}

// const cap = 4;
// const n = 5;
// const deliveries = [1, 0, 3, 1, 2];
// const pickups = [0, 3, 0, 4, 0];

const cap = 2;
const n = 7;
const deliveries = [1, 0, 2, 0, 1, 0, 2];
const pickups = [0, 2, 0, 1, 0, 2, 0];

console.log(solution(cap, n, deliveries, pickups));

function solution(cap, n, deliveries, pickups) {
  const del_heap = new MaxHeap();
  const pickup_heap = new MaxHeap();
  let answer = 0;

  deliveries.forEach((val, idx) => {
    if (val > 0) del_heap.add([idx + 1, val]);
  });
  pickups.forEach((val, idx) => {
    if (val > 0) pickup_heap.add([idx + 1, val]);
  });

  while (del_heap.size() || pickup_heap.size()) {
    // console.table(del_heap);
    // console.table(pickup_heap);

    let del_dist = 0;
    let pickup_dist = 0;

    let del_cnt = 0;
    let pickup_cnt = 0;

    while (del_cnt < cap && del_heap.size()) {
      const [dist, rest] = del_heap.pop();
      const sum = del_cnt + rest;

      // 최대 배달 거리 갱신
      del_dist = Math.max(del_dist, dist);

      if (sum <= cap) {
        del_cnt = sum;
      } else {
        const diff = sum - cap;

        del_cnt = cap;

        del_heap.add([dist, diff]);
      }
    }

    while (pickup_cnt < cap && pickup_heap.size()) {
      const [dist, rest] = pickup_heap.pop();
      const sum = pickup_cnt + rest;

      // 최대 배달 거리 갱신
      pickup_dist = Math.max(pickup_dist, dist);

      if (sum <= cap) {
        pickup_cnt = sum;
      } else {
        const diff = sum - cap;
        pickup_cnt = cap;

        pickup_heap.add([dist, diff]);
      }
    }

    // console.log(`del_cnt = ${del_cnt}`);
    // console.log(`pickup_cnt = ${pickup_cnt}`);
    // console.log(Math.max(del_dist, pickup_dist));

    answer += Math.max(del_dist, pickup_dist) * 2;
  }

  return answer;
}

