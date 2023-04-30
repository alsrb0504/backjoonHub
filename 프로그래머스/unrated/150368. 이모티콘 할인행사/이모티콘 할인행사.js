function solution(users, emoticons) {
  let maxUsers = 0;
  let maxPrice = 0;

  // 40, 30, 20, 10의 할인율을 이모티콘 개수와 조합
  // 최대 4 ** 7 = 16384가지 경우의 수
  const sales = [40, 30, 20, 10];
  const stack = [];

  dfs(0);

  return [maxUsers, maxPrice];

  function calcResult() {
    const updatedEmoticons = emoticons.map((el, idx) => {
      return el - (el * stack[idx]) / 100;
    });

    let totalUser = 0;
    let totalPrice = 0;

    users.forEach(([stdPercent, stdPrice]) => {
      let buyPrice = 0;

      updatedEmoticons.forEach((price, idx) => {
        if (stack[idx] >= stdPercent) {
          buyPrice += price;
        }
      });

      if (buyPrice >= stdPrice) totalUser++;
      else totalPrice += buyPrice;
    });

    if (maxUsers < totalUser) {
      maxUsers = totalUser;
      maxPrice = totalPrice;
    } else if (maxUsers === totalUser) {
      maxPrice = Math.max(maxPrice, totalPrice);
    }
  }

  function dfs(cnt) {
    if (cnt === emoticons.length) {
      calcResult();

      return;
    }

    for (let i = 0; i < 4; i++) {
      stack.push(sales[i]);
      dfs(cnt + 1);
      stack.pop();
    }
  }
}