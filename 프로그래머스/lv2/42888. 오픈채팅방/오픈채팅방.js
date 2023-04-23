function solution(records) {
    var answer = [];
    const map = new Map();
    
    records.forEach(record => {
        const info = record.split(" ");
        if(info[0] !== 'Leave') {
            map.set(info[1], info[2]);
        }
    })
    
    records.forEach(record => {
        const info = record.split(" ");
        
        let text = "";
        
        if(info[0] === 'Enter') {
            text = `${map.get(info[1])}님이 들어왔습니다.`
            answer.push(text);
        } else if (info[0] === 'Leave') {
            text = `${map.get(info[1])}님이 나갔습니다.`
            answer.push(text);
        } 
    })
    
//     console.table(map);
    
//     console.table(answer);
    
    return answer;
}