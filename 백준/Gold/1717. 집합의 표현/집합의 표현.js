const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", function (line) {
  input.push(line);
}).on("close", function () {
  solution(input);
  process.exit();
});

function solution(input) {
  const [N, M] = input[0].split(" ").map(Number);
  const indexArr = Array.from({ length: N + 1 }, (_, idx) => [idx]);
  let answer = [];

  for (let i = 1; i <= M; i++) {
    const [commnad, n1, n2] = input[i].split(" ").map(Number);

    if (commnad === 0) {
      union(n1, n2);
    } else {
      if (findParent(n1) === findParent(n2)) answer.push("YES");
      else answer.push("NO");
    }
  }

  function findParent(num) {
    if (indexArr[num] === num) return num;
    indexArr[num] = findParent(indexArr[num]);
    return indexArr[num];
  }

  function union(a, b) {
    const aParent = findParent(a);
    const bParent = findParent(b);

    if (aParent !== bParent) indexArr[aParent] = bParent;
  }

  console.log(answer.join("\n").trimEnd());
}
