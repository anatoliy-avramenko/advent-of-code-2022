import fs from 'fs';
import { intersection } from 'lodash';


const prepareData = () => {
  const [stackRaw, instructionsRaw] = fs.readFileSync('src/day5-input.txt')
    .toString()
    .split('\n\n');

  const stack = stackRaw
    .split('\n')
    .map(row => row.split(' '));

  const instructions = instructionsRaw
    .split('\n')
    .map(row => {
      return row.split(' ')
        .map(word => Number(word))
        .filter(Boolean);
    });

  const stackSize = stack[stack.length - 1].length;
  let skipUntilIndex = null;
  let skipCycleStarted = false;
  const stacksDirectoryRaw = stack.map((row) => {
    return row.reduce((acc, next, index) => {
      if (next.length === 3) {
        acc.push(next[1]);
      }
      if (next === '' && !skipCycleStarted) {
        skipCycleStarted = true;
        skipUntilIndex = index + 3;
      }
      if (index === skipUntilIndex) {
        acc.push(null);
        skipCycleStarted = false;
      }
      return acc;
    }, []);
  });
  const stacksDirectory = stacksDirectoryRaw.reverse().reduce((acc, row) => {
    return row.reduce((accum, crate, index) => {
      if (!accum[index + 1]) {
        accum[index + 1] = [];
      }
      if (crate) {
        accum[index + 1].push(crate);
      }
      return accum;
    }, acc);
  }, {});

  return {
    stacks: stacksDirectory,
    instructions
  }
}



const part1 = () => {
  const { stacks, instructions } = prepareData();
  instructions.forEach(([count, source, target]) => {
    while (count) {
      const crate = stacks[source].pop();
      stacks[target].push(crate);
      count--;
    }
  });

  const res = Object.values(stacks).reduce((acc, next) => {
    return acc + next.pop();
  }, '');
  console.log();
};

const part2 = () => {
  const { stacks, instructions } = prepareData();
  instructions.forEach(([count, source, target]) => {
    const crates = stacks[source].splice(0 - count);
    stacks[target].push(...crates);
  });

  const res = Object.values(stacks).reduce((acc, next) => {
    return acc + next.pop();
  }, '');
  console.log();

};

it('should ', () => {
  expect(part2()).toBeTruthy();
});
