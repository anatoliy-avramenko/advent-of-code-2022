import fs from 'fs';
import { intersection } from 'lodash';
y
const x = 'x';
const y = 'y';

const calculateDistance = (row, index, currentTree, isLeft) => {
  let limitReached = false;
  const targetLine = isLeft
    ? row.slice(0, index).reverse()
    : row.slice(index + 1);
  return targetLine.reduce((acc, next) => {
    if (limitReached) {
      return acc;
    } else if (next >= currentTree) {
      acc += 1;
      limitReached = true;
    } else if (next < currentTree) {
      acc += 1;
    }
    return acc;
  }, 0);
}

const input = fs.readFileSync('src/day8-input.txt')
  .toString()
  .split('\n')
  .map(row => row.split('').map(Number));


// make directory of x and y arrays
// iterate over elements
// push visible to Set
const part1 = () => {
  const rowsYDirectory = {};
  const visible = new Set();
  input.forEach((xRow, yIndex) => {
    xRow.forEach((xEl, xIndex) => {
      rowsYDirectory[xIndex] = rowsYDirectory[xIndex] || [];
      rowsYDirectory[xIndex].push(xEl);

      if (visible.has(`${xIndex}-${yIndex}`)) {
        return;
      }

      const leftSide = xRow.slice(0, xIndex);
      const rightSide = xRow.slice(xIndex + 1);

      const isVisible =  !leftSide.length || !rightSide.length
        || leftSide.every((tree) => tree < xEl)
        || rightSide.every((tree) => tree < xEl);
      if (isVisible) {
        visible.add(`${xIndex}-${yIndex}`);
      }
    });
  });

  Object.values(rowsYDirectory).forEach((yRow, xIndex) => {
    yRow.forEach((yEl, yIndex) => {
      if (visible.has(`${xIndex}-${yIndex}`)) {
        return;
      }
      const leftSide = yRow.slice(0, yIndex);
      const rightSide = yRow.slice(yIndex + 1);

      const isVisible = !leftSide.length || !rightSide.length
        || leftSide.every((tree) => tree < yEl)
        || rightSide.every((tree) => tree < yEl);
      if (isVisible) {
        visible.add(`${xIndex}-${yIndex}`);
      }
    });
  });

  const res = visible.size;
  console.log(res);
};

const part2 = () => {
  const treesDirectory = {};
  const rowsYDirectory = {};
  input.forEach((xRow, yIndex) => {
    xRow.forEach((xEl, xIndex) => {
      rowsYDirectory[xIndex] = rowsYDirectory[xIndex] || [];
      rowsYDirectory[xIndex].push(xEl);
      const leftDist = calculateDistance(xRow, xIndex, xEl, true);
      const rightDist = calculateDistance(xRow, xIndex, xEl, false);
      const xDist = leftDist * rightDist;
      treesDirectory[`${xIndex}-${yIndex}`] = xDist;
    });
  });

  Object.values(rowsYDirectory).forEach((yRow, xIndex) => {
    yRow.forEach((yEl, yIndex) => {
      const leftDist = calculateDistance(yRow, yIndex, yEl, true);
      const rightDist = calculateDistance(yRow, yIndex, yEl, false);
      const yDist = leftDist * rightDist;
      treesDirectory[`${xIndex}-${yIndex}`] = treesDirectory[`${xIndex}-${yIndex}`] * yDist;
    });
  });

  const res = Math.max(...Object.values(treesDirectory));
  console.log(res);
};

it('should ', () => {
  expect(part2()).toBeTruthy();
});
