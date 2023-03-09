function solution(word) {
  const chars = ["A", "E", "I", "O", "U"];
  const arr = [];
  const stack = [];

  for (let i = 1; i <= 5; i++) dfs(0, i);
  arr.sort();

  return arr.findIndex((val) => val === word) + 1;

  function dfs(cnt, end) {
    if (cnt === end) {
      arr.push(stack.join(""));
      return;
    }

    chars.forEach((ch) => {
      stack.push(ch);
      dfs(cnt + 1, end);
      stack.pop();
    });
  }
}