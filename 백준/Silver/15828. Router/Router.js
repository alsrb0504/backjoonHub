const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

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

  size() {
    return this.length;
  }

  front() {
    return this.head.data;
  }

  back() {
    return this.rear.data;
  }
}

const SIZE = Number(input[0]);
const data = input.slice(1).map(Number);

const q = new Queue();

data.forEach((num) => {
  if (num > 0) {
    if (q.size() >= SIZE) return;

    q.enqueue(num);
  } else if (num === 0) {
    q.dequeue();
  }
});

if (q.size() === 0) {
  console.log("empty");
} else {
  const answer = [];

  while (q.size()) {
    answer.push(q.dequeue());
  }

  console.log(answer.join(" "));
}
