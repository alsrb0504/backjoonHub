function solution(genres, plays) {
  const answer = [];

  const genres_map = new Map();

  for (let i = 0; i < genres.length; i++) {
    const gen = genres[i];
    const cnt = plays[i];

    if (genres_map.has(gen)) {
      const info = genres_map.get(gen);

      info[0] += cnt;
      info[1].push([i, cnt]);
    } else {
      genres_map.set(gen, [cnt, [[i, cnt]]]);
    }
  }

  const result = [...genres_map.values()];
  result.sort((a, b) => b[0] - a[0]);

  result.forEach((el) => {
    const records = el[1];

    records.sort((a, b) => b[1] - a[1]);

    for (let i = 0; i < 2 && i < records.length; i++) {
      answer.push(records[i][0]);
    }
  });

  return answer;
}