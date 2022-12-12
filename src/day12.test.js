import fs from 'fs';

const directory = {};
const rows = fs.readFileSync('src/day12-input.txt')
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
const visited = {};
const yLength = rows.length;
const xLength = rows[0].length;

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
const start = findInMatrix(0);
const end = findInMatrix(27);

const parseCoords = (coords) => {
  return coords.split('-').map(el => parseInt(el));
};

const getNeighbours = (coords, val) => {
  // should be neighbour
  // should be valid elevation
  // should be directed towards destination
  const lastYIndex = yLength - 1;
  const lastXIndex = xLength - 1;
  const neighbours = {};
  const [y, x] = parseCoords(coords);
  const upY = (y !== 0 ? y - 1 : null);
  const up = Number.isInteger(upY) ? `${upY}-${x}` : null;

  const downY = (y !== lastYIndex ? y + 1 : null);
  const down = Number.isInteger(downY) ? `${downY}-${x}` : null;

  const leftX = (x !== 0 ? x - 1 : null);
  const left = Number.isInteger(leftX) ? `${y}-${leftX}` : null;

  const rightX = (x !== lastXIndex ? x + 1 : null);
  const right = Number.isInteger(rightX) ? `${y}-${rightX}` : null;
  const availableNeighbours = [up, down, left, right]
    .filter(Boolean)
    .filter(neighbour => {
      return !visited[neighbour] && Math.abs(directory[neighbour] - val) < 2;
    })
    .reduce((acc, neigh) => {
      const [endY, endX] = parseCoords(end);
      const [neighY, neighX] = parseCoords(neigh);
      let score = Math.abs(endY - neighY) + Math.abs(endX - neighX);
      const isIncrease = (directory[neigh] - val) === 1;
      const isEnd = directory[neigh] === 'E';
      acc.push({
        coords: neigh,
        val: directory[neigh],
        score: isEnd ? Infinity : (isIncrease ? score - 1 : score),
      });
      return acc;
    }, [])
    .sort((a, b) => a.score - b.score);

  return availableNeighbours;
};

const part1 = () => {
  let stepsCounter = 0;
  let currentCoords = start;
  let currentVal = directory[currentCoords];
  visited[currentCoords] = true;
  const makeStep = () => {
    const potentialSteps = getNeighbours(currentCoords, currentVal);
    currentCoords = (potentialSteps[0]).coords;
    currentVal = directory[currentCoords];
    visited[(potentialSteps[0]).coords] = true;

    console.log();
  };

  while (true) {
    makeStep();
    stepsCounter += 1;
    if (currentCoords === end) {
      break;
    }
  }
  return stepsCounter;
  console.log(rows);
};



const part2 = () => {

  console.log();
};

it('should ', () => {
  expect(part1()).toBeTruthy();
});


