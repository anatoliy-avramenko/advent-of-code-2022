import fs from 'fs';


const input = fs.readFileSync('src/day10-input.txt')
  .toString()
  .split('\n')
  .map((row) => row
    .split(' '),
  ).map((row) => {
    if (row[1]) {
      row[1] = Number(row[1]);
    }
    return row;
  });

const part1 = () => {
  let x = 1;
  let currentCycle = 0;
  const signals = [];
  const signalMilestones = [20, 60, 100, 140, 180, 220];
  input.forEach(([instr, value]) => {
    if (value) {
      for (let i = 0; i < 2; i++) {
        currentCycle += 1;
        if (signalMilestones.includes(currentCycle)) {
          signals.push(currentCycle * x);
        }
        x = (i === 1) ? x + value : x;
      }
    } else {
      currentCycle += 1;
      if (signalMilestones.includes(currentCycle)) {
        signals.push(currentCycle * x);
      }
    }
  });

  const res = signals.reduce((a, b) => a + b, 0);
  console.log(res);
};



const part2 = () => {
  let output = '';
  let spriteIndex = 1;
  let drawIndex = 0;
  const makeCycle = () => {
    if ([spriteIndex, spriteIndex - 1, spriteIndex + 1].includes(drawIndex)) {
      output += '#';
    } else {
      output += '.';
    }
    drawIndex += 1;
    if ((drawIndex % 40) === 0) {
      output += '\n';
      drawIndex = 0;
    }
  };

  input.forEach(([instr, value]) => {
    if (value) {
      for (let i = 0; i < 2; i++) {
        makeCycle();
        spriteIndex = (i === 1) ? spriteIndex + value : spriteIndex;
      }
    } else {
      makeCycle();
    }
  });
  console.log();
};

it('should ', () => {
  expect(part2()).toBeTruthy();
});


