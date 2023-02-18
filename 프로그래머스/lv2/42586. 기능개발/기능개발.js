function solution(progresses, speeds) {
  const answer = [];
  const N = progresses.length;

  let done_idx = 0;

  while (done_idx < N) {
    for (let i = done_idx; i < N; i++) {
      progresses[i] += speeds[i];
    }

    let cnt = 0;

    if (progresses[done_idx] >= 100) {
      for (let i = done_idx; i < N; i++) {
        if (progresses[i] < 100) {
          break;
        }

        cnt++;
      }
    }

    if (cnt > 0) {
      answer.push(cnt);
      done_idx += cnt;
    }
  }

  return answer;
}