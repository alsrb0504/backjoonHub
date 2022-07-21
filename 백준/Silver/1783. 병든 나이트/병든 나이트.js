const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const [h, w] = input;

if (w >= 7 && h >= 3) {
  console.log(w - 2);
} else if ((w === 6 || w === 5) && h >= 3) {
  console.log(4);
} else if (w <= 4 && h >= 3) {
  console.log(w);
} else if (h === 1) {
  console.log(1);
} else if (h === 2 && w >= 3) {
  const calced = Math.floor((w + 1) / 2);
  console.log(calced > 4 ? 4 : calced);
} else {
  console.log(1);
}