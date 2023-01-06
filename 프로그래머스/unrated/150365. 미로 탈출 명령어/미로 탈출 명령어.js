function solution(n, m, x, y, r, c, k) {
  // d, l, r, u 순으로 우선 순위가 높음.

  let answer = [];
  // const board = Array.from({ length: n }, () => new Array(m).fill(""));

  let [cy, cx] = [x, y];
  const [ey, ex] = [r, c];

  // console.table(board);

  // let move_cnt = 0;
  let move_cnt = 1;

  while (move_cnt <= k) {
    // console.log(answer);
    if (isDown(cy, cx, k - move_cnt)) {
      cy++;
      move_cnt++;
      answer.push("d");
      continue;
    }

    if (isLeft(cy, cx, k - move_cnt)) {
      cx--;
      move_cnt++;
      answer.push("l");
      continue;
    }

    if (isRight(cy, cx, k - move_cnt)) {
      cx++;
      move_cnt++;
      answer.push("r");
      continue;
    }

    if (isUp(cy, cx, k - move_cnt)) {
      cy--;
      move_cnt++;
      answer.push("u");
      continue;
    }

    return "impossible";
  }

  // 아래로 이동 가능
  function isDown(dy, dx, cnt) {
    const [py, px] = [dy + 1, dx];
    const dist = Math.abs(ey - py) + Math.abs(ex - px);
    const diff = cnt - dist;

    console.log(`py = ${py}, px = ${px}`);
    console.log(`dist = ${dist}`);
    console.log(`diff = ${diff}`);

    // 불가능 : 범위 벗어남.
    if (py > n) return false;
    // 불가능 : 최단 거리보다 작음.
    if (diff < 0) return false;
    // 불가능 : 갈 수 없음.
    if (diff % 2 === 1) return false;

    return true;
  }

  // 왼쪽으로 이동 가능
  function isLeft(dy, dx, cnt) {
    const [py, px] = [dy, dx - 1];
    const dist = Math.abs(ey - py) + Math.abs(ex - px);
    const diff = cnt - dist;

    // 불가능 : 범위 벗어남.
    if (px <= 0) return false;
    // 불가능 : 최단 거리보다 작음.
    if (diff < 0) return false;
    // 불가능 : 갈 수 없음.
    if (diff % 2 === 1) return false;

    return true;
  }

  // 오른쪽으로 이동 가능
  function isRight(dy, dx, cnt) {
    const [py, px] = [dy, dx + 1];
    const dist = Math.abs(ey - py) + Math.abs(ex - px);
    const diff = cnt - dist;

    // 불가능 : 범위 벗어남.
    if (px > m) return false;
    // 불가능 : 최단 거리보다 작음.
    if (diff < 0) return false;
    // 불가능 : 갈 수 없음.
    if (diff % 2 === 1) return false;

    return true;
  }

  // 위로 이동 가능
  function isUp(dy, dx, cnt) {
    const [py, px] = [dy - 1, dx];
    const dist = Math.abs(ey - py) + Math.abs(ex - px);
    const diff = cnt - dist;

    // 불가능 : 범위 벗어남.
    if (py <= 0) return false;
    // 불가능 : 최단 거리보다 작음.
    if (diff < 0) return false;
    // 불가능 : 갈 수 없음.
    if (diff % 2 === 1) return false;

    return true;
  }

  return answer.join("");
}