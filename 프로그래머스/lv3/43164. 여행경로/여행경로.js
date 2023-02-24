function solution(tickets) {
  const INIT = "ICN";
  const N = tickets.length;
  const portMap = new Map();
  const answer = [];

  tickets.forEach((info) => {
    const [start, dest] = info;

    if (portMap.has(start)) {
      portMap.get(start).push({ dest, used: false });
    } else {
      portMap.set(start, [{ dest, used: false }]);
    }
  });

  const stack = [INIT];

  dfs(0, INIT);

  // console.log(answer);
  // console.log(answer.sort()[0].split(" "));
  return answer.sort()[0].split(" ");

  function dfs(cnt, curr) {
    if (cnt === N) {
      answer.push(stack.join(" "));

      return;
    }

    if (!portMap.has(curr)) return;

    const currTickets = portMap.get(curr);

    for (let i = 0; i < currTickets.length; i++) {
      if (currTickets[i].used) continue;

      currTickets[i].used = true;
      stack.push(currTickets[i].dest);

      dfs(cnt + 1, currTickets[i].dest);

      currTickets[i].used = false;
      stack.pop();
    }
  }
}