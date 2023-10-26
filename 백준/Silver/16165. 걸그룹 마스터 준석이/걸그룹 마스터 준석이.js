const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
let line = 1;

const group = new Map();
const member = new Map();
const answer = [];

for (let i = 0; i < N; i++) {
  const groupName = input[line++].trimEnd();
  const LENGTH = Number(input[line++]);

  const members = input.slice(line, line + LENGTH).map((el) => el.trimEnd());

  line += LENGTH;

  group.set(groupName, members);

  for (const name of members) {
    member.set(name, groupName);
  }
}

for (let i = 0; i < M; i++) {
  const str = input[line++].trimEnd();
  const command = Number(input[line++]);

  if (command === 0) {
    group
      .get(str)
      .sort()
      .forEach((name) => answer.push(name));
  } else {
    answer.push(member.get(str));
  }
}

console.log(answer.join("\n"));
