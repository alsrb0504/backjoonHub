function solution(n, costs) {
  let answer = 0;

  const arr = new Array(n).fill(0);
  for (let i = 1; i < n; i++) arr[i] = i;

  costs.sort((a, b) => a[2] - b[2]);

  for (let i = 0; i < costs.length; i++) {
    const [start, dest, cost] = costs[i];

    if (CheckSameParent(start, dest)) continue;

    Union(start, dest);

    answer += cost;
  }

  return answer;

  function GetParent(num) {
    if (num === arr[num]) return num;

    arr[num] = GetParent(arr[num]);
    return arr[num];
  }

  function Union(a, b) {
    const aParent = GetParent(a);
    const bParent = GetParent(b);

    if (aParent < bParent) {
      arr[bParent] = aParent;
    } else {
      arr[aParent] = bParent;
    }
  }

  function CheckSameParent(a, b) {
    const aParent = GetParent(a);
    const bParent = GetParent(b);

    if (aParent === bParent) return true;
    else return false;
  }
}