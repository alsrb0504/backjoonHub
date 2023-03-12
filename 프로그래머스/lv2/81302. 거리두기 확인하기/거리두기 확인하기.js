function solution(places) {    
    // 범위는 한칸 거리 모든 위치
    // + 십자가로 + 2위치.
    
    let board = [];
    const result = [];
    
    const testCase = places.length;
    let cnt = 0;
    
    while(cnt < testCase) {
        board = [...places[cnt++]];
        
        let observeFlag = true;
        let i = 0;
        
        while(i < 5 && observeFlag) {
            for(let j = 0; j < 5; j++) {
                if(board[i][j] === 'P') {
                    if(!check(i, j)) {
                        observeFlag = false;
                        break;
                    }
                }
            }
            i++;
        }
        //
        if(observeFlag) result.push(1);
        else result.push(0);
    }
    
    return result;
    
    
    function check(y, x) {

        // 1. 직선 거리 1 확인
        // 왼쪽은 확인 필요 없음. (이유 : 왼 => 오로 검사하기 때문) 
        // 위쪽도
        if(x < 4 && board[y][x + 1] === 'P') return false;
        
        if(y < 4 && board[y + 1][x] === 'P') return false;
        
        // 2. 직선 거리 2 확인
        if(x < 3 && board[y][x + 2] === 'P' && board[y][x + 1] !== 'X') return false;
        
        if(y < 3 && board[y + 2][x] === 'P' && board[y + 1][x] !== 'X') return false;
        
        // 3. 대각선 확인
        // 3-1. 오른쪽 아래
        if(x < 4 && y < 4 && board[y + 1][x + 1] === 'P') {
            if(board[y + 1][x] !== 'X' || board[y][x + 1] !== 'X') return false;
        }
        // 3-2. 오른쪽 위
        if(x < 4 && y > 0 && board[y - 1][x + 1] === 'P') {
            if(board[y - 1][x] !== 'X' || board[y][x + 1] !== 'X') return false;
        }
        // 3-3. 왼쪽 아래
        if(x > 0 && y < 4 && board[y + 1][x - 1] === 'P') {
            if(board[y + 1][x] !== 'X' || board[y][x - 1] !== 'X') return false;
        }
        // 3-2. 왼쪽 위
        if(x > 0 && y > 0 && board[y - 1][x - 1] === 'P') {
            if(board[y - 1][x] !== 'X' || board[y][x - 1] !== 'X') return false;
        }
        
        return true;
    }
}