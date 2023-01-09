function solution(storey) {
  let answer = 0;

  while (storey > 0) {
    const rest = storey % 10;
    let isUp = false;

    if (rest < 5) {
      answer += rest;
    } else if (rest === 5) {
      if (storey > 10 && Number(storey.toString().at(-2)) >= 5) {
        isUp = true;
      }

      answer += rest;
    } else {
      answer += 10 - rest;
      isUp = true;
    }

    storey = Math.floor(storey / 10);
    if (isUp) storey++;
  }

  return answer;
}