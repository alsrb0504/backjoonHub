function solution(t, p) {
    var answer = 0;
    
    const std = Number(p);
    const size = p.length;

    for (let i = 0; i <= t.length - size; i++) {
      if (Number(t.slice(i, i + size)) <= std) answer++;
    }
    
    return answer;
}