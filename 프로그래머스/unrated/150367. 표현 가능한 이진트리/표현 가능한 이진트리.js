function solution(numbers) {
  const answer = [];
  const maxSize = 63;

  numbers.forEach((num) => {
    const str = num.toString(2);
    const diff = maxSize - str.length;
    const trees = "0".repeat(diff) + str;

    // console.log(trees.length);
    // console.table(trees);

    if (checkRoot(trees, maxSize, true, true, 0)) answer.push(1);
    else answer.push(0);
  });

  return answer;

  function checkRoot(subTree, size, isRight, parent, changeCnt) {
    // console.log(`subTree = ${subTree}`);
    // console.log(`size = ${size}, parent = ${parent}`);
    // console.log();

    if (size === 1) {
      if (isRight) return true;

      if (subTree === "1") {
        if (!parent) {
          return false;
        }
      }

      return true;
    }

    const mid = Math.floor(size / 2);
    const left = Math.floor(mid / 2);
    const right = mid + left + 1;

    // 처음으로 부모가 1
    if (subTree[mid] === "1" && changeCnt === 0) {
      changeCnt++;
    }

    // 부모가 1이었다가 0이됨
    if (subTree[mid] === "0" && changeCnt === 1) {
      // changeCnt++;
      if (subTree[right] === "1") return false;
    }

    if (subTree[mid] === "0") {
      if (subTree[left] === "1") return false;

      if (!isRight && subTree[right] === "1") return false;
    }

    // if (isRight && parent) {
    // if (subTree[mid] === "0" && subTree[right] === "1") return false;
    // }

    const isParent = subTree[mid] === "1" ? true : false;

    return (
      checkRoot(subTree.slice(0, mid), mid, false, isParent, changeCnt) &&
      checkRoot(subTree.slice(mid + 1), mid, isRight, isParent, changeCnt)
    );
  }
}