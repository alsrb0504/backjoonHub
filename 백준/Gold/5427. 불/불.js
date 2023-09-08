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

const tc = Number(input[0]);
const answer = [];
let line = 1;
const IMPOSSIBLE = "IMPOSSIBLE";
const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];

const MAX_SIZE = 1000;

const map = Array.from({ length: MAX_SIZE + 1 }, () =>
  new Array(MAX_SIZE + 1).fill("")
);

const visited = Array.from({ length: MAX_SIZE + 1 }, () =>
  new Array(MAX_SIZE + 1).fill(false)
);
const fireVisited = Array.from({ length: MAX_SIZE + 1 }, () =>
  new Array(MAX_SIZE + 1).fill(-1)
);

for (let i = 0; i < tc; i++) {
  // 초기화
  for (let y = 0; y <= MAX_SIZE; y++) {
    for (let x = 0; x <= MAX_SIZE; x++) {
      map[y][x] = "";
      visited[y][x] = false;
      fireVisited[y][x] = -1;
    }
  }

  answer.push(solution());
}

console.log(answer.join("\n"));

function solution() {
  const [W, H] = input[line++].split(" ").map(Number);

  for (let y = line; y < line + H; y++) {
    const oneLine = input[y].trimEnd().split(" ")[0];

    for (let x = 0; x < oneLine.length; x++) {
      map[y - line][x] = oneLine[x];
    }
  }

  line += H;

  const startIdx = { y: 0, x: 0 };
  const fireQ = new Queue();

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (map[i][j] === "*") {
        fireQ.enqueue([i, j, 0]);
        fireVisited[i][j] = 0;
      }
      if (map[i][j] === "@") {
        startIdx.y = i;
        startIdx.x = j;
      }
    }
  }

  while (fireQ.size() > 0) {
    const [y, x, time] = fireQ.dequeue();

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];

      if (
        ny < 0 ||
        nx < 0 ||
        ny >= H ||
        nx >= W ||
        map[ny][nx] === "#" ||
        fireVisited[ny][nx] !== -1
      )
        continue;

      fireVisited[ny][nx] = time + 1;
      fireQ.enqueue([ny, nx, time + 1]);
    }
  }

  const q = new Queue();
  q.enqueue([startIdx.y, startIdx.x, 0]);

  visited[startIdx.y][startIdx.x] = true;

  while (q.size() > 0) {
    const [y, x, time] = q.dequeue();

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];

      if (ny < 0 || nx < 0 || ny >= H || nx >= W) return time + 1;
      if (
        map[ny][nx] === "#" ||
        (fireVisited[ny][nx] !== -1 && fireVisited[ny][nx] <= time + 1) ||
        visited[ny][nx]
      )
        continue;

      visited[ny][nx] = true;
      q.enqueue([ny, nx, time + 1]);
    }
  }

  return IMPOSSIBLE;
}
