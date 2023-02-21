const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const SIZE = 61;

const N = Number(input[0]);
const nums = input[1].split(" ").map(Number);
const visited = Array.from({ length: SIZE }, () =>
  Array.from({ length: SIZE }, () => new Array(SIZE).fill(Infinity))
);

const damages = [
  [9, 3, 1],
  [9, 1, 3],
  [3, 9, 1],
  [3, 1, 9],
  [1, 3, 9],
  [1, 9, 3],
];

if (N < 3) {
  for (let i = N; i <= 3; i++) {
    nums.push(0);
  }
}

solution(nums[0], nums[1], nums[2]);

function solution(a, b, c) {
  const q = [[a, b, c, 0]];
  visited[a][b][c] = 0;

  while (q.length) {
    const [c1, c2, c3, cnt] = q.shift();

    for (let i = 0; i < 6; i++) {
      let [n1, n2, n3] = [
        c1 - damages[i][0],
        c2 - damages[i][1],
        c3 - damages[i][2],
      ];

      if (n1 < 0) n1 = 0;
      if (n2 < 0) n2 = 0;
      if (n3 < 0) n3 = 0;

      const sum = n1 + n2 + n3;

      if (sum === 0) {
        console.log(cnt + 1);
        return;
      }

      if (visited[n1][n2][n3] <= cnt + 1) continue;

      visited[n1][n2][n3] = cnt + 1;
      q.push([n1, n2, n3, cnt + 1]);
    }
  }
}
