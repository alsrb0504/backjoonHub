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
}

function solution(cap, n, deliveries, pickups) {
  let answer = 0;

  const del_heap = new maxHeap();
  const pick_heap = new maxHeap();

  let del_cnt = 0;
  let pick_cnt = 0;

  deliveries.forEach((el, idx) => {
    if (el !== 0) {
      for (let i = 0; i < el; i++) {
        del_heap.heapPush(idx + 1);

        del_cnt++;
      }
    }
  });

  pickups.forEach((el, idx) => {
    if (el !== 0) {
      for (let i = 0; i < el; i++) {
        pick_heap.heapPush(idx + 1);

        pick_cnt++;
      }
    }
  });

  // console.table(del_heap.q);
  // console.table(pick_heap.q);

  // console.log(`del_cnt = ${del_cnt}, pick_cnt = ${pick_cnt}`);

  while (del_cnt > 0 || pick_cnt > 0) {
    let dist = 0;

    for (let i = 0; i < cap && del_cnt > 0; i++) {
      const tmp = del_heap.heapPop();
      dist = Math.max(dist, tmp);

      del_cnt--;
    }

    for (let i = 0; i < cap && pick_cnt > 0; i++) {
      const tmp = pick_heap.heapPop();
      dist = Math.max(dist, tmp);

      pick_cnt--;
    }

    answer += 2 * dist;
  }

  return answer;
}
