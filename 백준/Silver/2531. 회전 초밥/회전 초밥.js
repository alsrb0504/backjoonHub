const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, _, sequence, couponNum] = input[0].split(" ").map(Number);
let dishes = input.slice(1, 1 + N).map(Number);
dishes = [...dishes, ...dishes];
const dishMap = new Map();
const dishSet = new Set([...dishes]);

let answer = 0;

for (let i = 0; i < sequence; i++) {
  const currDish = dishes[i];
  dishMap.set(currDish, dishMap.has(currDish) ? dishMap.get(currDish) + 1 : 1);
}

answer = Math.max(answer, validateDishes());

for (let i = sequence; i < dishes.length; i++) {
  const prevDish = dishes[i - sequence];
  const currDish = dishes[i];

  if (dishMap.get(prevDish) === 1) {
    dishMap.delete(prevDish);
  } else {
    dishMap.set(prevDish, dishMap.get(prevDish) - 1);
  }

  dishMap.set(currDish, dishMap.has(currDish) ? dishMap.get(currDish) + 1 : 1);

  answer = Math.max(answer, validateDishes());
}

console.log(answer);

function validateDishes() {
  dishMap.set(
    couponNum,
    dishMap.has(couponNum) ? dishMap.get(couponNum) + 1 : 1
  );

  const size = dishMap.size;

  if (dishMap.get(couponNum) === 1) {
    dishMap.delete(couponNum);
  } else {
    dishMap.set(couponNum, dishMap.get(couponNum) - 1);
  }

  return size;
}
