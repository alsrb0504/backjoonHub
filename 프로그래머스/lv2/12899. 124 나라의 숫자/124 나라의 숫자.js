
function solution(n) {
  const answer = [];

  while (n > 0) {
    const rest = n % 3;
    n = Math.floor(n / 3);

    if (rest === 0) {
      answer.push(4);
      n--;
    } else {
      answer.push(rest);
    }
  }

  return answer.reverse().join("");
}
