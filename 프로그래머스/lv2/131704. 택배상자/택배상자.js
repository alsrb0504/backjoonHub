function solution(order) {
  const stack = [];

  let answer = 0;
  let curr = 1;

  order.some((item) => {
    while (curr < item) {
      stack.push(curr++);
    }

    if (curr !== item) {
      if (stack.at(-1) === item) stack.pop();
      else return true;
    } else {
      curr++;
    }

    answer++;
  });

  return answer;
}