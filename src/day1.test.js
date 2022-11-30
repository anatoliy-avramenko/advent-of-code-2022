import fs from 'fs';

const part1 = () => {
  const input = fs.readFileSync('src/day2-input.txt')
    .toString();
  console.log(input);
}

it('should ', () => {
  expect(part1()).toBeTruthy();
});