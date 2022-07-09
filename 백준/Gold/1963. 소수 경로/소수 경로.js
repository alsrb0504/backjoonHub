const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input.shift());

const primes = new Map();
const visited = new Array(10000).fill(false);

for (let i = 2; i < 10000; i++) {
  if (!visited[i]) {
    for (let j = i * 2; j < 10000; j += i) {
      visited[j] = true;
    }
  }
}

for (let i = 1000; i < 10000; i++) {
  if (!visited[i]) primes.set(i, false);
}

let answer = "";

for (let i = 0; i < N; i++) {
  const [str, dest] = input[i].split(" ").map(Number);
  answer += bfs(str, dest) + "\n";
}

console.log(answer.trimEnd());

function bfs(init, end) {
  const q = [[init, 0]];
  const visitedMap = new Map(primes);

  visitedMap.set(init, true);

  while (q.length) {
    const [num, cnt] = q.shift();

    if (num === end) return cnt;

    const [fir, sec, thi, four] = num.toString().split("");

    for (let i = 1; i < 10; i++) {
      const firNum = Number(i.toString() + sec + thi + four);

      if (visitedMap.has(firNum) && !visitedMap.get(firNum)) {
        visitedMap.set(firNum, true);
        q.push([firNum, cnt + 1]);
      } else continue;
    }

    for (let i = 0; i < 10; i++) {
      const secNum = Number(fir + i.toString() + thi + four);

      if (visitedMap.has(secNum) && !visitedMap.get(secNum)) {
        visitedMap.set(secNum, true);
        q.push([secNum, cnt + 1]);
      } else continue;
    }

    for (let i = 0; i < 10; i++) {
      const thiNum = Number(fir + sec + i.toString() + four);

      if (visitedMap.has(thiNum) && !visitedMap.get(thiNum)) {
        visitedMap.set(thiNum, true);
        q.push([thiNum, cnt + 1]);
      } else continue;
    }

    for (let i = 0; i < 10; i++) {
      const fourNum = Number(fir + sec + thi + i.toString());

      if (visitedMap.has(fourNum) && !visitedMap.get(fourNum)) {
        visitedMap.set(fourNum, true);
        q.push([fourNum, cnt + 1]);
      } else continue;
    }
  }

  return "Impossible";
}
