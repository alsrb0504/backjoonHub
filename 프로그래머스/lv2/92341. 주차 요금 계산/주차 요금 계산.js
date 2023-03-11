function solution(fees, records) {
  const [baseTime, basePrice, unitTime, unitPrice] = fees;

  const resultMap = new Map();
  const parking = new Map();

  records.forEach((r) => {
    const [time, num, _] = r.split(" ");

    const carNum = Number(num);

    if (parking.has(carNum)) {
      const inTime = parking.get(carNum);
      parking.delete(carNum);

      addRecords(carNum, inTime, time);
    } else {
      parking.set(carNum, time);
    }
  });

  parking.forEach((inTime, key) => {
    addRecords(key, inTime, "23:59");
  });

  const arr = [...resultMap].sort((a, b) => a[0] - b[0]);

  // console.table(resultMap);
  // console.table(arr);

  var answer = [];

  arr.forEach((el) => {
    const [_, accTime] = el;

    if (accTime <= baseTime) answer.push(basePrice);
    else {
      const diff = accTime - baseTime;

      answer.push(basePrice + Math.ceil(diff / unitTime) * unitPrice);
    }
  });

  return answer;

  function calcTime(inTime, outTime) {
    const [inHour, inMin] = inTime.split(":").map(Number);
    const [outHour, outMin] = outTime.split(":").map(Number);

    const diffHour = outHour - inHour;
    const diffMin = outMin - inMin;

    let diffTime = 0;

    if (diffMin >= 0) {
      diffTime += diffMin;
      diffTime += diffHour * 60;
    } else {
      diffTime += 60 - inMin + outMin;
      diffTime += (diffHour - 1) * 60;
    }

    return diffTime;
  }

  function addRecords(carNum, inTime, outTime) {
    const accTime = calcTime(inTime, outTime);
    if (resultMap.has(carNum)) {
      resultMap.set(carNum, resultMap.get(carNum) + accTime);
    } else {
      resultMap.set(carNum, accTime);
    }
  }
}