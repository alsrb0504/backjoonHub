function solution(absolutes, signs) {
    var answer = 0;
    
//     for(let i = 0; i < absolutes.length; i++) {
//         if(signs[i]) answer += absolutes[i];
//         else answer -= absolutes[i];
//     }
    
//     return answer;
    
    console.log(absolutes.reduce((acc, cur, i) => acc + (signs[i] ? 1 : -1) * cur, 0));
    console.log(absolutes.reduce((acc, cur, i) => acc + (signs[i] ? 1 : -1) * cur));
    
    
    return absolutes.reduce((acc, cur, i) => acc + (signs[i] ? 1 : -1) * cur, 0);
}