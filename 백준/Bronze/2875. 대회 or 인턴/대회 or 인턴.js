const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trim()
  .split(" ");

const [W, M, K] = input.map(Number);

// 여자 2명 남자 1명 짝
// K 명은 빼야함.
// 여자를 2로 나누고 남자와 쌍이 되는 최대 경우를 구함
// 남는 사람의 수
// 3 5 => 1 1 => 5명 남음
// 만약 남는 사람 >= K 그냥 출력
// 남는 사람 < K 면,
// K - 남는 사람 구한 다음.
// 한 팀당 3명이므로 나머지 - 3 하면 됨.

let womans = W;
let mans = M;
let maxTeam = 0;

while (womans > 1 && mans > 0) {
  womans -= 2;
  mans -= 1;
  maxTeam++;
}

let rest = womans + mans;
let intern = K;

// console.log(womans, mans, maxTeam);

while (intern > 0) {
  if (rest > intern) {
    break;
  } else {
    // 남은 거 처리
    if (rest !== 0) {
      intern -= rest;
      rest = 0;
    } else {
      if (maxTeam > 0) {
        maxTeam--;
        intern -= 3;
      } else {
        console.log(0);
        return;
      }
    }
  }

  // console.log(womans, mans, maxTeam);
  // console.log(intern, rest);
}

console.log(maxTeam);