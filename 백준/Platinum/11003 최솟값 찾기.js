// const readFileSyncAddress = "/dev/stdin";
const readFileSyncAddress = "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, L] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);

// let answer_idx = 0;
let answerCnt = 0;
let answer = [];
let result = [];

class Node {
  prev = null;
  next = null;

  constructor(data, index) {
    this.data = data;
    this.index = index;
  }
}

class Dequeue {
  count = 0;
  head = null;
  tail = null;

  push(num, idx) {
    const node = new Node(num, idx);

    if (this.count === 0) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }

    this.count++;
  }

  pop() {
    const tmp = this.tail;

    if (this.count === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }

    this.count--;
    return [tmp.data, tmp.index];
  }

  unshift() {
    const tmp = this.head;

    if (this.count === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }

    this.count--;
    return [tmp.data, tmp.index];
  }

  size() {
    return this.count;
  }

  top() {
    if (this.count === 0) {
      return [-1, -1];
    }

    return [this.tail.data, this.tail.index];
  }

  peek() {
    if (this.count === 0) {
      return [-1, -1];
    }

    return [this.head.data, this.head.index];
  }
}

const dequeue = new Dequeue();

for (let i = 0; i < N; i++) {
  const bottom = i - L < 0 ? 0 : i - L + 1;

  if (dequeue.size() === 0) {
    dequeue.push(nums[i], i);

    answer.push(nums[i]);
  } else {
    let [top_val, _] = dequeue.top();

    while (top_val > nums[i] && dequeue.size() > 0) {
      dequeue.pop();
      [top_val, _] = dequeue.top();
    }

    dequeue.push(nums[i], i);

    let [front_val, front_idx] = dequeue.peek();

    while (front_idx < bottom && dequeue.size() > 0) {
      dequeue.unshift();
      [front_val, front_idx] = dequeue.peek();
    }

    answerCnt++;
    answer.push(front_val);

    if (answerCnt % 10000 === 0) {
      result.push(answer.join(" "));
      answer = [];
    }
  }
}

result.push(answer.join(" "));

console.log(result.join(" "));

// console.log(answer.join(" "));
