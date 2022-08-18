const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);

const list = [];

for (let i = 1; i <= N; i++) {
  const [name, k, e, m] = input[i].split(" ");
  list.push([name, Number(k), Number(e), Number(m)]);
}

list.sort((a, b) => {
  if (a[1] === b[1]) {
    if (a[2] === b[2]) {
      if (a[3] === b[3]) {
        // return b[0] - a[0];
        if (a[0] > b[0]) return 1;
        else if (a[0] < b[0]) return -1;
        else return 0;
      } else return b[3] - a[3];
    } else {
      return a[2] - b[2];
    }
  } else {
    return b[1] - a[1];
  }
});

let answer = "";
list.forEach((info) => (answer += `${info[0] + "\n"}`));
console.log(answer.trimEnd());