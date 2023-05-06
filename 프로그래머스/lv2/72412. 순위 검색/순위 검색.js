function solution(info, query) {
    const answer = [];
    
    const infoMap = new Map();
    const stack = [];
    
    // 검색 조건을 미리 만들어둔다는 의미였구나.
    // info를 보고 검색 조건을 미리 만들어서 거기에 값을 저장하고
    // 후에 이분탐색 한다는 의미.
    
    function dfs(cnt, str) {
        if(cnt === 4) {
            const key = stack.join('');
            const score = Number(str[4]);
            
            if(infoMap.has(key)) {
                infoMap.get(key).push(score);
            } else {
                infoMap.set(key, [score]);
            }
            return;
        }
        
        stack.push(str[cnt]);
        dfs(cnt + 1, str);
        stack.pop();
        
        stack.push('-');
        dfs(cnt + 1, str);
        stack.pop();
    }
    
    // info로부터 조건 만들고 값 저장.    
    info.forEach(s => {
        const parse = s.split(' ');
        dfs(0, parse);
    })
    
    // map의 값들을 이진탐색을 위해 정렬.
    for(let v of infoMap.values()) {
        v.sort((a, b) => a - b);
    }
    
    // 쿼리에서 조건을 위한 key 값과 score 찾음.
    query.forEach(s => {
        const split = s.split(' ');
        const cond = split.filter(ch => ch !== 'and');
        
        const score = Number(cond.pop());
        const key = cond.join("");
        
        // 이진 탐색.
        if(infoMap.has(key)) {
            // console.log(key, infoMap.get(key), score);
            
            // console.log(infoMap.get(key).length, '-', binarySearch(infoMap.get(key), score), '=', infoMap.get(key).length - binarySearch(infoMap.get(key), score));
            
            const cnt = infoMap.get(key).length - binarySearch(infoMap.get(key), score);
            
            answer.push(cnt);
            
        } else {
            answer.push(0);
            
        }
    })

    function binarySearch(arr, score) {
//         let minIdx = 0;
        
//         for(let i = 0; i < arr.length; i++) {
//             if(score <= arr[i]) {
//                 return i;
//             }
//         }
        
//         return arr.length;
        
        let left = 0;
        let right = arr.length - 1;
        let mid = Math.floor((left + right) / 2);
        
        while(left <= right) {
            if(score === arr[mid]) {
                if(mid - 1 > -1 && score === arr[mid - 1]) {
                    let idx = mid - 1;
                    
                    while(score === arr[idx]) {
                        idx--;
                    }
                    return idx + 1;
                    
                } else {
                    return mid;
                }
            }
            else if(score < arr[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
            
            mid = Math.floor((left + right) / 2);
        }
        
        return mid + 1;
    }    
    
    // console.table(infoMap);
    
    return answer;
}