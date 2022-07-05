const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split(" ");

const [a, b, c] = input.map(Number).sort((a, b) => a - b);

bfs();

function bfs() {
  const map = new Map();
  const q = [[a, b, c]];

  while (q.length) {
    const [v1, v2, v3] = q.shift();

    // 종료
    if (v1 === v2 && v2 === v3) {
      console.log(1);
      return;
    }

    // 3C2 = 3가지 , [1, 2], [1, 3], [2, 3] 경우 확인.
    if (v1 !== v2) {
      const calced = [v1 * 2, v2 - v1, v3].sort((a, b) => a - b);
      const key = `${calced[0]}-${calced[1]}-${calced[2]}`;
      if (!map.has(key)) {
        map.set(key, true);
        q.push(calced);
      }
    }
    if (v1 !== v3) {
      const calced = [v1 * 2, v3 - v1, v2].sort((a, b) => a - b);
      const key = `${calced[0]}-${calced[1]}-${calced[2]}`;
      if (!map.has(key)) {
        map.set(key, true);
        q.push(calced);
      }
    }
    if (v2 !== v3) {
      const calced = [v1, v2 * 2, v3 - v2].sort((a, b) => a - b);
      const key = `${calced[0]}-${calced[1]}-${calced[2]}`;
      if (!map.has(key)) {
        map.set(key, true);
        q.push(calced);
      }
    }
  }

  console.log(0);
  return;
}