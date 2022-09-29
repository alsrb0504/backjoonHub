const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [total, start, end, up, down] = input[0].split(" ").map(Number);

const visited = new Array(total + 1).fill(-1);
visited[start] = 0;

if (start === end) {
  console.log(0);
  return;
}

let isPossible = false;
let answer = 0;

bfs();

function bfs() {
  const q = [[start, 0]];

  while (q.length) {
    const [cur, cnt] = q.shift();
    // console.log(`cur = ${cur}, cnt = ${cnt}`);

    // if (cur === end) {
    //   // console.log("find!!!");

    //   console.log(answer);
    //   break;
    // }

    const moveUp = cur + up;
    const moveDown = cur - down;

    if (moveUp === end || moveDown === end) {
      isPossible = true;
      console.log(cnt + 1);
      break;
    }

    if (
      moveUp <= total &&
      (visited[moveUp] === -1 || visited[moveUp] > cnt + 1)
    ) {
      visited[moveUp] = cnt + 1;
      q.push([moveUp, cnt + 1]);
    }

    if (
      moveDown > 0 &&
      (visited[moveDown] === -1 || visited[moveDown] > cnt + 1)
    ) {
      visited[moveDown] = cnt + 1;
      q.push([moveDown, cnt + 1]);
    }
  }
}

// console.table(visited);
if (!isPossible) console.log("use the stairs");
