import fs from 'fs';
import { intersection } from 'lodash';


const part1 = () => {
  const input = fs.readFileSync('src/day4-input.txt')
    .toString()
    .split('\n')
    .map(elfPair => elfPair
      .split(',')
      .map(elf => elf
        .split('-')
        .map(el => Number(el))
      )
    );

  let count = 0;
  input.forEach(pair => {
    const elvesNums = [];
    pair.forEach(([start, end]) => {
      const elfNums = [];
      for (let i = start; i <= end; i++) {
        elfNums.push(i);
      }
      elvesNums.push(elfNums);
    });
    const isFullIntersectionA = elvesNums[0].every(num => elvesNums[1].includes(num));
    const isFullIntersectionB = elvesNums[1].every(num => elvesNums[0].includes(num));
    if (isFullIntersectionA || isFullIntersectionB) {
      count += 1;
    }
  });

  return count;
}
const part2 = () => {
  const input = fs.readFileSync('src/day4-input.txt')
    .toString()
    .split('\n')
    .map(elfPair => elfPair
      .split(',')
      .map(elf => elf
        .split('-')
        .map(el => Number(el))
      )
    );

  let count = 0;
  input.forEach(pair => {
    const elvesNums = [];
    pair.forEach(([start, end]) => {
      const elfNums = [];
      for (let i = start; i <= end; i++) {
        elfNums.push(i);
      }
      elvesNums.push(elfNums);
    });
    const isIntersection = intersection(...elvesNums);
    if (isIntersection.length) {
      count += 1;
    }
  });

  return count;
};

it('should ', () => {
  expect(part2()).toBeTruthy();
});
