const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const commands = {
  R: [0, 1],
  L: [0, -1],
  B: [-1, 0],
  T: [1, 0],
  RT: [1, 1],
  LT: [1, -1],
  RB: [-1, 1],
  LB: [-1, -1],
};

const [kingPos, stonePos, moveCnt] = input[0].trimEnd().split(" ");
const moves = input.slice(1, 1 + moveCnt).map((el) => el.trimEnd());

const king = {
  y: +kingPos[1],
  x: kingPos[0].charCodeAt() - 64,
};

const stone = {
  y: +stonePos[1],
  x: stonePos[0].charCodeAt() - 64,
};

moves.forEach((move) => {
  const [ny, nx] = commands[move];
  const [nextKingY, nextKingX] = [king.y + ny, king.x + nx];

  if (nextKingY < 1 || nextKingX < 1 || nextKingY > 8 || nextKingX > 8) return;

  if (nextKingY === stone.y && nextKingX === stone.x) {
    const [nextStoneY, nextStoneX] = [stone.y + ny, stone.x + nx];

    if (nextStoneY < 1 || nextStoneX < 1 || nextStoneY > 8 || nextStoneX > 8)
      return;

    stone.y = nextStoneY;
    stone.x = nextStoneX;
  }

  king.y = nextKingY;
  king.x = nextKingX;
});

const answerKing = `${String.fromCodePoint(64 + king.x)}${king.y}`;
const answerStone = `${String.fromCodePoint(64 + stone.x)}${stone.y}`;

console.log(answerKing + "\n" + answerStone);
