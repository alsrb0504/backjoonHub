function solution(picks, minerals) {
  let answer = 0;

  const PICKS_SIZE = picks.reduce((acc, cur) => acc + cur, 0);
  const MINERAL_SIZE = minerals.length;
  const NEED_MINE = Math.ceil(MINERAL_SIZE / 5);
  let costs = Array.from({ length: NEED_MINE }, () => new Array(3).fill(0));

  let idx = 0;
  while (idx < MINERAL_SIZE) {
    const stack = [];

    for (let i = idx; i < idx + 5 && i < MINERAL_SIZE; i++) {
      stack.push(minerals[i]);
    }

    const costs_idx = Math.floor(idx / 5);

    stack.forEach((el) => {
      if (el === "diamond") {
        costs[costs_idx][1] += 5;
        costs[costs_idx][2] += 25;
      } else if (el === "iron") {
        costs[costs_idx][1] += 1;
        costs[costs_idx][2] += 5;
      } else {
        costs[costs_idx][1] += 1;
        costs[costs_idx][2] += 1;
      }

      costs[costs_idx][0] += 1;
    });

    idx += 5;
  }

  while (PICKS_SIZE < costs.length) {
    costs.pop();
  }

  // console.table(minerals);
  // console.table(costs);

  for (let i = 0; i < NEED_MINE; i++) {
    let max_cost = [0, 0, 0];
    let max_idx = -1;

    if (picks[0] > 0) {
      picks[0]--;

      for (let j = 0; j < costs.length; j++) {
        const curr = costs[j];

        if (
          // max_cost[0] < curr[0] ||
          // (max_cost[0] === curr[0] && max_cost[1] < curr[1])
          max_cost[2] < curr[2]
        ) {
          max_cost = curr;
          max_idx = j;
        }
      }

      costs.splice(max_idx, 1);
      answer += max_cost[0];
    } else if (picks[1] > 0) {
      picks[1]--;

      for (let j = 0; j < costs.length; j++) {
        const curr = costs[j];

        if (
          max_cost[2] < curr[2]

          // max_cost[1] < curr[1] ||
          // (max_cost[1] === curr[1] && max_cost[2] < curr[2])
        ) {
          max_cost = curr;
          max_idx = j;
        }
      }

      costs.splice(max_idx, 1);
      answer += max_cost[1];
    } else {
      for (let j = 0; j < costs.length; j++) {
        const curr = costs[j];

        if (max_cost[2] < curr[2]) {
          max_cost = curr;
          max_idx = j;
        }
      }

      costs.splice(max_idx, 1);
      answer += max_cost[2];
    }
  }

  return answer;
}
