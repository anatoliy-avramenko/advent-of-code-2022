import fs from 'fs';
import { intersection } from 'lodash';


const input = fs.readFileSync('src/day6-input.txt', 'utf8')
  .toString()
  .split('');

const part1 = () => {
  let markerFound = false;
  let targetIndex;
  const marker = input.reduce((acc, next, index) => {
    if (markerFound) {
      return acc;
    }
    if (acc.length < 14) {
      acc.push(next);
    }
    const allAreUnique = acc.length === new Set(acc).size;
    if (allAreUnique && acc.length === 14) {
      markerFound = true;
      targetIndex = index + 1;
    } else if (!allAreUnique){
      return acc.slice(1);
    }
    return acc;
  }, []).join('');
  console.log(targetIndex);

};

const part2 = () => {

};

it('should ', () => {
  expect(part1()).toBeTruthy();
});
