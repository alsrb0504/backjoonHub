const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

let [num, P] = input[0].split(" ").map(Number);

const map = new Map();
map.set(num, 1);

while (true) {
  const curr = num.toString().split("");
  const sum = curr.reduce((acc, cur) => acc + cur ** P, 0);

  if (map.has(sum)) {
    //
    const cnt = map.get(sum);
    if (cnt === 3) break;

    map.set(sum, cnt + 1);
  } else {
    map.set(sum, 1);
  }

  num = sum;
}

const answer = [...map].filter((el) => el[1] === 1).length;

console.log(answer);
