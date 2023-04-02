function solution(orders, course) {
    let answer = [];
    
    function dfs(cnt, max, start, arr) {
        if(cnt === max) {
            // 메뉴들의 조합을 key로 횟수를 value로 구성.
            const menu = stack.join("");
            if(map.has(menu)) {
                map.set(menu, map.get(menu) + 1);
            } else {
                map.set(menu, 1);
            }
            return;
        }
        
        for(let i = start; i < arr.length; i++) {
            stack.push(arr[i]);
            dfs(cnt + 1, max, i + 1, arr);
            stack.pop();
        }
    }
    
    const map = new Map();
    const orderArr = [];
    let stack = [];
    
    // orders에 있는 메뉴들을 알파벳 순으로 정렬.
    orders.forEach(order => {
        orderArr.push(order.split('').sort((a, b) => a.charCodeAt() - b.charCodeAt()));
    })
    
    // dfs를 이용해서 가능한 모든 조합을 찾음.
    course.forEach(n => {
        orderArr.forEach(str => {
            dfs(0, n, 0, str);
        })
    })
    
    // course의 수와 값이 같은 메뉴 조합을 찾고
    // 그 중에서 2명 이상에서 선택되었으며(value > 1)
    // 가장 큰 값을 찾음.
    course.map(n => {
        const tmp = [];
        let max = 0;
        
        // 큰 값 찾기
        map.forEach((val, key) => {
            if(key.length === n && val > 1) {
                tmp.push([key, val]);
                
                max = max < val ? val : max;
            }
        })
        
        // 큰 값에 해당하는 메뉴 조합 찾기.
        tmp.forEach(item => {
            if(item[1] === max) answer.push(item[0]);
        })
    })
    
    // abc 순으로 정렬.
    return answer.sort();
}