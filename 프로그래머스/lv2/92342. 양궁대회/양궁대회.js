function solution(n, info) {
  var answer = [];

  const results = new Array(11).fill(0);

  dfs(n, 0);

  if (answer.length === 0) return [-1];

  answer.sort((a, b) => b[0] - a[0]);

  const maxDiff = answer[0][0];
  let isMultiple = false;

  for (let i = 1; i < answer.length; i++) {
    if (maxDiff === answer[i][0]) {
      isMultiple = true;
      break;
    }
  }

  if (isMultiple) {
    const filtered = [];

    answer.forEach((el) => {
      if (el[0] === maxDiff) filtered.push(el[1].reverse().join(""));
    });

    filtered.sort();
    return filtered.at(-1).split("").reverse().map(Number);

  } else {
    return answer[0][1];
  }

  function checkWin() {
    let peachSum = 0;
    let lionSum = 0;

    for (let i = 0; i < 11; i++) {
      if (results[i] > info[i]) {
        lionSum += 10 - i;
      } else if (info[i] > 0) {
        peachSum += 10 - i;
      }
    }

    const diff = lionSum - peachSum;

    if (diff > 0) {
      answer.push([diff, [...results]]);
    }
  }

  function dfs(rest, start) {
    //
    if (rest === 0) {
      checkWin();
    }

    // 마지막 0점 처리
    for (let i = start; i < 11; i++) {
      const needs = info[i] + 1;

      if (i < 10 && needs > rest) continue;

      if (i === 10 && rest > 0) {
        results[10] += rest;
        dfs(0, i + 1);
        results[10] -= rest;
      } else {
        results[i] += needs;
        dfs(rest - needs, i + 1);
        results[i] -= needs;
      }
    }
  }
}

