let input = require('fs').readFileSync('/dev/stdin').toString().split('\n');

// '/dev/stdin'

for(let i = 1; i < input.length; i++) {

  const data = input[i].split(' ').map(el => parseInt(el));

  const x1 = data[0];
  const y1 = data[1];
  let r1 = data[2];
  const x2 = data[3];
  const y2 = data[4];
  let r2 = data[5];

  // 큰 원의 지름을 찾아야 함. r2이 큰 원.
  if(r1 > r2) {
    const tmp = r1;
    r1 = r2;
    r2 = tmp;
  }

  const dist = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));

  const rSum = r1 + r2;
  const rSub = r2 - r1;

  if((rSub < dist) && (dist < rSum)) {
    console.log(2);
  } else if (dist === rSum || (dist === rSub && dist !== 0)) {
    console.log(1);
  } else if (dist < rSub || dist > rSum) {
    console.log(0);
  } else if (dist === 0) {
    if(r1 === r2) {
      console.log(-1);
    } else {
      console.log(0);
    }
  }
}