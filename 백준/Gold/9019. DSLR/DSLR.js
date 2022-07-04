const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);

let result = "";
// let visited = [];

for (let i = 1; i <= N; i++) {
  let [start, dest] = input[i].split(" ").map(Number);
  // visited = new Array(10000).fill(false);

  bfs(start, dest);
}

console.log(result.trimEnd());

function bfs(start, dest) {
  const q = [[start, ""]];
  const visited = new Array(10000).fill(false);

  visited[start] = true;

  while (q.length !== 0) {
    let [num, record] = q.shift();

    // console.log(num, record);
    // if (visited[num]) continue;

    if (num === dest) {
      result += record + "\n";
      return;
    }

    // visited[num] = true;

    const D = (num * 2) % 10000;
    if (!visited[D]) {
      visited[D] = true;
      q.push([D, record + "D"]);
    }

    const S = num === 0 ? 9999 : num - 1;
    if (!visited[S]) {
      visited[S] = true;
      q.push([S, record + "S"]);
    }

    const L = Math.floor(num / 1000) + (num % 1000) * 10;
    if (!visited[L]) {
      visited[L] = true;
      q.push([L, record + "L"]);
    }

    const R = Math.floor(num / 10) + (num % 10) * 1000;
    if (!visited[R]) {
      visited[R] = true;
      q.push([R, record + "R"]);
    }
  }
}
