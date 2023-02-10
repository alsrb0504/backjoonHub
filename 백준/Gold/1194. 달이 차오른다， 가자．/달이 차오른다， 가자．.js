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

// 큐 클래스
class Queue {
  constructor() {
    this.head = null; // 제일 앞 노드
    this.rear = null; // 제일 뒤 노드
    this.length = 0; // 노드의 길이
  }

  isEmpty() {
    if (this.length === 0) return true;
    else return false;
  }

  enqueue(data) {
    const node = new Node(data); // data를 가진 node를 만들어준다.
    if (!this.head) {
      this.head = node;
    } else {
      this.rear.next = node; // 아닐 경우 마지막의 다음 노드로
    }
    this.rear = node; // 마지막을 해당 노드로 한다.
    this.length++;
  }

  dequeue() {
    if (!this.head) {
      return false;
    }
    const data = this.head.data; // head를 head의 다음 것으로 바꿔주고 뺀 data를 return
    this.head = this.head.next;
    this.length--;

    return data;
  }
}

const keys = {
  a: 32,
  b: 16,
  c: 8,
  d: 4,
  e: 2,
  f: 1,
};

const doors = {
  A: 32,
  B: 16,
  C: 8,
  D: 4,
  E: 2,
  F: 1,
};

const [h, w] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + h).map((el) => el.split(""));

const visited = Array.from(
  { length: h },
  () => Array.from({ length: w }, () => new Set()) // [keys_bits]
);

const start = [];

for (let i = 0; i < h; i++) {
  for (let j = 0; j < w; j++) {
    if (map[i][j] === "0") {
      start.push([i, j]);
      map[i][j] = ".";
    }
  }
}

console.log(bfs());

function bfs() {
  const dy = [0, 0, -1, 1];
  const dx = [-1, 1, 0, 0];
  const q = new Queue();

  q.enqueue([start[0][0], start[0][1], 0, 0]);
  visited[start[0][0]][start[0][1]].add(0);

  while (!q.isEmpty()) {
    const [y, x, cnt, bit] = q.dequeue();

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];

      if (ny < 0 || nx < 0 || ny === h || nx === w) continue;

      const next = map[ny][nx];

      if (next === "#") continue;

      // end
      if (next === "1") {
        return cnt + 1;
      }
      // 빈 벽
      else if (next === ".") {
        if (visited[ny][nx].has(bit)) continue;
        else {
          visited[ny][nx].add(bit);
          q.enqueue([ny, nx, cnt + 1, bit]);
        }
      }
      // 키 or 문
      else {
        // 키 인 경우
        if (Object.keys(keys).includes(next)) {
          const union_key = bit | keys[next];

          if (visited[ny][nx].has(union_key)) continue;
          else {
            visited[ny][nx].add(union_key);
            q.enqueue([ny, nx, cnt + 1, union_key]);
          }
        }
        // 문 인 경우
        else {
          const door = doors[next];

          if (bit & door) {
            if (visited[ny][nx].has(bit)) continue;
            else {
              visited[ny][nx].add(bit);
              q.enqueue([ny, nx, cnt + 1, bit]);
            }
          }
        }
      }
    }
  }

  return -1;
}
