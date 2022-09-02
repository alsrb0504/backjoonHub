const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [x1, y1, z1, x2, y2, z2, x3, y3, z3] = input[0].split(" ").map(Number);

let A = [x1, y1, z1];
let B = [x2, y2, z2];
const C = [x3, y3, z3];

function getDist(a, b) {
  const [ax, ay, az] = a;
  const [bx, by, bz] = b;

  return Math.sqrt(
    Math.pow(ax - bx, 2) + Math.pow(ay - by, 2) + Math.pow(az - bz, 2)
  );
}

function getMid(a, b) {
  const [ax, ay, az] = a;
  const [bx, by, bz] = b;

  const midX = (ax + bx) / 2;
  const midY = (ay + by) / 2;
  const midZ = (az + bz) / 2;

  return [midX, midY, midZ];
}

let answer = Infinity;

while (true) {
  const mid = getMid(A, B);

  const MC = getDist(mid, C);
  const AC = getDist(A, C);
  const BC = getDist(B, C);

  if (Math.abs(answer - MC) <= 0.000001) {
    console.log(answer.toFixed(10));
    break;
  }

  answer = Math.min(answer, MC);

  if (AC >= BC) {
    A = mid;
  } else {
    B = mid;
  }
}