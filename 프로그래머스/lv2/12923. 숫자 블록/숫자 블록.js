function solution(begin, end) {
  const SIZE = end - begin + 1;
  const MAX_NUM = 1e7;
  const answer = new Array(SIZE).fill(1);

  for (let i = 0; i < SIZE; i++) {
    answer[i] = getMaxDivider(begin + i);
  }

  if (begin === 1) answer[0] = 0;

  return answer;

  function getMaxDivider(num) {
    let max = 1;
    const sqrt = Math.sqrt(num);

    // 2 ~ 제곱근까지 (그리고 10^7)까지 나눠보며
    // 1과 자기 자신을 제외한 최대 약수 찾음
    // for (let i = 2; i <= sqrt && i <= MAX_NUM; i++) {
    for (let i = 2; i <= sqrt; i++) {
      if (num % i === 0) {
        if (num / i <= MAX_NUM) return num / i;
        else {
          max = Math.max(max, i);
        }
      }
    }

    return max;
  }
}