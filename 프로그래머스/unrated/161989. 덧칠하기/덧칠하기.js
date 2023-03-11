function solution(n, m, section) {
  let answer = 0;
  let curIdx = 0;

  section.forEach((pos) => {
    if (curIdx < pos) {
      answer++;
      curIdx = pos + m - 1;
    }
  });

  return answer;
}
