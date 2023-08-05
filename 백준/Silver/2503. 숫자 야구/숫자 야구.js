const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const nums = new Array(1000).fill(true);
let answer = 0;

const conditions = input.slice(1, 1 + N).map((info) => {
  const [question, strike, ball] = info.split(" ").map(Number);
  return {
    question,
    strike,
    ball,
    set: new Set(String(question).split("").map(Number)),
  };
});

for (let i = 123; i <= 987; i++) {
  const curr = i;
  const numSet = new Set(i.toString().split("").map(Number));

  if (numSet.size !== 3 || numSet.has(0)) {
    nums[i] = false;
    continue;
  }

  const currNum = String(curr).split("").map(Number);

  conditions.forEach((condition) => {
    const questionNum = condition.question.toString().split("").map(Number);

    let [strikeCnt, ballCnt] = [0, 0];

    for (let i = 0; i < 3; i++) {
      if (currNum[i] === questionNum[i]) strikeCnt++;

      if (condition.set.has(currNum[i]) && currNum[i] !== questionNum[i])
        ballCnt++;
    }

    if (!(strikeCnt === condition.strike && ballCnt === condition.ball))
      nums[i] = false;
  });
}

for (let i = 123; i <= 987; i++) {
  if (nums[i]) answer++;
}

console.log(answer);
