const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const map = new Map();

input[0]
  .split("")
  .map(Number)
  .forEach((el) => {
    map.set(el, map.has(el) ? map.get(el) + 1 : 1);
  });

let answer = 0;

map.forEach((val, key) => {
  if (key !== 6 && key !== 9) {
    answer = Math.max(answer, val);
  } else {
    let tmp = 0;
    if (map.get(6)) tmp += map.get(6);
    if (map.get(9)) tmp += map.get(9);

    // const tmp = map.get(6) + map.get(9);
    answer = Math.max(answer, Math.ceil(tmp / 2));
  }
});

console.log(answer);