const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const alphas = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
  I: 8,
  J: 9,
};

const N = Number(input[0]);
const data = input.slice(1, 1 + N).map((el) => el.trimEnd());

// [ 가중치, 첫 자리 여부, 알파벳 ]
const chars = Array.from({ length: 10 }, () => [0n, false, ""]);
for (let i = 0; i < 10; i++) {
  chars[i][2] = String.fromCharCode(65 + i);
}

data.forEach((el) => {
  const ch = el.split("");
  const length = el.length;

  ch.forEach((c, idx) => {
    const pos = length - idx - 1;

    if (idx === 0) {
      chars[alphas[c]][1] = true;
    }

    chars[alphas[c]][0] += 10n ** BigInt(pos);
  });
});

const used_alphas = chars.filter((el) => el[0] !== 0);
const prior = used_alphas
  .filter((el) => el[1])
  .sort((a, b) => Number(BigInt(b[0]) - BigInt(a[0])));
const second = used_alphas
  .filter((el) => !el[1])
  .sort((a, b) => Number(BigInt(b[0]) - BigInt(a[0])));

let num = 9;
let sec_idx = 0;

prior.forEach((el) => {
  const [cost, _, ch] = el;

  for (; sec_idx < second.length; sec_idx++) {
    const [second_cost, _, second_ch] = second[sec_idx];

    if (cost > second_cost) break;

    alphas[second_ch] = num;
    num--;
  }

  alphas[ch] = num;
  num--;
});

while (sec_idx < second.length) {
  const [second_cost, _, second_ch] = second[sec_idx];

  alphas[second_ch] = num;
  num--;
  sec_idx++;
}

if (alphas[prior[prior.length - 1][2]] === 0) {
  const tmp = alphas[second[second.length - 1][2]];

  alphas[prior[prior.length - 1][2]] = tmp;

  alphas[second[second.length - 1][2]] = 0;

  let prior_idx = prior.length - 1;

  while (prior_idx > 0) {
    const cur_ch = prior[prior_idx][2];
    const next_ch = prior[prior_idx - 1][2];

    if (alphas[cur_ch] > alphas[next_ch]) {
      [alphas[cur_ch], alphas[next_ch]] = [alphas[next_ch], alphas[cur_ch]];
      prior_idx--;
    } else {
      break;
    }
  }

  // prior와 second의 마지막 숫자들의 할당 넘버를 swap한 경우,
  // prior와 마지막 보다 가중치가 큰 것들과 prior와 마지막 숫자를 바꿔야 함.
  // while()
}

let answer = 0n;

data.forEach((el) => {
  const str = el.split("");
  const stack = [];

  str.forEach((ch) => {
    stack.push(alphas[ch]);
  });

  answer += BigInt(stack.join(""));
});

// console.table(alphas);

console.log(answer.toString());
