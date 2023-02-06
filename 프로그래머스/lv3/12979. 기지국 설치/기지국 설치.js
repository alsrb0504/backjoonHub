
function solution(n, stations, w) {
  let answer = 0;

  const coverage = w * 2 + 1;
  const length = stations.length;

  let prev = 0;

  for (let i = 0; i < length; i++) {
    const left = stations[i] - w;
    const right = stations[i] + w;

    const rest = left - prev - 1;

    answer += Math.ceil(rest / coverage);
    prev = right;
  }

  const last = n - prev;
  answer += Math.ceil(last / coverage);

  return answer;
}
