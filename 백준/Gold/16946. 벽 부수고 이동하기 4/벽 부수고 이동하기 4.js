const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [h, w] = input.shift().split(" ").map(Number);

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

const map = input.map((v) => v.trimEnd().split("").map(Number));
const visited = Array.from({ length: h }, () => new Array(w).fill(0));
const group = [0];
const dy = [0, 1, 0, -1];
const dx = [-1, 0, 1, 0];

function bfs(sy, sx, cnt) {
  const q = new Queue();

  let groupCnt = 0;

  visited[sy][sx] = cnt;
  q.enqueue([sy, sx]);

  while (q.length) {
    const [y, x] = q.dequeue();
    groupCnt++;

    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      if (-1 < ny && ny < h && -1 < nx && nx < w) {
        if (map[ny][nx] === 0 && visited[ny][nx] === 0) {
          visited[ny][nx] = cnt;
          q.enqueue([ny, nx]);
        }
      }
    }
  }

  group[cnt] = groupCnt;
}

const walls = [];
let cnt = 1;

for (let i = 0; i < h; i++) {
  for (let j = 0; j < w; j++) {
    if (map[i][j] === 1) {
      walls.push([i, j]);
    } else {
      if (visited[i][j] === 0) {
        bfs(i, j, cnt++);
      }
    }
  }
}

walls.forEach((pos) => {
  const [y, x] = pos;
  const set = new Set();
  let coverCnt = 1;

  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];

    if (-1 < ny && ny < h && -1 < nx && nx < w) {
      if (visited[ny][nx] !== 0) {
        set.add(visited[ny][nx]);
      }
    }
  }

  set.forEach((val) => {
    coverCnt += group[val];
  });

  map[y][x] = coverCnt % 10;
});

let answer = "";

map.forEach((line) => {
  answer += line.join("") + "\n";
});

console.log(answer.trimEnd());
