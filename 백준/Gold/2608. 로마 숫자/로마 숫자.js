const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const dictionary = {
  I: 1,
  IV: 4,
  IX: 9,
  V: 5,
  X: 10,
  XL: 40,
  XC: 90,
  L: 50,
  C: 100,
  CD: 400,
  CM: 900,
  D: 500,
  M: 1000,
};

const number_dictionary = [
  [1, "I"],
  [4, "IV"],
  [5, "V"],
  [9, "IX"],
  [10, "X"],
  [40, "XL"],
  [50, "L"],
  [90, "XC"],
  [100, "C"],
  [400, "CD"],
  [500, "D"],
  [900, "CM"],
  [1000, "M"],
];

const str1 = input[0].trimEnd().split("");
const str2 = input[1].trimEnd().split("");

const sum = changeToNum(str1) + changeToNum(str2);
console.log(sum + "\n" + changeToStr(sum));

function changeToNum(arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    if (
      arr[i] === "I" &&
      arr[i + 1] &&
      (arr[i + 1] === "V" || arr[i + 1] === "X")
    ) {
      sum += dictionary[arr[i] + arr[i + 1]];
      i++;
    } else if (
      arr[i] === "X" &&
      arr[i + 1] &&
      (arr[i + 1] === "L" || arr[i + 1] === "C")
    ) {
      sum += dictionary[arr[i] + arr[i + 1]];
      i++;
    } else if (
      arr[i] === "C" &&
      arr[i + 1] &&
      (arr[i + 1] === "D" || arr[i + 1] === "M")
    ) {
      sum += dictionary[arr[i] + arr[i + 1]];
      i++;
    } else {
      sum += dictionary[arr[i]];
    }
  }

  return sum;
}

function changeToStr(num) {
  const tmp = [];
  number_dictionary.sort((a, b) => b[0] - a[0]);

  while (num > 0) {
    for (let [stdNum, ch] of number_dictionary) {
      if (stdNum <= num) {
        tmp.push(ch);
        num -= stdNum;
        break;
      }
    }
  }

  return tmp.join("");
}
