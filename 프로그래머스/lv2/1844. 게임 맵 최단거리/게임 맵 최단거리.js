function solution(maps) {
    const endY = maps.length - 1;
    const endX = maps[0].length - 1;
    
    
    // 효율성 테스트 시간 초과 방지.
    if(endY > 1 && endX > 1) {
        if(maps[endY - 1][endX] === 0 && maps[endY - 1][endX - 1] === 0 && maps[endY][endX - 1] === 0) return -1;
    }
    
    return bfs();
    
    function bfs() {
        const moves = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        const q = [{x: 0, y: 0, cnt: 1}];

        while(q.length > 0) {
            const {x, y, cnt} = q.shift();
            
            for(let i = 0; i < 4; i++) {
                const [moveX, moveY] = moves[i];
                const nextX = moveX + x;
                const nextY = moveY + y;
                
                // 범위 확인
                if(nextX < 0 || nextX > endX || nextY < 0 || nextY > endY) continue;
                // 벽 확인
                if(maps[nextY][nextX] === 0) continue; 
                
                // 종료 조건 확인
                if(nextX === endX && nextY === endY) {
                    return cnt + 1;
                }

                // 아 그냥 값이 1보다 크면 방문한거지
                // [1, 1]은 예외.
                if(maps[nextY][nextX] < 2) {
                    maps[nextY][nextX] = cnt + 1;
                    q.push({x: nextX, y: nextY, cnt: cnt + 1});
                }
            }
        }
        // 갈 수 없을 경우.
        return -1;
    }
}