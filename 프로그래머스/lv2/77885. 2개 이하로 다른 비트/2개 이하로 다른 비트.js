function solution(numbers) {
  const answer = [];

  numbers.forEach((num) => {
    answer.push(findCondition(num));
  });

  return answer;

  function findCondition(std) {
    let binary = std.toString(2).split("");

    // console.log(binary);
    // console.log(binary.includes("0"));

    if (binary.includes("0")) {
      let isOne = false;

      for (let i = binary.length - 1; i >= 0; i--) {
        if (binary[i] === "0") {
          binary[i] = "1";

          if (isOne) {
            binary[i + 1] = "0";
          }

          return parseInt(binary.join(""), 2);
        } else {
          isOne = true;
        }
      }
    } else {
      // const newBinary = ["1", ...binary];
      const newBinary = new Array(binary.length + 1).fill("1");
      newBinary[1] = "0";

      return parseInt(newBinary.join(""), 2);
    }
  }
}