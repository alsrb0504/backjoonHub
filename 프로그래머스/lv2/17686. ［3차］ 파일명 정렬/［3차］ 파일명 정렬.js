function solution(files) {
  // 데이터를 [HEAD, NUMBER, TAIL, 파일명, 입력 순서]의 배열로 변경
  // {
  //   HEAD: 'IMG', (대문자 처리),
  //   NUMBER: 123,
  //   TAIL: ".zip",
  //   fileName: "img123.zip",
  //   inputIdx: 0
  // }

  const fileData = files.map((info, idx) => {
    // 숫자 전까지가 head, 숫자 이후가 tail인데 tail은 옵셔널

    let numStart = -1;
    let numEnd = -1;

    for (let i = 1; i < info.length; i++) {
      if ("0" <= info[i] && "9" >= info[i]) {
        if (numStart === -1) numStart = i;
      } else {
        if (numStart !== -1) {
          numEnd = i - 1;
          break;
        }
      }
    }

    // console.log(`[Log] numStart = ${numStart}`);
    // console.log(`[Log] numEnd = ${numEnd}`);

    // "str".toUpperCase()
    const HEAD = info.slice(0, numStart).toUpperCase();
    const NUMBER =
      numEnd === -1
        ? Number(info.slice(numStart))
        : Number(info.slice(numStart, numEnd + 1));
    const TAIL = numEnd === -1 ? "" : info.slice(numEnd + 1);

    return { HEAD, NUMBER, TAIL, fileName: info, inputIdx: idx };
  });

  fileData.sort((a, b) => {
    if (a.HEAD === b.HEAD) {
      if (a.NUMBER === b.NUMBER) {
        return a.inputIdx - b.inputIdx;
      }
      return a.NUMBER - b.NUMBER;
    } else {
      return a.HEAD > b.HEAD ? 1 : -1;
    }
  });

  // console.table(fileData);

  const answer = fileData.map((data) => data.fileName);

  return answer;
}