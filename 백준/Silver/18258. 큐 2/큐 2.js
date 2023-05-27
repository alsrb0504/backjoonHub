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

const N = Number(input[0]);
const q = new Queue();
const answer = [];

input.slice(1, 1 + N).forEach((line) => {
  const command = line.trimEnd().split(" ");

  switch (command[0]) {
    case "push": {
      q.enqueue(command[1]);
      break;
    }
    case "pop": {
      if (q.size() > 0) {
        answer.push(q.dequeue());
      } else {
        answer.push(-1);
      }
      break;
    }
    case "size": {
      answer.push(q.size());
      break;
    }
    case "empty": {
      if (q.size() > 0) answer.push(0);
      else answer.push(1);
      break;
    }
    case "front": {
      if (q.size() > 0) {
        answer.push(q.front());
      } else {
        answer.push(-1);
      }
      break;
    }
    case "back": {
      if (q.size() > 0) {
        answer.push(q.back());
      } else {
        answer.push(-1);
      }
      break;
    }
  }
});

console.log(answer.join("\n"));
