function solution(n, m, x, y, r, c, k) {
  const FAIL = "impossible";
  const [DOWN, LEFT, RIGHT, UP] = ["d", "l", "r", "u"];
  const dir = {
    d: [1, 0],
    l: [0, -1],
    r: [0, 1],
    u: [-1, 0],
  };
  const answer = [];
  let [curY, curX] = [x, y];
  let [endY, endX] = [r, c];
  let moveCnt = 0;

  // d, l, r, u 순으로 우선 순위가 높음.

  while (moveCnt < k) {
    const dist = calcDist();
    const rest = k - moveCnt;

    // console.log(`[Log] curY = ${curY}, curX = ${curX}`);
    // console.log(`[Log] moveCnt = ${moveCnt}`);

    // 종료 : 이동거리 부족 || 도달 불가능
    // if (dist > rest) return FAIL;
    if (dist > rest || (dist < rest && (rest - dist) % 2 !== 0)) return FAIL;

    // 최단 거리로 찾아가야 함
    if (dist === rest) {
      let nextDir;
      //
      if (curY < endY) nextDir = DOWN;
      else if (curX > endX) nextDir = LEFT;
      else if (curX < endX) nextDir = RIGHT;
      else nextDir = UP;

      answer.push(nextDir);
      const [ny, nx] = dir[nextDir];
      [curY, curX] = [curY + ny, curX + nx];
    }
    // 더 움직일 수 있음 => d, l, r, u 순으로 남는 방향 이동
    else {
      let nextDir;

      if (isDown()) nextDir = DOWN;
      else if (isLeft()) nextDir = LEFT;
      else if (isRight()) nextDir = RIGHT;
      else if (isUp()) nextDir = UP;

      answer.push(nextDir);
      const [ny, nx] = dir[nextDir];
      [curY, curX] = [curY + ny, curX + nx];
    }

    moveCnt++;

    // console.log(answer);
    // console.log();
  }

  return answer.join("");

  function isDown() {
    if (curY + 1 <= n) return true;
    return false;
  }

  function isLeft() {
    if (curX - 1 > 0) return true;
    return false;
  }

  function isRight() {
    if (curX + 1 <= m) return true;
    return false;
  }

  function isUp() {
    if (curY - 1 > 0) return true;
    return false;
  }

  function calcDist() {
    return Math.abs(curY - endY) + Math.abs(curX - endX);
  }
}