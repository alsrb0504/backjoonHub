function solution(book_time) {
  const MAX_SIZE = 1000;

  const timeInfo = book_time.map((el) =>
    el.map((time) => Number(time.split(":").join("")))
  );

  timeInfo.sort((a, b) => a[0] - b[0]);

  timeInfo.forEach((el, idx) => {
    let [_, bookEnd] = el;

    const updated = bookEnd % 100 >= 50 ? bookEnd + 50 : bookEnd + 10;

    timeInfo[idx][1] = updated;
  });

  const rooms = Array.from({ length: MAX_SIZE }, () => []);

  for (let [bookStart, bookEnd] of timeInfo) {
    for (let i = 0; i < MAX_SIZE; i++) {
      let isPossible = true;

      for (let [roomStart, roomEnd] of rooms[i]) {
       if (!(roomStart >= bookEnd || roomEnd <= bookStart)) {
            isPossible = false;
            break;
          }
      }

      if (isPossible) {
        rooms[i].push([bookStart, bookEnd]);
        break;
      }
    }
  }

  let answer = 0;

  for (let i = 0; i < MAX_SIZE; i++) {
    if (rooms[i].length) answer++;
  }

  return answer;
}
