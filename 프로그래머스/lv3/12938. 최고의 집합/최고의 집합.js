function solution(n, s) {
  if (n > s) return [-1];

  if (s % n === 0) {
    const div = s / n;
    return new Array(n).fill(div);
  } else {
    const div = Math.floor(s / n);
    const rest = s % n;

    const arr = [];

    for (let i = 0; i < n; i++) {
      if (i < rest) arr.push(div + 1);
      else arr.push(div);
    }

    return arr.reverse();
  }
}