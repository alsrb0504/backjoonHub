const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.rear = null;
    this.length = 0;
  }

  enqueue(data) {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
    } else {
      this.rear.next = node;
    }

    this.rear = node;
    this.length++;
  }

  dequeue() {
    if (!this.head) {
      return false;
    }
    const data = this.head.data;
    this.head = this.head.next;
    this.length--;

    return data;
  }
}
const MAX = 500000;
const [start, dest] = input[0].split(" ").map(Number);

if (start === dest) {
  console.log(0);
  return;
}

const oddQueue = new Queue();
const evenQueue = new Queue();

const oddVisited = new Array(MAX + 1).fill(false);
const evenVisited = new Array(MAX + 1).fill(false);

let end = dest;
let cnt = 0;

evenQueue.enqueue(start);
evenVisited[start] = true;

while (end <= MAX) {
  cnt++;
  const nextEnd = end + cnt;

  // 홀수
  if (cnt % 2 === 1) {
    while (evenQueue.length) {
      const curr = evenQueue.dequeue();

      const prev = curr - 1;
      const next = curr + 1;
      const double = curr * 2;

      if (prev >= 0 && prev <= MAX && !oddVisited[prev]) {
        oddQueue.enqueue(prev);
        oddVisited[prev] = true;
      }
      if (next >= 0 && next <= MAX && !oddVisited[next]) {
        oddQueue.enqueue(next);
        oddVisited[next] = true;
      }
      if (double >= 0 && double <= MAX && !oddVisited[double]) {
        oddQueue.enqueue(double);
        oddVisited[double] = true;
      }
    }

    if (oddVisited[nextEnd]) {
      console.log(cnt);
      return;
    }
  }
  // 짝수
  else {
    while (oddQueue.length) {
      const curr = oddQueue.dequeue();

      const prev = curr - 1;
      const next = curr + 1;
      const double = curr * 2;

      if (prev >= 0 && prev <= MAX && !evenVisited[prev]) {
        evenQueue.enqueue(prev);
        evenVisited[prev] = true;
      }
      if (next >= 0 && next <= MAX && !evenVisited[next]) {
        evenQueue.enqueue(next);
        evenVisited[next] = true;
      }
      if (double >= 0 && double <= MAX && !evenVisited[double]) {
        evenQueue.enqueue(double);
        evenVisited[double] = true;
      }
    }

    if (evenVisited[nextEnd]) {
      console.log(cnt);
      return;
    }
  }

  end = nextEnd;
}

console.log(-1);
