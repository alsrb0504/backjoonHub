function solution(progresses, speeds) {
    var answer = [];
    
    const funcs = [...progresses];
    let done_idx = 0;
    
    while(done_idx < funcs.length) {
        let cnt = 0;
        // 값 업데이트
        for(let i = done_idx; i < funcs.length; i++) {
            funcs[i] += speeds[i];
        }
        
        // console.log(funcs);
        
        while(funcs[done_idx] > 99) {
            done_idx++;
            cnt++;
        }
        
        if(cnt !== 0) {
            answer.push(cnt);
        }
    }
    
    // console.log(answer);
    
    return answer;
}