import fs from 'fs';

const findInMatrix = (el) => {
  let targetIndex;
  Object.entries(directory).find(([index, val]) => {
    if (val === el) {
      targetIndex = index;
    }
    return val === el;
  })
  return targetIndex;
};
const parseCoords = (coords) => {
  return coords.split('-').map(el => Number(el));
}

const directory = {};
const open = [];
const closed = [];
fs.readFileSync('src/day12-input.txt')
  .toString()
  .split('\n')
  .map((row, y) => row
    .split('')
    .map((char, x) => {
      const isStart = char === 'S';
      const isEnd = char === 'E';
      const el = isStart ? 0 : (isEnd ? 27 : char.charCodeAt(0) - 96);
      directory[`${y}-${x}`] = el;
      return el;
    })
  );
const start = findInMatrix(0);
const [startY, startX] = parseCoords(start);
const end = findInMatrix(27);
const [endY, endX] = parseCoords(end);

class Node {
  constructor(coords, value) {
    this.coordsStr = coords;
    const [y, x] = parseCoords(coords);
    this.y = y;
    this.x = x;
    this.value = directory[coords];
    this.parentNode = null;
    this.totalCost = 0;
    this.toStart = 0;
    this.toEnd = 0;
  }
}




const part1 = () => {
  const startingNode = new Node(start);
  console.log();
};



const part2 = () => {

  console.log();
};

it('should ', () => {
  expect(part1()).toBeTruthy();
});


