function solution(A, B) {
  var answer = 0;

  const size = A.length;

  A.sort((a, b) => a - b);
  B.sort((a, b) => a - b);

  for (let i = 0, a_idx = 0; i < size; i++) {
    const curr = A[a_idx];

    if (curr < B[i]) {
      a_idx++;
      answer++;
    }
  }

  return answer;
}
