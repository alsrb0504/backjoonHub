const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);

const data = input.slice(1, 1 + N).map((el) => el.trimEnd());

data.sort((a, b) => {
  if (a.length === b.length) {
    const aCnt = compareNum(a);
    const bCnt = compareNum(b);

    if (aCnt === bCnt) {
      return a > b ? 1 : -1;
    }

    return aCnt - bCnt;
  }
  return a.length - b.length;
});

console.log(data.join("\n"));

function compareNum(a) {
  let aCnt = 0;

  for (const ch of a) {
    if (ch >= "0" && ch <= "9") {
      aCnt += Number(ch);
    }
  }

  return aCnt;
}
