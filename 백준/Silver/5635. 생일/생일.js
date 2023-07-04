const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const min = { name: "", date: new Date("1989-1-1") };
const max = { name: "", date: new Date("2011-12-31") };

for (let i = 1; i <= N; i++) {
  const [name, dd, mm, yy] = input[i].trimEnd().split(" ");
  const dateInfo = new Date(`${yy}-${mm}-${dd}`);

  if (min.date < dateInfo) {
    min.name = name;
    min.date = dateInfo;
  }

  if (max.date > dateInfo) {
    max.name = name;
    max.date = dateInfo;
  }
}

console.log(`${min.name}\n${max.name}`);
