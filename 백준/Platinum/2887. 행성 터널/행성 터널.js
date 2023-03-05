const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
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

const N = Number(input[0]);
const infos = input
  .slice(1, 1 + N)
  .map((el, idx) => (el + ` ${idx + 1}`).split(" ").map(Number));

const arr = [...new Array(N + 1).keys()];
const heap = new MinHeap();

let answer = 0;

infos.sort((a, b) => a[0] - b[0]);
for (let i = 1; i < N; i++) {
  const diff = Math.abs(infos[i - 1][0] - infos[i][0]);
  heap.add([diff, infos[i - 1][3], infos[i][3]]);
}

infos.sort((a, b) => a[1] - b[1]);
for (let i = 1; i < N; i++) {
  const diff = Math.abs(infos[i - 1][1] - infos[i][1]);
  heap.add([diff, infos[i - 1][3], infos[i][3]]);
}

infos.sort((a, b) => a[2] - b[2]);
for (let i = 1; i < N; i++) {
  const diff = Math.abs(infos[i - 1][2] - infos[i][2]);
  heap.add([diff, infos[i - 1][3], infos[i][3]]);
}

while (heap.size()) {
  const [cost, u, v] = heap.pop();

  if (isSameParent(u, v)) continue;

  unionParent(u, v);
  answer += cost;
}

console.log(answer);

function getParent(num) {
  if (arr[num] === num) return num;

  arr[num] = getParent(arr[num]);
  return arr[num];
}

function unionParent(a, b) {
  const aParent = getParent(a);
  const bParent = getParent(b);

  if (aParent < bParent) arr[bParent] = aParent;
  else arr[aParent] = bParent;
}

function isSameParent(a, b) {
  const aParent = getParent(a);
  const bParent = getParent(b);

  if (aParent === bParent) return true;
  else return false;
}
