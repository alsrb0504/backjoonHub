const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const input = [];
 
readline
  .on("line", (line) => {
    input.push(line);
  })
  .on("close", () => {
    const tc = Number(input[0]);
    const answer = [];
 
    for (let i = 0; i < tc; i++) {
      answer.push(solution(i));
    }
 
    console.log(answer.join("\n"));
 
    function solution(line) {
      const N = Number(input[line + 1]);
 
      if (N === 1) {
        return "Yes\n1 2";
      }
 
      if (N % 2 === 0) {
        return "No";
      }
 
      const minus = new Array(N).fill(0);
      const plus = new Array(N).fill(0);
 
      for (let i = 1; i <= N; i++) {
        minus[i - 1] = i;
 
        plus[i - 1] = i + N;
      }
 
      const result = [];
      let target = 2 * N - Math.floor(N / 2) + 1;
 
      for (let i = 0; i < N; i++) {
        if (i % 2 === 0) {
          const a = minus[Math.floor(i / 2)];
          result.push(`${a} ${target - a}`);
        } else {
          const b = plus[Math.floor(i / 2)];
          result.push(`${b} ${target - b}`);
        }
 
        target++;
      }
 
      return `Yes\n${result.join("\n")}`;
    }
 
    process.exit();
  });