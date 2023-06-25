let input = require('fs').readFileSync('/dev/stdin').toString().split('\n');

const data = input[0].split(' ').map(el => Number(el));
const column = data[0];
const row = data[1];

let ableCount = [];

let count1 = 0;
let count2 = 0;

for(i = 0; i <= column - 8; i++) {
  for(j = 0; j <= row - 8; j++) {

    // 확인할 부분을 복사
    let test = "";
    for(y = i + 1; y <= i + 8; y++) {    // y = i + 1 : input[1]부터 체스판 시작
      let line = input[y];

      for(x = j; x < j + 8; x++) {
        test += line[x];
      }
      test += '\n';
    }

    count1 = CheckBoard2(test, 'W');
    count2 = CheckBoard2(test, 'B');
    ableCount.push(Math.min(count1, count2));
  }
}

// 결과 출력
console.log(Math.min.apply(null, ableCount));


function CheckBoard2(board, first) {
  let count = 0;
  let upline_prev = first;
  let boardLine = board.split('\n');

  for(let y = 0; y < 8; y++) {
    let line = boardLine[y].split('');
    let prev;

    if(upline_prev) {
      if(upline_prev === 'W' && line[0] === 'W') {
        count++;
        line[0] = 'B';
      } else if (upline_prev === 'B' && line[0] === 'B') {
        count++;
        line[0] = 'W';
      }
    }

    prev = line[0];

    for(let x = 1; x < 8; x++) {
      if(prev === 'W' && line[x] === 'W') {
        count++;
        line[x] = 'B';
      } else if (prev === 'B' && line[x] === 'B') {
        count++;
        line[x] = 'W';
      }

      prev = line[x];
    }

    // 위에 줄의 시작점과 B/W가 교차되도록 하기 위해.
    upline_prev = line[0];
  }
  return count;
}