function solution(n) {
    // 마지막 조건 n의 나머지 3일 때, n--를 못 찾았음...
    // 0을 안 씀.
    
    const result = [];
    
    while(n > 0) {
        const r = n % 3;
        n = Math.floor(n / 3);
        
        if(r === 0) {
            n--;
            result.push(4);
        } else {
            result.push(r)
        }
        
        // if(r === 0) {
            // q--;
            // result.push(4);
        // } else {
            // result.push(r);
        // }
        
        // if(n === 1 && r === 0) break;
        
        // n = q;
    }
    
    return result.reverse().join("");
}