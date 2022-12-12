import fs from 'fs';


const input = fs.readFileSync('src/day9-input.txt')
  .toString()
  .split('\n')
  .map(row => row.split(' '))
  .map(row => {
    row[1] = Number(row[1]);
    return row;
  });

const updateHeads = (direction, position) => {
  switch (direction) {
    case 'R':
      position.x += 1;
      break;
    case 'L':
      position.x -= 1;
      break;
    case 'U':
      position.y += 1;
      break;
    case 'D':
      position.y -= 1;
      break;
  }
};
const part1 = () => {
  const positionH = {
    x: 0,
    y: 0,
  };
  const positionHPrev = {
    x: 0,
    y: 0,
  };
  const positionT = {
    x: 0,
    y: 0,
  };
  const visited = new Set();
  input.forEach(([direction, steps]) => {
    visited.add(`${ positionT.x }-${ positionT.y }`);
    for (let i = 0; i < steps; i++) {
      positionHPrev.x = positionH.x;
      positionHPrev.y = positionH.y;
      updateHeads(direction, positionH);
      const yBehind = Math.abs(positionH.y - positionT.y);
      const xBehind = Math.abs(positionH.x - positionT.x);
      if (yBehind > 1 || xBehind > 1) {
        positionT.x = positionHPrev.x;
        positionT.y = positionHPrev.y;
        visited.add(`${ positionT.x }-${ positionT.y }`);
      }
    }
  });
  return visited;
};

const part2 = () => {
  const positions = {};
  Array(10).fill(null).forEach((x, i) => positions[i] = { x: 0, y: 0 });
  const visited = new Set();
  visited.add('0-0');

  input.forEach(([direction, steps]) => {
    for (let i = 0; i < steps; i++) {
      Object.keys(positions).forEach((knotIndex) => {
        const isHead = knotIndex === '0';
        const isTale = knotIndex === '9';
        if (isHead) {
          updateHeads(direction, positions['0']);
        } else {
          const tale = positions[knotIndex];
          const head = positions[knotIndex - 1];

          const yBehind = Math.abs(head.y - tale.y);
          const xBehind = Math.abs(head.x - tale.x);
          const isDiagonallyBehind = (xBehind + yBehind) > 2;
          if (isDiagonallyBehind) {
            tale.x = (head.x - tale.x) > 0 ? (tale.x + 1) : (tale.x - 1);
            tale.y = (head.y - tale.y) > 0 ? (tale.y += 1) : (tale.y -= 1);
          } else if (xBehind > 1) {
            tale.x = (head.x - tale.x) > 0 ? (tale.x + 1) : (tale.x - 1);
          } else if (yBehind > 1) {
            tale.y = (head.y - tale.y) > 0 ? (tale.y += 1) : (tale.y -= 1);
          }
          if (isTale) {
            visited.add(`${ tale.x }-${ tale.y }`);
          }
        }
      })

    }
  });
  return visited;
};

it('should ', () => {
  expect(part2()).toBeTruthy();
});
