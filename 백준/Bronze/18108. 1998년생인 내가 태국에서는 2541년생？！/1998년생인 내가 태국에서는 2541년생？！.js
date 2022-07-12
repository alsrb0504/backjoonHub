const readFileSyncAddress = '/dev/stdin';

let input = require("fs").readFileSync(readFileSyncAddress).toString();

console.log(Number(input) - 543);