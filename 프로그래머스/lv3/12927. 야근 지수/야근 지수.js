function solution(n, works) {
  let answer = 0n;
  // const SIZE = 5;
  // const SIZE = 20001;
  const SIZE = 50001;
  const nums = new Array(SIZE).fill(0);

  for (let t of works) nums[t]++;

  for (let i = SIZE - 1; i > 0; i--) {
    if (n === 0) break;

    if (nums[i] > 0) {
      if (n >= nums[i]) {
        n -= nums[i];
        nums[i - 1] += nums[i];
        nums[i] = 0;
      } else {
        nums[i - 1] += n;
        nums[i] -= n;
        // n = 0;
        break;
      }
    }

    // console.log(nums[i]);
  }

  for (let i = 0; i < SIZE; i++) {
    answer += BigInt(i ** 2) * BigInt(nums[i]);
  }

  // console.table(nums.slice(0, 5));

  return answer;
}