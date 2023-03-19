function solution(today, terms, privacies) {
  const termMap = new Map();
  const calcedDate = [];
  const answer = [];

  for (let term of terms) {
    const [ch, num] = term.split(" ");
    termMap.set(ch, Number(num));
  }

  for (let private of privacies) {
    const [date, term] = private.split(" ");

    calcedDate.push(CalcDateToNum(date) + termMap.get(term) * 28);
  }

  const calcedToday = CalcDateToNum(today);

  calcedDate.forEach((el, idx) => {
    if (el <= calcedToday) answer.push(idx + 1);
  });

  return answer;

  function CalcDateToNum(str) {
    const [yy, mm, dd] = str.split(".").map(Number);

    return (yy - 1) * 12 * 28 + (mm - 1) * 28 + dd;
  }
}
