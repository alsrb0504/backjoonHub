const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const roads = input[1].split(" ").map(Number);
const fuels = input[2].split(" ").map(Number);

let answer = 0;
let min_fuel = input[2][0];

for (let i = 0; i < N - 1; i++) {
  min_fuel = min_fuel > fuels[i] ? fuels[i] : min_fuel;
  answer += min_fuel * roads[i];
}

console.log(answer);