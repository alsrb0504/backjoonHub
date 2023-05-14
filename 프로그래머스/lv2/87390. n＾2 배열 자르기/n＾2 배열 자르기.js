function solution(n, left, right) {
  const answer = [];

  for (let i = left; i <= right; i++) {
    if (i % n === n - 1) answer.push(n);
    else {
      const quotient = Math.floor(i / n);
      const reminder = i % n;

      if (reminder + 1 <= quotient) {
        answer.push(reminder + 1 + quotient - reminder);
      } else {
        answer.push(reminder + 1);
      }
    }
  }

  return answer;
}
