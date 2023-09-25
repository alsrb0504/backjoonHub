const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n")
  .map((el) => el.trimEnd());

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

const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];
const [H, W] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + H).map((el) => el.split(""));
const TT = "TT";
const visited = Array.from({ length: H }, () => new Array(W).fill(false));
const start = { y: 0, x: 0 };
let accountCnt = 0;

for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (map[i][j] === "I") {
      start.y = i;
      start.x = j;
    }
  }
}

visited[start.y][start.x] = true;

const q = new Queue();
q.enqueue({ y: start.y, x: start.x });

while (q.length) {
  const { y, x } = q.dequeue();

  for (let i = 0; i < 4; i++) {
    const [ny, nx] = [y + dy[i], x + dx[i]];

    if (ny < 0 || nx < 0 || ny >= H || nx >= W || map[ny][nx] === "X") continue;
    if (visited[ny][nx]) continue;

    visited[ny][nx] = true;
    if (map[ny][nx] === "P") accountCnt++;
    q.enqueue({ y: ny, x: nx });
  }
}

console.log(accountCnt > 0 ? accountCnt : TT);
