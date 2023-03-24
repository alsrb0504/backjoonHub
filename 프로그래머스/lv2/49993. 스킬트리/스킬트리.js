function solution(skill, skill_trees) {
  let answer = 0;


  for (let i = 0; i < skill_trees.length; i++) {
    if (checkSkills(skill_trees[i])) answer++;
  }

  function checkSkills(str) {
    let cnt = 0;

    for (let j = 0; j < str.length; j++) {
      if (skill.includes(str[j])) {
        if (str[j] === skill[cnt]) {
          cnt++;
        } else {
          return false;
        }
      }
    }

    return true;
  }

  return answer;
}

