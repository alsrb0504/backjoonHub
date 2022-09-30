const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [a, b, c] = input[0].split(" ").map(Number);
const visited = new Set();
const result = new Set();

result.add(c);

bfs();

function bfs() {
  const q = [[0, 0, c]];

  addItem(0, 0, c);

  while (q.length) {
    const [c1, c2, c3] = q.shift();

    // console.log(`c1 = ${c1}, c2 = ${c2}, c3 = ${c3}`);

    if (c1 === 0) result.add(c3);

    if (c3 !== 0) {
      if (c1 < a) {
        // 다 담을 수 있음.
        if (c1 + c3 <= a && addItem(c1 + c3, c2, 0)) {
          q.push([c1 + c3, c2, 0]);
        }
        // 넘침
        else if (c1 + c3 > a) {
          if (addItem(a, c2, c3 - (a - c1))) q.push([a, c2, c3 - (a - c1)]);
        }
      }

      if (c2 < b) {
        // 다 담을 수 있음.
        if (c2 + c3 <= b && addItem(c1, c2 + c3, 0)) {
          q.push([c1, c2 + c3, 0]);
        }
        // 넘침
        else if (c2 + c3 > b) {
          if (addItem(c1, b, c3 - (b - c2))) q.push([c1, b, c3 - (b - c2)]);
        }
      }
    }

    if (c2 !== 0) {
      if (c1 < a) {
        // 다 담을 수 있음.
        if (c1 + c2 <= a && addItem(c1 + c2, 0, c3)) {
          q.push([c1 + c2, 0, c3]);
        }
        // 넘침
        else if (c1 + c2 > a) {
          if (addItem(a, c2 - (a - c1), c3)) q.push([a, c2 - (a - c1), c3]);
        }
      }

      if (c3 < c) {
        // 다 담을 수 있음.
        if (c2 + c3 <= c && addItem(c1, 0, c2 + c3)) {
          q.push([c1, 0, c2 + c3]);
        }
        // 넘침
        else if (c2 + c3 > c) {
          if (addItem(c1, b - (c - c3), c)) q.push([c1, b - (c - c3), c]);
        }
      }
    }

    if (c1 !== 0) {
      if (c2 < b) {
        // 다 담을 수 있음.
        if (c1 + c2 <= b && addItem(0, c1 + c2, c3)) {
          q.push([0, c1 + c2, c3]);
        }
        // 넘침
        else if (c1 + c2 > b) {
          if (addItem(c1 - (b - c2), b, c3)) q.push([c1 - (b - c2), b, c3]);
        }
      }

      if (c3 < c) {
        // 다 담을 수 있음.
        if (c1 + c3 <= c && addItem(0, c2, c1 + c3)) {
          q.push([0, c2, c1 + c3]);
        }
        // 넘침
        else if (c1 + c3 > c) {
          if (addItem(c1 - (c - c3), c2, c)) q.push([1 - (c - c3), c2, c]);
        }
      }
    }
  }
}

function addItem(n1, n2, n3) {
  const t1 = n1 < 10 ? `00${n1}` : n1 < 100 ? `0${n1}` : `${n1}`;
  const t2 = n2 < 10 ? `00${n2}` : n2 < 100 ? `0${n2}` : `${n2}`;
  const t3 = n3 < 10 ? `00${n3}` : n3 < 100 ? `0${n3}` : `${n3}`;

  const key = `${t1}${t2}${t3}`;

  if (visited.has(key)) return false;
  else {
    visited.add(key);
    return true;
  }
}

console.log([...result].sort((a, b) => a - b).join(" "));
