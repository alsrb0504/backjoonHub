const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const TC = Number(input[0]);
const result = [];
let line = 1;
let cnt = 0;

while (cnt < TC) {
  const [N, M, W] = input[line].split(" ").map(Number);

  result.push(solution(N, M, W, line));

  line += M + W + 1;
  cnt++;
}

console.log(result.join("\n").trimEnd());

function solution(N, M, W, line) {
  const edges_length = 2 * M + W;
  const edges = [];

  input.slice(line + 1, line + 1 + edges_length).forEach((line, idx) => {
    const [s, e, c] = line.split(" ").map(Number);

    if (idx < M) {
      edges.push([s, e, c]);
      edges.push([e, s, c]);
    } else edges.push([s, e, -c]);
  });

  // console.table(edges);

  // dist = new Array(N + 1).fill(Infinity);
  dist = new Array(N + 1).fill(0);

  const negative_cycle = bellman_ford(1);

  if (negative_cycle) return "YES";
  else return "NO";

  // let dist = [];

  // let isPossible = false;

  // for (let i = 1; i <= N; i++) {
  //   if (isPossible) break;

  //   // dist = new Array(N + 1).fill(Infinity);
  //   dist = new Array(N + 1).fill(0);

  //   const negative_cycle = bellman_ford(i);

  //   if (negative_cycle) {
  //     isPossible = true;
  //   }
  // }

  // if (isPossible) return "YES";
  // else return "NO";

  function bellman_ford(start) {
    dist[start] = 0;

    let cur = start;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < edges_length; j++) {
        cur = edges[j][0]; // 시작점
        const next = edges[j][1];
        const cost = edges[j][2];

        // 현재 간선을 거쳐서 다른 노드로 이동하는 거리가 더 짧은 경우 갱신
        // if (dist[cur] != Infinity && dist[next] > dist[cur] + cost) {
        if (dist[next] > dist[cur] + cost) {
          dist[next] = dist[cur] + cost;

          // n번째 라운드에서도 갱신이 일어난다면 음수 순환이 존재하는 것.
          if (i === N - 1) return true;
        }
      }
    }
    return false;
  }
}
