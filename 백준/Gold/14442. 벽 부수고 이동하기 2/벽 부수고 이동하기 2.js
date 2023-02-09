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
  // head를 반환하는 함수
  front() {
    // head가 있을 경우 head의 data를 반환.
    return this.head && this.head.data;
  }
  //큐의 모든 원소를 반환하는 함수
  getQueue() {
    if (!this.head) return false;
    let node = this.head;
    const array = [];
    while (node) {
      // node가 없을 때까지 array에 추가한 후 반환해준다.
      array.push(node.data);
      node = node.next;
    }
    return array;
  }
}

const [h, w, k] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + h).map((el) => el.split("").map(Number));

const visited = Array.from(
  { length: h },
  () => Array.from({ length: w }, () => new Array(k + 1).fill(Infinity))
  // Array.from({ length: w }, () => new Array(k + 1).fill(0))
);

visited[0][0][0] = 1;

bfs();
// console.table(visited);

const answer = Math.min(...visited[h - 1][w - 1]);

console.log(answer === Infinity ? -1 : answer);

function bfs() {
  // [y, x, cnt(벽을 깬 회수), value(이동 횟수)]
  // const q = [[0, 0, 0]];
  const dy = [0, 0, -1, 1];
  const dx = [-1, 1, 0, 0];

  const q = new Queue();
  q.enqueue([0, 0, 0]);

  // console.log(q);

  // while (q.length) {
  while (!q.isEmpty()) {
    // const [y, x, cnt] = q.shift();
    const [y, x, cnt] = q.dequeue();

    // console.log(q);

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];

      if (ny < 0 || nx < 0 || ny >= h || nx >= w) continue;

      if (map[ny][nx] === 0 && visited[ny][nx][cnt] === Infinity) {
        visited[ny][nx][cnt] = visited[y][x][cnt] + 1;
        // q.push([ny, nx, cnt, visited[y][x][cnt] + 1]);
        q.enqueue([ny, nx, cnt]);
      }

      if (
        map[ny][nx] === 1 &&
        cnt < k &&
        visited[ny][nx][cnt + 1] === Infinity
      ) {
        visited[ny][nx][cnt + 1] = visited[y][x][cnt] + 1;
        // q.push([ny, nx, cnt + 1, visited[y][x][cnt] + 1]);
        q.enqueue([ny, nx, cnt + 1]);
      }
    }
  }
}
