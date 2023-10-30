const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const stack = []; // {score, time}[]
const works = input.slice(1, 1 + N).map((el) => el.split(" ").map(Number));
let answer = 0;

for (const work of works) {
  let [idx, score, time] = work;

  if (idx === 0) {
    // 현재 할 일이 있는 경우
    if (stack.length) {
      const { score, time } = stack.pop();

      if (time === 1) {
        answer += score;
      } else {
        stack.push({ score, time: time - 1 });
      }
    }
  }
  // 새로운 일이 등장
  else {
    // 바로 끝나면 점수 획득
    if (time === 1) {
      answer += score;
    }
    // 그렇지 않다면
    else {
      stack.push({ score, time: time - 1 });
    }
  }
}

console.log(answer);
