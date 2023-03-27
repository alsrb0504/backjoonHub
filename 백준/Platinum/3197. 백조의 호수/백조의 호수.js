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

  size() {
    return this.length;
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

const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];
const [H, W] = input[0].split(" ").map(Number);
const visited = Array.from({ length: H }, () => new Array(W).fill(false));
const groupMap = Array.from({ length: H }, () => new Array(W).fill(-1));
const points = [];
let map = input.slice(1, 1 + H).map((el) => el.trimEnd().split(""));
let answer = 0;
let groupCnt = 0;
const endGroups = [];

let currWaters = new Queue();

for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (map[i][j] === "L") points.push([i, j]);

    if (map[i][j] !== "X" && !visited[i][j]) {
      makeGroupBFS(i, j, ++groupCnt);
    }
  }
}

points.forEach((el) => {
  const [y, x] = el;
  endGroups.push(groupMap[y][x]);
});

const unionArr = [...new Array(groupCnt + 1).keys()];

while (true) {
  if (meltIce()) break;

  answer++;
}

console.log(answer);

function meltIce() {
  let nextWaters = new Queue();
  initVisit();

  // console.table(currWaters);
  // console.table(map);
  // console.table(groupMap);
  // console.table(unionArr);
  // console.log(endGroups);

  while (currWaters.size()) {
    const [y, x] = currWaters.dequeue();
    const currGroup = groupMap[y][x];

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];

      if (ny < 0 || nx < 0 || ny >= H || nx >= W || visited[ny][nx]) continue;

      if (map[ny][nx] === "X") {
        nextWaters.enqueue([ny, nx]);
        groupMap[ny][nx] = currGroup;
        map[ny][nx] = ".";
        visited[ny][nx] = true;
      } else {
        // 서로 다른 그룹일 경우
        const nextGroup = groupMap[ny][nx];

        if (nextGroup !== -1 && !findParent(nextGroup, currGroup)) {
          //
          // if (findParent(endGroups[0], endGroups[1])) return true;
          // else {
          unionParent(nextGroup, currGroup);
          // }
        }

        if (findParent(endGroups[0], endGroups[1])) {
          return true;
        }
      }
    }
  }

  currWaters = nextWaters;
  return false;
}

function getParent(num) {
  if (unionArr[num] === num) return num;

  unionArr[num] = getParent(unionArr[num]);
  return unionArr[num];
}

function unionParent(a, b) {
  const aParent = getParent(a);
  const bParent = getParent(b);

  if (aParent < bParent) unionArr[bParent] = aParent;
  else unionArr[aParent] = bParent;
}

function findParent(a, b) {
  const aParent = getParent(a);
  const bParent = getParent(b);

  if (aParent === bParent) return 1;
  else return 0;
}

function makeGroupBFS(sy, sx, groupNum) {
  const q = new Queue();
  q.enqueue([sy, sx]);
  visited[sy][sx] = true;
  groupMap[sy][sx] = groupNum;

  while (q.size()) {
    const [y, x] = q.dequeue();

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];

      if (
        ny < 0 ||
        nx < 0 ||
        ny >= H ||
        nx >= W ||
        // map[ny][nx] === "X" ||
        visited[ny][nx]
      )
        continue;

      // 벽과 이접한 부분 저장 => 다음에 벽을 녹일 부분임
      if (map[ny][nx] === "X") {
        // currWaters.enqueue([ny, nx]);
        currWaters.enqueue([y, x]);
        continue;
      }

      visited[ny][nx] = true;
      groupMap[ny][nx] = groupNum;
      q.enqueue([ny, nx]);
    }
  }
}

function initVisit() {
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      visited[i][j] = false;
    }
  }
}