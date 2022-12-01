import fs from 'fs';

const part1 = () => {
  const input = fs.readFileSync('src/day1-input.txt')
    .toString()
    .split('\n\n')
    .map(el => el
      .split('\n')
      .map(el => Number(el))
    );

  let max = [];
  input.forEach(elf => {
    const sum = elf.reduce((acc, next) => acc + next, 0);
    if (sum > max) {
      max = sum;
    }
  });

  return max;
}
const part2 = () => {
  const input = fs.readFileSync('src/day1-input.txt')
    .toString()
    .split('\n\n')
    .map(el => el
      .split('\n')
      .map(el => Number(el))
    );

  let maxArr = [];
  input.forEach(elf => {
    const sum = elf.reduce((acc, next) => acc + next, 0);
    maxArr.push(sum);
  });

  return maxArr.sort((a,b,) => a - b)
    .slice(-3)
    .reduce((a, b) => +a + +b, 0);
};
