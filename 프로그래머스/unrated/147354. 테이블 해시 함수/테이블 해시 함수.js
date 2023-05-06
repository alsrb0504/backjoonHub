function solution(data, col, row_begin, row_end) {
  let answer = 0;

  col--;
  row_begin--;
  row_end--;

  data.sort((a, b) => {
    if (a[col] === b[col]) {
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return b[i] - a[i];
      }
    }

    return a[col] - b[col];
  });

  let curr = calcModRow(row_begin);

  for (let i = row_begin + 1; i <= row_end; i++) {
    const modResult = calcModRow(i);

    curr = curr ^ modResult;
  }

  return curr;

  function calcModRow(index) {
    let acc = 0;

    for (let num of data[index]) {
      acc += num % (index + 1);
    }

    return acc;
  }
}