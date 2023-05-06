function solution(n) {
  const arr = Array.from({ length: n }, () => new Array(n).fill(0));

  // (3가지) 방향 : 아래로, 옆으로, 위로
  const dir = [
    [1, 0],
    [0, 1],
    [-1, -1],
  ];

  let [currY, currX] = [-1, 0];
  let curr = 1;

  for (let i = 0; i < n; i++) {
    const [moveY, moveX] = dir[i % 3];
    for (let j = 0; j < n - i; j++) {
      [currY, currX] = [currY + moveY, currX + moveX];
      arr[currY][currX] = curr++;
    }
  }

  const answer = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      answer.push(arr[i][j]);
    }
  }

  return answer;
}