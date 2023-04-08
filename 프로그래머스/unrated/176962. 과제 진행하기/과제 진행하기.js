function solution(plans) {
  const SIZE = plans.length;
  const answer = [];

  const stopStack = [];

  const infos = plans.map((el) => {
    const [name, time, palyTime] = el;
    const [hh, mm] = time.split(":").map(Number);
    const startTime = hh * 60 + mm;
    return [name, startTime, Number(palyTime)];
  });

  infos.sort((a, b) => a[1] - b[1]);

  for (let i = 0; i < SIZE - 1; i++) {
    const [name, startTime, playTime] = infos[i];
    const nextStartTime = infos[i + 1][1];

    const needTime = startTime + playTime;

    if (needTime <= nextStartTime) {
      answer.push(name);

      if (needTime < nextStartTime) {
        let availableTime = nextStartTime - needTime;

        while (availableTime > 0 && stopStack.length) {
          const [topName, topRestTime] = stopStack.pop();

          if (topRestTime <= availableTime) {
            availableTime -= topRestTime;
            answer.push(topName);
          } else {
            stopStack.push([topName, topRestTime - availableTime]);
            break;
          }
        }
      }
    } else {
      const restTime = needTime - nextStartTime;

      stopStack.push([name, restTime]);
    }
  }

  answer.push(infos.at(-1)[0]);

  while (stopStack.length) {
    const [topName, _] = stopStack.pop();
    answer.push(topName);
  }

  return answer;
}
