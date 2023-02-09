const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

//  각각의 노드, 노드의 data와 다음 노드를 가리키고 있다.
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
    // 노드 추가.
    const node = new Node(data); // data를 가진 node를 만들어준다.
    if (!this.head) {
      // 헤드가 없을 경우 head를 해당 노드로
      this.head = node;
    } else {
      this.rear.next = node; // 아닐 경우 마지막의 다음 노드로
    }
    this.rear = node; // 마지막을 해당 노드로 한다.
    this.length++;
  }

  dequeue() {
    // 노드 삭제.
    if (!this.head) {
      // 헤드가 없으면 한 개도 없는 것이므로 false를 반환.
      return false;
    }
    const data = this.head.data; // head를 head의 다음 것으로 바꿔주고 뺀 data를 return
    this.head = this.head.next;
    this.length--;

    return data;
  }
}

const [h, w, k] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + h).map((el) => el.split("").map(Number));

const visited = Array.from({ length: h }, () =>
  Array.from({ length: w }, () => new Array(k + 1).fill(Infinity))
);

visited[0][0][0] = 1;

bfs();

const answer = Math.min(...visited[h - 1][w - 1]);

console.log(answer === Infinity ? -1 : answer);

function bfs() {
  const dy = [0, 0, -1, 1];
  const dx = [-1, 1, 0, 0];

  // [y, x, cnt(벽을 깬 회수), isSun(낮 true /밤 false), isReady(기다렸는지)]
  const q = new Queue();
  q.enqueue([0, 0, 0, true, false]);

  while (!q.isEmpty()) {
    const [y, x, cnt, isSun, isReady] = q.dequeue();

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];

      if (ny < 0 || nx < 0 || ny >= h || nx >= w) continue;

      if (map[ny][nx] === 0 && visited[ny][nx][cnt] === Infinity) {
        visited[ny][nx][cnt] = visited[y][x][cnt] + 1;
        q.enqueue([ny, nx, cnt, !isSun, false]);
      }

      if (
        map[ny][nx] === 1 &&
        cnt < k &&
        visited[ny][nx][cnt + 1] === Infinity &&
        visited[ny][nx][cnt] === Infinity
      ) {
        if (isSun) {
          if (isReady) {
            visited[ny][nx][cnt + 1] = visited[y][x][cnt] + 2;
            q.enqueue([ny, nx, cnt + 1, !isSun, false]);
          } else {
            visited[ny][nx][cnt + 1] = visited[y][x][cnt] + 1;
            q.enqueue([ny, nx, cnt + 1, !isSun, false]);
          }
        } else {
          q.enqueue([y, x, cnt, !isSun, true]);
        }
      }
    }
  }
}
