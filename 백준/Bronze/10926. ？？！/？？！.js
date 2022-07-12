const readFileSyncAddress = '/dev/stdin';

let input = require("fs").readFileSync(readFileSyncAddress).toString().trim();

console.log(`${input}??!`);