const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const [power_a, price_a, power_b, price_b] = input[1].split(" ").map(Number);

const [x, y] = solution();
console.log(`${x} ${y}`);

function solution() {
  let [x, y, power_max] = [0, 0, 0];

  const boundary = Math.floor(N / price_a);

  for (let i = 0; i <= boundary; i++) {
    let tmp_price = N;
    let tmp_power = 0;

    tmp_price -= i * price_a;
    tmp_power += i * power_a;

    const tmp_b = Math.floor(tmp_price / price_b);
    tmp_power += tmp_b * power_b;

    if (power_max < tmp_power) {
      x = i;
      y = tmp_b;
      power_max = tmp_power;
    }
  }

  return [x, y];
}