const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n")
  .map((el) => el.trimEnd());

const str = input[0].split("");
const Length = str.length;

if (isPalindrome(str)) {
  console.log(str.length);
} else {
  // 뒤에서부터 팰린드롬을 포함하고 있는지
  let hasIncludePalindrome = -1;

  for (let i = 2; i < Length; i++) {
    if (isPalindrome(str.slice(Length - i).join(""))) {
      hasIncludePalindrome = i;
    }
  }

  if (hasIncludePalindrome > -1) {
    const diff = Length - hasIncludePalindrome;
    console.log(diff * 2 + hasIncludePalindrome);
  } else {
    // 팰린드롬을 포함하고 있지 않다면 하나씩 추가하며 확인
    const reverse = [...str].reverse();

    for (let i = 1; i < Length; i++) {
      str.push(reverse[i]);
      if (isPalindrome(str.join(""))) {
        console.log(str.length);
        break;
      }
    }
  }
}

function isPalindrome(words) {
  let lt = 0;
  let rt = words.length - 1;

  while (lt <= rt) {
    if (words[lt++] !== words[rt--]) return false;
  }

  return true;
}
