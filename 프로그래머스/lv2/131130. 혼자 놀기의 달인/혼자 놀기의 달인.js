
function solution(cards) {
  cards.unshift(-1);
  const visited = new Array(cards.length + 1).fill(false);
  const result = [];

  for (let i = 1; i < cards.length; i++) {
    if (!visited[i]) {
      result.push(dfs(i, 0));
    }
  }

  result.sort((a, b) => b - a);

  return result.length === 1 ? 0 : result[0] * result[1];


  function dfs(currNum, itemCnt) {
    const next = cards[currNum];

    if (visited[next]) return itemCnt;

    visited[next] = true;
    return dfs(next, itemCnt + 1);
  }
}