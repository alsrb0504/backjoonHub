const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

function solution(data) {
  const dist = Number(data[0]);
  const [length, D] = data[1].split(" ").map(Number);
  let cammo = Number(data[2]);
  const zombies = [-1, ...data.slice(3, 3 + dist).map(Number)];

  const bomb = [-1];
  let bomb_cnt = 0;
  let bomb_idx = 0;

  for (let i = 1; i <= dist; i++) {
    let empty = 0;

    // console.log(bomb[bomb_idx]);
    // console.log(`bomb_cnt = ${bomb_cnt}`);

    if (i < length) empty = length - i;

    const cur_D = D * (length - bomb_cnt - empty);

    // console.log(`i = ${i}, zombies[i] = ${zombies[i]}, cur_D = ${cur_D}`);

    if (zombies[i] > cur_D) {
      // console.log("폭탄 인풋 : ", i, i + length - 1);

      if (cammo === 0) return false;

      cammo--;
      bomb_cnt++;
      // bomb.push(i + length);
      bomb.push(i + length - 1);
    }

    // console.log();

    // 처음 한 번은 해줘야 함.
    if (bomb_cnt > 0 && bomb[bomb_idx] === -1) {
      bomb_idx++;
    }

    if (bomb[bomb_idx] === i) {
      bomb_cnt--;
      bomb_idx++;
    }

    if (i === bomb[bomb_idx]) bomb_cnt--;
  }

  return true;
}

console.log(solution(input) ? "YES" : "NO");