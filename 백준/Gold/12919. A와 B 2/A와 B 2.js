const { exit } = require("process");

const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

let str = input[0].trimEnd();
const end = input[1].trimEnd();

abGame(str, end);

function abGame(s, t) {
  if (s === t) {
    console.log(1);
    exit(0);
  }

  if (s.length === t.length) {
    return;
  }

  // 마지막이 'A'로 끝나면
  if (t[t.length - 1] === "A") {
    const next = t.slice(0, t.length - 1);
    abGame(s, next);
  }

  if (t[0] === "B") {
    const next = t
      .split("")
      .reverse()
      .join("")
      .slice(0, t.length - 1);

    abGame(s, next);
  }
}

console.log(0);