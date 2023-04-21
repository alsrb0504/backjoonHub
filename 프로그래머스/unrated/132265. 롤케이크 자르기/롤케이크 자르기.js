function solution(topping) {
  let answer = 0;

  const prevSet = new Set();
  const nextMap = new Map();

  for (let curTopping of topping) {
    nextMap.set(
      curTopping,
      nextMap.has(curTopping) ? nextMap.get(curTopping) + 1 : 1
    );
  }

  for (let curTopping of topping) {
    const nextHasTopping = nextMap.get(curTopping);

    if (nextHasTopping === 1) {
      nextMap.delete(curTopping);
    } else {
      nextMap.set(curTopping, nextHasTopping - 1);
    }

    prevSet.add(curTopping);

    if (prevSet.size === nextMap.size) answer++;
  }

  return answer;
}