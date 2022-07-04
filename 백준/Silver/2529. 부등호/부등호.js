const readFileSyncAddress = '/dev/stdin';
let input = require('fs').readFileSync(readFileSyncAddress).toString().split('\n');

const k = Number(input[0]);
const arr = input[1].split(' ');
let max = "0";
let min = "9999999999";
let output = [];
let visited = new Array(10).fill(false);

function dfs(cnt, start) {
  if(cnt === k + 1) {
    check();
    return;
  }

  for(let i = 0; i < 10; i++) {
    if(visited[i]) continue;

    visited[i] = true;
    output.push(i);
    dfs(cnt + 1, i + 1);
    visited[i] = false;
    output.pop();
  }
}

function check() {
  for(let i = 0; i < k; i++) {
    if(arr[i] === '>') {
      if(output[i] < output[i + 1]) {
        return;
      }
    } else {
      if(output[i] > output[i + 1]) {
        return;
      }
    }
  }

  let num = (output.join(""));

  if(min > num) {
    min = num;
  }
  if(max < num) {
    max = num;
  }
}

dfs(0, 0);
console.log(max + '\n' + min);