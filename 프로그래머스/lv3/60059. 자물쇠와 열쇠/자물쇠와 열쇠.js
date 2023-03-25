function solution(key, lock) {
  const KEY_SIZE = key.length;
  const LOCK_SIZE = lock.length;
  const MAX_SIZE = 20;

  const key2 = rotateKey(key);
  const key3 = rotateKey(key2);
  const key4 = rotateKey(key3);

  const lockMap = Array.from({ length: MAX_SIZE * 3 }, () =>
    new Array(MAX_SIZE * 3).fill(0)
  );

  for (let i = 0; i < LOCK_SIZE; i++) {
    for (let j = 0; j < LOCK_SIZE; j++) {
      lockMap[i + MAX_SIZE][j + MAX_SIZE] = lock[i][j];
    }
  }

  if (checkKey(key)) return true;
  if (checkKey(key2)) return true;
  if (checkKey(key3)) return true;
  if (checkKey(key4)) return true;

  return false;

  function checkKey(currKey) {
    let isPossible = false;

    for (let i = 1; i < 2 * MAX_SIZE; i++) {
      for (let j = 1; j < 2 * MAX_SIZE; j++) {
        let isFit = true;

        for (let y = 0; y < KEY_SIZE; y++) {
          for (let x = 0; x < KEY_SIZE; x++) {
            lockMap[i + y][j + x] += currKey[y][x];
          }
        }

        for (let y = 0; y < LOCK_SIZE; y++) {
          for (let x = 0; x < LOCK_SIZE; x++) {
            if (lockMap[MAX_SIZE + y][MAX_SIZE + x] !== 1) {
              isFit = false;
              break;
            }
          }
        }

        if (isFit) {
          isPossible = true;
        }

        for (let y = 0; y < KEY_SIZE; y++) {
          for (let x = 0; x < KEY_SIZE; x++) {
            lockMap[i + y][j + x] -= currKey[y][x];
          }
        }
      }
    }

    return isPossible;
  }

  function rotateKey(prevKey) {
    const copyKey = Array.from({ length: KEY_SIZE }, () =>
      new Array(KEY_SIZE).fill(0)
    );

    for (let i = 0; i < KEY_SIZE; i++) {
      for (let j = 0; j < KEY_SIZE; j++) {
        copyKey[j][KEY_SIZE - i - 1] = prevKey[i][j];
      }
    }

    return copyKey;
  }
}