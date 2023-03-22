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
 
      if (N % 2 === 0) {
        return `${N / 2} ${N / 2}`;
      }
 
      let a = Math.floor(N / 2);
      let b = a + 1;
 
      let sum_a = CalcNum(a);
      let sum_b = CalcNum(b);
 
      if (Math.abs(sum_a - sum_b) <= 1) return `${a} ${b}`;
 
      const a_str = a.toString().split("").map(Number);
      const b_str = b.toString().split("").map(Number);
 
      const a_stack = [];
      const b_stack = [];
 
      if (a_str.length === b_str.length) {
        a_stack.push(a_str[0]);
        b_stack.push(b_str[0]);
      } else {
        b_stack.push(b_str[0]);
        a_str.unshift(0);
      }
 
      for (let i = 1; i < b_str.length; i++) {
        //
        if (a_str[i] === b_str[i]) {
          a_stack.push(a_str[i]);
          b_stack.push(b_str[i]);
        } else {
          const [ls, gt] = classify(a_str[i], b_str[i]);
 
          if (CalcArray(a_stack) < CalcArray(b_stack)) {
            a_stack.push(gt);
            b_stack.push(ls);
          } else {
            a_stack.push(ls);
            b_stack.push(gt);
          }
        }
      }
 
      return `${a_stack.join("")} ${b_stack.join("")}`;
 
      function CalcNum(num) {
        let sum = 0;
 
        if (num < 10) return num;
 
        while (num > 0) {
          sum += num % 10;
          num = Math.floor(num / 10);
        }
 
        return sum;
      }
 
      function CalcArray(arr) {
        return arr.reduce((acc, cur) => acc + cur, 0);
      }
 
      function classify(n1, n2) {
        const tmp = n1 + n2;
 
        const half = Math.floor(tmp / 2);
 
        if (tmp % 2 === 0) {
          return [half, half];
        } else {
          return [half, half + 1];
        }
      }
    }
 
    process.exit();
  });