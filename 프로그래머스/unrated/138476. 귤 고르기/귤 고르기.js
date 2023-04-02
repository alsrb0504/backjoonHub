function solution(k, tangerine) {
  const TOTAL = tangerine.length;
  const map = new Map();

  for (let num of tangerine) {
    map.set(num, map.has(num) ? map.get(num) + 1 : 1);
  }

  const items = [...map].sort((a, b) => a[1] - b[1]);

  let curr_cnt = TOTAL;
  let remove_cnt = 0;

  for (let [_, cnt] of items) {
    if (curr_cnt - cnt >= k) {
      remove_cnt++;

      curr_cnt -= cnt;
    }
  }

  return items.length - remove_cnt;
}
