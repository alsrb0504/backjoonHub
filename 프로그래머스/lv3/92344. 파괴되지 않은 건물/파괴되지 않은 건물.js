
function solution(board, skill) {
  let answer = 0;

  const H = board.length;
  const W = board[0].length;

  const sums = Array.from({ length: H + 1 }, () => new Array(W + 1).fill(0));

  skill.forEach((el) => {
    let [cond, sy, sx, ey, ex, degree] = el;

    if (cond === 1) degree = -degree;

    sums[sy][sx] += degree;
    sums[sy][ex + 1] += -degree;
    sums[ey + 1][sx] += -degree;
    sums[ey + 1][ex + 1] += degree;
  });

  for (let i = 0; i < H; i++) {
    for (let j = 1; j < W; j++) {
      sums[i][j] += sums[i][j - 1];
    }
  }

  for (let i = 0; i < W; i++) {
    for (let j = 1; j < H; j++) {
      sums[j][i] += sums[j - 1][i];
    }
  }

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (board[i][j] + sums[i][j] > 0) answer++;
    }
  }

  return answer;
}
