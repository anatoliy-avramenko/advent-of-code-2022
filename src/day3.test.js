import fs from 'fs';
import { intersection } from 'lodash';

const isUppercase = (char) => {
  return char === char.toUpperCase();
}

const part1 = () => {
  const input = fs.readFileSync('src/day3-input.txt')
    .toString()
    .split('\n');

  const commonItems = [];
  input.forEach(row => {
    const rowMiddleIndex = row.length / 2;
    const compartment1 = row.slice(0, rowMiddleIndex);
    const compartment2 = row.slice(rowMiddleIndex);
    const [common] = intersection([...compartment1], [...compartment2]);
    commonItems.push(common);
  });

  let score = 0;
  commonItems.forEach((item) => {
    if (isUppercase(item)) {
      const charCodeShiftCoef = 38;
      score += item.charCodeAt() - charCodeShiftCoef;
    } else {
      const charCodeShiftCoef = 96;
      score += item.charCodeAt() - charCodeShiftCoef;
    }
  });
  return score;
}
const part2 = () => {
  const input = fs.readFileSync('src/day3-input.txt')
    .toString()
    .split('\n');

  const commonItems = [];
  for (let i = 0; i < input.length; i += 3) {
    const elf1 = input[i];
    const elf2 = input[i+1];
    const elf3 = input[i+2];
    const [common] = intersection([...elf1], [...elf2], [...elf3]);
    commonItems.push(common);
  }

  let score = 0;
  commonItems.forEach((item) => {
    if (isUppercase(item)) {
      const charCodeShiftCoef = 38;
      score += item.charCodeAt() - charCodeShiftCoef;
    } else {
      const charCodeShiftCoef = 96;
      score += item.charCodeAt() - charCodeShiftCoef;
    }
  });
  return score;
};

it('should ', () => {
  expect(part2()).toBeTruthy();
});
