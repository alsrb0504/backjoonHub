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

function solution(x, y, n) {
  const [start, end] = [x, y];

  if (start === end) return 0;

  const visited = new Array(y + 1).fill(false);
  // const q = [[start, 0]];
  const q = new Queue();
  q.enqueue([start, 0]);
  visited[start] = 0;

  while (q.length) {
    // const [curr, cnt] = q.shift();
    const [curr, cnt] = q.dequeue();

    const nextPlusN = curr + n;
    const nextTwo = curr * 2;
    const nextThree = curr * 3;

    if (nextPlusN === end || nextTwo === end || nextThree === end)
      return cnt + 1;

    if (checkVisited(nextPlusN)) {
      visited[nextPlusN] = true;
      // q.push([nextPlusN, cnt + 1]);
      q.enqueue([nextPlusN, cnt + 1]);
    }

    if (checkVisited(nextTwo)) {
      visited[nextTwo] = true;
      // q.push([nextTwo, cnt + 1]);
      q.enqueue([nextTwo, cnt + 1]);
    }

    if (checkVisited(nextThree)) {
      visited[nextThree] = true;
      // q.push([nextThree, cnt + 1]);
      q.enqueue([nextThree, cnt + 1]);
    }
  }

  return -1;

  function checkVisited(next) {
    if (next <= end && !visited[next]) return true;
    return false;
  }
}
