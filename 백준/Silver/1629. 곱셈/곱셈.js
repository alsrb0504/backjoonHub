const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [A, B, C] = input[0].split(" ").map(BigInt);

console.log(pow(A, Number(B)).toString());

function pow(n, e) {
  // mod 연산된 값이 리턴.
  if (e === 1) return n % C;

  const tmp = pow(n, Math.floor(e / 2));

  if (e % 2 === 1) {
    // 홀수
    return ((((tmp * tmp) % C) * A) % C) % C;
  } else {
    // 짝수
    return (tmp * tmp) % C;
  }
}
