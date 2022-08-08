const readFileSyncAddress = '/dev/stdin';

let input = require("fs").readFileSync(readFileSyncAddress).toString();

const N = Number(input);
const map = Array.from({ length: N }, () => new Array(2 * N - 1).fill(" "));

function printStar(size, y, x) {
  if (size === 3) {
    map[y][x] = "*";
    map[y][x + 1] = "*";
    map[y][x + 2] = "*";
    map[y][x + 3] = "*";
    map[y][x + 4] = "*";
    map[y - 1][x + 1] = "*";
    map[y - 1][x + 3] = "*";
    map[y - 2][x + 2] = "*";

    return;
  }

  printStar(size / 2, y - size / 2, x + size / 2);
  printStar(size / 2, y, x);
  printStar(size / 2, y, x + size);
}

printStar(N, N - 1, 0);

let result = "";
map.forEach((line) => (result += line.join("") + "\n"));

console.log(result.trimEnd());
