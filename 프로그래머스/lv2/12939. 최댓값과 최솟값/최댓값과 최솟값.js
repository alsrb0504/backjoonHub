function solution(s) {
   const nums = s
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

  return `${nums[0]} ${nums.at(-1)}`;
}