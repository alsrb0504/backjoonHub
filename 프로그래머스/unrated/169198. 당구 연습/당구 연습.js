function solution(m, n, startX, startY, balls) {
  const answer = [];

  const [W, H] = [m, n];

  for (let [x, y] of balls) {
    answer.push(calcDist(x, y));
  }

  return answer;

  function calcDist(x, y) {
    //
    if (y === startY) {
      const minDist = Math.min(y, H - y);

      const result = Math.abs(startX - x) ** 2 + (minDist * 2) ** 2;

      if (x > startX) {
        return Math.min((startX * 2 + (x - startX)) ** 2, result);
      } else {
        return Math.min(((W - startX) * 2 + (startX - x)) ** 2, result);
      }
    }

     if (x === startX) {
      const minDist = Math.min(x, W - x);
      const result = Math.abs(startY - y) ** 2 + (minDist * 2) ** 2;

      if (y > startY) {
        return Math.min((startY * 2 + (y - startY)) ** 2, result);
      } else {
        return Math.min(((H - startY) * 2 + (startY - y)) ** 2, result);
      }
    }

    const minDistY =
      Math.abs(startY - y) ** 2 +
      Math.min(W, x + startX, W - x + W - startX) ** 2;
    const minDistX =
      Math.abs(startX - x) ** 2 +
      Math.min(H, y + startY, H - y + H - startY) ** 2;

    return Math.min(minDistX, minDistY);
  }
}