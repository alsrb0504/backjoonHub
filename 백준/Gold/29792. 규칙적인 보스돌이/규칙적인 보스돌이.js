const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, M, K] = input[0].split(" ").map(Number);
const characters = input.slice(1, 1 + N).map(Number);

const bosses = input
  .slice(1 + N, 1 + N + K)
  .map((el) => el.split(" ").map(Number))
  .sort((a, b) => b[1] - a[1]);

const pickedCharacters = characters.sort((a, b) => b - a).slice(0, M);
let answer = 0;

pickedCharacters.forEach((power) => {
  answer += dfs(0, "", power);
});

console.log(answer);

function dfs(idx, acc, power) {
  if (idx === K) {
    // power
    // let ableTime = 899; 가 아니라 총 900초가 맞음
    let ableTime = 900;
    let coins = 0;

    //
    for (let i = 0; i < K; i++) {
      if (acc[i] === "1") {
        // 남은 시간이 1초이면 더이상 새로운 보스에 도전할 수 없음
        if (ableTime === 1) return coins;

        const needTime = Math.ceil(bosses[i][0] / power);

        if (ableTime < needTime) return 0;

        ableTime -= needTime;
        coins += bosses[i][1];
      }
    }

    return coins;
  }

  return Math.max(
    dfs(idx + 1, acc + "0", power),
    dfs(idx + 1, acc + "1", power)
  );
}
