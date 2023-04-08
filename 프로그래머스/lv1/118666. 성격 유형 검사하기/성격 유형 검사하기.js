function solution(survey, choices) {
  const SIZE = survey.length;
  const answer = [];
  const scores = new Map();
  scores.set("R", 0).set("T", 0).set("C", 0).set("F", 0);
  scores.set("J", 0).set("M", 0).set("A", 0).set("N", 0);

  for (let i = 0; i < SIZE; i++) {
    const [type1, type2] = survey[i].split("");

    calcScores(type1, type2, choices[i]);
  }

  answer.push(getResult("R", "T"));
  answer.push(getResult("C", "F"));
  answer.push(getResult("J", "M"));
  answer.push(getResult("A", "N"));

  return answer.join("");

  function getResult(key1, key2) {
    if (scores.get(key1) < scores.get(key2)) return key2;
    else return key1;
  }

  function calcScores(key1, key2, nums) {
    if (nums === 1) {
      scores.set(key1, scores.get(key1) + 3);
    }
    if (nums === 2) {
      scores.set(key1, scores.get(key1) + 2);
    }
    if (nums === 3) {
      scores.set(key1, scores.get(key1) + 1);
    }
    if (nums === 5) {
      scores.set(key2, scores.get(key2) + 1);
    }
    if (nums === 6) {
      scores.set(key2, scores.get(key2) + 2);
    }
    if (nums === 7) {
      scores.set(key2, scores.get(key2) + 3);
    }
  }
}
