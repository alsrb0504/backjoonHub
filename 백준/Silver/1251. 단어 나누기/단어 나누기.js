const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n")
  .map((el) => el.trimEnd());

const str = input[0].split("");
const Length = str.length;
const answer = [];

for (let i = 0; i < Length - 1; i++) {
  for (let j = i + 1; j < Length; j++) {
    for (let k = j + 1; k < Length; k++) {
      const first = str.slice(0, j);
      const second = str.slice(j, k);
      const third = str.slice(k);

      const reverse = `${first.reverse().join("")}${second
        .reverse()
        .join("")}${third.reverse().join("")}`;

      answer.push(reverse);
    }
  }
}

console.log(answer.sort()[0]);
