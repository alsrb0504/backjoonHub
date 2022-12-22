let input = require('fs').readFileSync('/dev/stdin').toString().split('\n');

const testCase = Number(input[0]);

let members = [];

for(let i = 1; i <= testCase; i++) {
  let member = input[i].split(' ');
  members.push({
    age: Number(member[0]),
    name: member[1],
    order: i,
  })
}

members.sort((a, b) => {
  if(a.age === b.age) {
    if(a.order > b.order) {
      return a.order - b.order;
    } else {
      return b.order - a.order;
    }
  } else {
    return a.age - b.age;
  }
})

let result = "";
members.forEach(member => {
  result += `${member.age} ${member.name}\n`
})

console.log(result);