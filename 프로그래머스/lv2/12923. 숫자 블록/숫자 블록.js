function solution(begin, end) {
    let answer = [];

    for(let i=begin; i<=end; i++){
        answer.push(findN(i));
    }
    return answer;
} 

function findN(number){
    if(number===1) return 0;

    let temp = 1;
    for(let i=2 ; i<=Math.sqrt(number); i++){
        if(number%i===0){
            temp = i;
            // 10**7인데 10*7로 써서 한시간동안 에러 찾음...;;
            // 예시케이스는 되는데 테케는 왜 안되나...내가 멀 잘못햇나..세상이 날 억까한다...
            if(number/i<=10**7) return number/i;
        }
    }
    return temp;
}
/*
function solution(begin, end) {
  const SIZE = end - begin + 1;
  const MAX_NUM = 1e7;
  const answer = new Array(SIZE).fill(1);

  for (let i = 0; i < SIZE; i++) {
    answer[i] = getMaxDivider(begin + i);
  }

  if (begin === 1) answer[0] = 0;

  return answer;

  function getMaxDivider(num) {
    let max = 1;
    const sqrt = Math.sqrt(num);

    // 2 ~ 제곱근까지 (그리고 10^7)까지 나눠보며
    // 1과 자기 자신을 제외한 최대 약수 찾음
    // for (let i = 2; i <= sqrt && i <= MAX_NUM; i++) {
    for (let i = 2; i <= sqrt; i++) {
      if (num % i === 0) {
        if (num / i <= MAX_NUM) return num / i;
        else {
          max = Math.max(max, i);
        }
      }
    }

    return max;
  }
}
*/