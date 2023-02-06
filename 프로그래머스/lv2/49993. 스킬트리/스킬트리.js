function solution(skill, skill_trees) {
  let answer = 0;

  const skill_map = new Map();
  const skill_set = new Set();

  for (let i = 0; i < skill.length; i++) {
    const ch = skill[i];

    skill_map.set(ch, i);
    skill_set.add(ch);
  }

  for (let i = 0; i < skill_trees.length; i++) {
    if (checkSkills(skill_trees[i])) answer++;
  }

  function checkSkills(str) {
    let cnt = 0;

    for (let j = 0; j < str.length; j++) {
      if (skill_set.has(str[j])) {
        if (cnt === skill_map.get(str[j])) {
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
