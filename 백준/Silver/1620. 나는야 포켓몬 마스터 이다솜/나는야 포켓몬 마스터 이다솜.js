const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);

const map = new Map();

let answer = "";

for (let i = 0; i < N; i++) {
  const pokemon = input[i].trimEnd();
  map.set(pokemon, i + 1);
  map.set(i + 1, pokemon);
}

for (let i = N; i < N + M; i++) {
  const info = input[i];

  if (Number(info[0]) < 10 && Number(info[0]) > 0) {
    answer += map.get(Number(info)) + "\n";
  } else {
    answer += map.get(info.trimEnd()) + "\n";
  }
}

console.log(answer.trimEnd());