const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const std = input[1].trimEnd().split("").sort().join("");
const stdLength = std.length;
const words = input.slice(2, 2 + N - 1).map((el) => el.trimEnd());
let answer = 0;

for (const word of words) {
  const diff = Math.abs(stdLength - word.length);

  if (diff > 1) continue;

  // 완전 같거나 하나만 달라야 함
  if (diff === 0) {
    const wordArr = word.split("").sort();

    // 일치
    if (wordArr.join("") === std) {
      answer++;
      continue;
    }

    // 하나만 변경
    let diffCnt = 0;
    const visited = new Array(stdLength).fill(false);

    for (const ch of wordArr) {
      let isPossible = false;

      for (let i = 0; i < stdLength; i++) {
        if (!visited[i] && std[i] === ch) {
          visited[i] = true;
          isPossible = true;
          break;
        }
      }

      if (!isPossible) diffCnt++;
    }

    if (diffCnt === 1) {
      answer++;
    }
  }

  // 하나 더하거나 빼야함
  // 작은 단어가 큰 단에 모두 포함되어야 함
  const [longer, shorter] = stdLength > word.length ? [std, word] : [word, std];

  if (check(longer, shorter)) {
    answer++;
  }
}

console.log(answer);

function check(longer, shorter) {
  const visited = new Array(longer.length).fill(false);

  for (const ch of shorter) {
    let isPossible = false;

    for (let i = 0; i < longer.length; i++) {
      if (!visited[i] && longer[i] === ch) {
        visited[i] = true;
        isPossible = true;
        break;
      }
    }

    if (!isPossible) return false;
  }

  return true;
}
