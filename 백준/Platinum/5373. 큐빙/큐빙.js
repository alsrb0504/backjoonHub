const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const tc = Number(input[0]);
const answer = [];

for (let i = 0; i < tc; i++) {
  answer.push(Solution(i * 2 + 1));
}

console.log(answer.join("\n"));

function Solution(line) {
  const N = Number(input[line]);
  const data = input[line + 1].trimEnd().split(" ");

  // [윗, 아래, 앞, 뒤, 왼, 오]
  // [0,   1,   2,  3,  4, 5]
  const cube = Array.from({ length: 6 }, () =>
    Array.from({ length: 3 }, () => new Array(3).fill("w"))
  );

  InitSetting();

  for (let i = 0; i < N; i++) {
    const [face, oper] = data[i].split("");

    if (face === "L") RotateLeft(oper);
    else if (face === "R") RotateRight(oper);
    else if (face === "U") RotateUp(oper);
    else if (face === "D") RotateDown(oper);
    else if (face === "F") RotateFront(oper);
    else if (face === "B") RotateBack(oper);
  }

  return `${cube[0][0].join("")}\n${cube[0][1].join("")}\n${cube[0][2].join(
    ""
  )}`;

  function RotateRight(dir) {
    RotateMain(5, dir);

    const up = [cube[0][0][2], cube[0][1][2], cube[0][2][2]];
    const front = [cube[2][0][2], cube[2][1][2], cube[2][2][2]];
    const bottom = [cube[1][0][2], cube[1][1][2], cube[1][2][2]];
    const back = [cube[3][0][2], cube[3][1][2], cube[3][2][2]];

    if (dir === "+") {
      [cube[0][0][2], cube[0][1][2], cube[0][2][2]] = [
        front[0],
        front[1],
        front[2],
      ];

      [cube[2][0][2], cube[2][1][2], cube[2][2][2]] = [
        bottom[0],
        bottom[1],
        bottom[2],
      ];

      [cube[1][0][2], cube[1][1][2], cube[1][2][2]] = [
        back[0],
        back[1],
        back[2],
      ];

      [cube[3][0][2], cube[3][1][2], cube[3][2][2]] = [up[0], up[1], up[2]];
    } else {
      [cube[0][0][2], cube[0][1][2], cube[0][2][2]] = [
        back[0],
        back[1],
        back[2],
      ];

      [cube[2][0][2], cube[2][1][2], cube[2][2][2]] = [up[0], up[1], up[2]];

      [cube[1][0][2], cube[1][1][2], cube[1][2][2]] = [
        front[0],
        front[1],
        front[2],
      ];

      [cube[3][0][2], cube[3][1][2], cube[3][2][2]] = [
        bottom[0],
        bottom[1],
        bottom[2],
      ];
    }
  }

  function RotateDown(dir) {
    RotateMain(1, dir);

    const front = [cube[2][2][0], cube[2][2][1], cube[2][2][2]];
    const right = [cube[5][2][0], cube[5][2][1], cube[5][2][2]];
    const back = [cube[3][0][2], cube[3][0][1], cube[3][0][0]];
    const left = [cube[4][2][0], cube[4][2][1], cube[4][2][2]];

    if (dir === "+") {
      [cube[2][2][0], cube[2][2][1], cube[2][2][2]] = [
        left[0],
        left[1],
        left[2],
      ];

      [cube[5][2][0], cube[5][2][1], cube[5][2][2]] = [
        front[0],
        front[1],
        front[2],
      ];

      [cube[3][0][2], cube[3][0][1], cube[3][0][0]] = [
        right[0],
        right[1],
        right[2],
      ];

      [cube[4][2][0], cube[4][2][1], cube[4][2][2]] = [
        back[0],
        back[1],
        back[2],
      ];
    } else {
      [cube[2][2][0], cube[2][2][1], cube[2][2][2]] = [
        right[0],
        right[1],
        right[2],
      ];

      [cube[5][2][0], cube[5][2][1], cube[5][2][2]] = [
        back[0],
        back[1],
        back[2],
      ];

      [cube[3][0][2], cube[3][0][1], cube[3][0][0]] = [
        left[0],
        left[1],
        left[2],
      ];

      [cube[4][2][0], cube[4][2][1], cube[4][2][2]] = [
        front[0],
        front[1],
        front[2],
      ];
    }
  }

  function RotateBack(dir) {
    RotateMain(3, dir);

    const up = [cube[0][0][0], cube[0][0][1], cube[0][0][2]];
    const right = [cube[5][0][2], cube[5][1][2], cube[5][2][2]];
    const bottom = [cube[1][2][2], cube[1][2][1], cube[1][2][0]];
    const left = [cube[4][2][0], cube[4][1][0], cube[4][0][0]];

    if (dir === "+") {
      [cube[0][0][0], cube[0][0][1], cube[0][0][2]] = [
        right[0],
        right[1],
        right[2],
      ];

      [cube[5][0][2], cube[5][1][2], cube[5][2][2]] = [
        bottom[0],
        bottom[1],
        bottom[2],
      ];

      [cube[1][2][2], cube[1][2][1], cube[1][2][0]] = [
        left[0],
        left[1],
        left[2],
      ];

      [cube[4][2][0], cube[4][1][0], cube[4][0][0]] = [up[0], up[1], up[2]];
    } else {
      [cube[0][0][0], cube[0][0][1], cube[0][0][2]] = [
        left[0],
        left[1],
        left[2],
      ];

      [cube[5][0][2], cube[5][1][2], cube[5][2][2]] = [up[0], up[1], up[2]];

      [cube[1][2][2], cube[1][2][1], cube[1][2][0]] = [
        right[0],
        right[1],
        right[2],
      ];

      [cube[4][2][0], cube[4][1][0], cube[4][0][0]] = [
        bottom[0],
        bottom[1],
        bottom[2],
      ];
    }
  }

  function RotateFront(dir) {
    RotateMain(2, dir);

    const up = [cube[0][2][0], cube[0][2][1], cube[0][2][2]];
    const right = [cube[5][0][0], cube[5][1][0], cube[5][2][0]];
    const bottom = [cube[1][0][2], cube[1][0][1], cube[1][0][0]];
    const left = [cube[4][2][2], cube[4][1][2], cube[4][0][2]];

    if (dir === "+") {
      [cube[0][2][0], cube[0][2][1], cube[0][2][2]] = [
        left[0],
        left[1],
        left[2],
      ];

      [cube[5][0][0], cube[5][1][0], cube[5][2][0]] = [up[0], up[1], up[2]];

      [cube[1][0][2], cube[1][0][1], cube[1][0][0]] = [
        right[0],
        right[1],
        right[2],
      ];

      [cube[4][2][2], cube[4][1][2], cube[4][0][2]] = [
        bottom[0],
        bottom[1],
        bottom[2],
      ];
    } else {
      [cube[0][2][0], cube[0][2][1], cube[0][2][2]] = [
        right[0],
        right[1],
        right[2],
      ];

      [cube[5][0][0], cube[5][1][0], cube[5][2][0]] = [
        bottom[0],
        bottom[1],
        bottom[2],
      ];

      [cube[1][0][2], cube[1][0][1], cube[1][0][0]] = [
        left[0],
        left[1],
        left[2],
      ];

      [cube[4][2][2], cube[4][1][2], cube[4][0][2]] = [up[0], up[1], up[2]];
    }
  }

  function RotateUp(dir) {
    RotateMain(0, dir);

    const front = [cube[2][0][0], cube[2][0][1], cube[2][0][2]];
    const left = [cube[4][0][0], cube[4][0][1], cube[4][0][2]];
    const back = [cube[3][2][2], cube[3][2][1], cube[3][2][0]];
    const right = [cube[5][0][0], cube[5][0][1], cube[5][0][2]];

    if (dir === "+") {
      [cube[2][0][0], cube[2][0][1], cube[2][0][2]] = [
        right[0],
        right[1],
        right[2],
      ];

      [cube[4][0][0], cube[4][0][1], cube[4][0][2]] = [
        front[0],
        front[1],
        front[2],
      ];

      [cube[3][2][2], cube[3][2][1], cube[3][2][0]] = [
        left[0],
        left[1],
        left[2],
      ];

      [cube[5][0][0], cube[5][0][1], cube[5][0][2]] = [
        back[0],
        back[1],
        back[2],
      ];
    } else {
      [cube[2][0][0], cube[2][0][1], cube[2][0][2]] = [
        left[0],
        left[1],
        left[2],
      ];

      [cube[4][0][0], cube[4][0][1], cube[4][0][2]] = [
        back[0],
        back[1],
        back[2],
      ];

      [cube[3][2][2], cube[3][2][1], cube[3][2][0]] = [
        right[0],
        right[1],
        right[2],
      ];

      [cube[5][0][0], cube[5][0][1], cube[5][0][2]] = [
        front[0],
        front[1],
        front[2],
      ];
    }
  }

  function RotateLeft(dir) {
    RotateMain(4, dir);

    const up = [cube[0][0][0], cube[0][1][0], cube[0][2][0]];
    const front = [cube[2][0][0], cube[2][1][0], cube[2][2][0]];
    const bottom = [cube[1][0][0], cube[1][1][0], cube[1][2][0]];
    const back = [cube[3][0][0], cube[3][1][0], cube[3][2][0]];

    if (dir === "+") {
      [cube[0][0][0], cube[0][1][0], cube[0][2][0]] = [
        back[0],
        back[1],
        back[2],
      ];

      [cube[2][0][0], cube[2][1][0], cube[2][2][0]] = [up[0], up[1], up[2]];

      [cube[1][0][0], cube[1][1][0], cube[1][2][0]] = [
        front[0],
        front[1],
        front[2],
      ];

      [cube[3][0][0], cube[3][1][0], cube[3][2][0]] = [
        bottom[0],
        bottom[1],
        bottom[2],
      ];
    } else {
      [cube[0][0][0], cube[0][1][0], cube[0][2][0]] = [
        front[0],
        front[1],
        front[2],
      ];

      [cube[2][0][0], cube[2][1][0], cube[2][2][0]] = [
        bottom[0],
        bottom[1],
        bottom[2],
      ];

      [cube[1][0][0], cube[1][1][0], cube[1][2][0]] = [
        back[0],
        back[1],
        back[2],
      ];

      [cube[3][0][0], cube[3][1][0], cube[3][2][0]] = [up[0], up[1], up[2]];
    }
  }

  function RotateMain(center, dir) {
    const index = [...cube[center][0], ...cube[center][1], ...cube[center][2]];

    if (dir === "+") {
      [cube[center][0][0], cube[center][0][1], cube[center][0][2]] = [
        index[6],
        index[3],
        index[0],
      ];

      [cube[center][1][0], cube[center][1][2]] = [index[7], index[1]];

      [cube[center][2][0], cube[center][2][1], cube[center][2][2]] = [
        index[8],
        index[5],
        index[2],
      ];
    } else {
      [cube[center][0][0], cube[center][0][1], cube[center][0][2]] = [
        index[2],
        index[5],
        index[8],
      ];

      [cube[center][1][0], cube[center][1][2]] = [index[1], index[7]];

      [cube[center][2][0], cube[center][2][1], cube[center][2][2]] = [
        index[0],
        index[3],
        index[6],
      ];
    }
  }

  function InitSetting() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) cube[1][i][j] = "y";
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) cube[2][i][j] = "r";
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) cube[3][i][j] = "o";
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) cube[4][i][j] = "g";
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) cube[5][i][j] = "b";
    }
  }
}
