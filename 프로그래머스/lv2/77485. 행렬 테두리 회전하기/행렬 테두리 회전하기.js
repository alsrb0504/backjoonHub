function solution(rows, columns, queries) {
    
    const result = [];
    
    const board = new Array(rows + 1);
    
    for(let i = 1; i <= rows; i++) {
        board[i] = new Array(columns + 1);
        
        for(let j = 1; j < columns + 1; j++) {
            board[i][j] = ((i - 1) * columns + j);
        }
    }
    
    const moveCnt = queries.length;
    let cnt = 0;
    
    // console.table(board);
    
    while(cnt < moveCnt) {
        const [y1, x1, y2, x2] = queries[cnt];
    
        let stack = [];
        stack.push(board[y1 + 1][x1]);

        for(let i = x1; i <= x2; i++) {
            let tmp = board[y1][i];

            board[y1][i] = stack[stack.length - 1];

            stack.push(tmp);
        }

        for(let i = y1 + 1; i <= y2; i++) {
            let tmp = board[i][x2];

            board[i][x2] = stack[stack.length - 1];

            stack.push(tmp);
        }

        for(let i = x2 - 1; i >= x1; i--) {
            let tmp = board[y2][i];

            board[y2][i] = stack[stack.length - 1];

            stack.push(tmp);
        }

        for(let i = y2 - 1; i >= y1; i--) {
            let tmp = board[i][x1];

            board[i][x1] = stack[stack.length - 1];

            stack.push(tmp);
        }

        const min = Math.min(...stack);
        result.push(min);
        
        cnt++;
    }
    
    return result;
}