const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const belt = input[1].split(" ").map(Number);
const END = 2 * N;
let answer = 0;
let startIdx = 0;

let robotQueue = [];

while (!countZeroCnt()) {
  // 정답(진행 횟수) 증가
  answer++;

  // 1. 벨트와 로봇 위치 업데이트
  // 벨트 회전 => 시작 위치 갱신, 로봇 이동 가능한지, 로봇 제거 가능한지
  // startIdx = startIdx === 0 ? END - 1 : startIdx - 1;

  let tmp = belt.at(-1);
  for (let i = END - 1; i > 0; i--) {
    belt[i] = belt[i - 1];
  }
  belt[0] = tmp;

  // console.log(`[Log] startIdx = ${startIdx}`);

  // 내리는 위치가 아니라면 값 업데이트
  for (let i = 0; i < robotQueue.length; i++) {
    const curr = robotQueue[i];
    const next = curr + 1 === END ? 0 : curr + 1;

    // 내리는 위치라면 내림 처리
    if (next === N - 1) robotQueue[i] = -1;
    else robotQueue[i] = next;
  }
  robotQueue = robotQueue.filter((val) => val !== -1);

  // 2. 로봇 이동
  // 다음칸의 내구도가 남아있고 로봇이 존재하지 않는다면 로봇 이동
  for (let i = 0; i < robotQueue.length; i++) {
    const curr = robotQueue[i];
    const next = curr + 1 === END ? 0 : curr + 1;

    // // 내리는 위치라면 내림 처리 및 이어서 진행
    // if (next === N - 1) {
    //   //
    //   belt[next]--;

    //   robotQueue[i] = -1;
    //   continue;
    // }

    if (belt[next] > 0 && !robotQueue.some((val) => val === next)) {
      robotQueue[i] = next;
      belt[next]--;

      if (next === N - 1) robotQueue[i] = -1;
    }
  }
  robotQueue = robotQueue.filter((val) => val !== -1);

  // 3. 로봇 올리기
  // 현재 시작위치에 로봇을 올릴 수 있다면 로봇을 올림
  if (belt[0] > 0 && !robotQueue.some((val) => val === 0)) {
    robotQueue.push(0);
    belt[0]--;
  }

  // console.table(robotQueue);
  // console.table(belt);
}

console.log(answer);

/** 내구도가 0인 칸의 개수가 K개 이상인지 판별하는 함수 */
function countZeroCnt() {
  let zeroCnt = 0;
  for (let i = 0; i < END; i++) {
    if (belt[i] <= 0) zeroCnt++;
  }

  return zeroCnt >= K ? true : false;
}
