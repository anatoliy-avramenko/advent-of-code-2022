import fs from 'fs';

const a = 'A';
const b = 'B';
const c = 'C';
const x = 'X';
const y = 'Y';
const z = 'Z';
const lossCode = 'X';
const drawCode = 'Y';
const winCode = 'Z';

const rock = [a, x];
const paper = [b, y];
const scissors = [c, z];
const win = 'win';
const loss = 'loss';
const draw = 'draw';

const weaponsMapping = new Map();
weaponsMapping.set(rock, scissors);
weaponsMapping.set(paper, rock);
weaponsMapping.set(scissors, paper);

const scoreMapping = new Map();
scoreMapping.set(win, 6);
scoreMapping.set(loss, 0);
scoreMapping.set(draw, 3);
scoreMapping.set(rock, 1);
scoreMapping.set(paper, 2);
scoreMapping.set(scissors, 3);

const getWinWeapon = (oppWeapon) => {
  const [winner, looser] = Array(...weaponsMapping.entries()).find(([key, val]) => val === oppWeapon);
  return winner;
}
const getWeapon = (val) => {
  return [rock, paper, scissors]
    .filter(pair => pair.includes(val))[0];
};

const part1 = () => {
  const input = fs.readFileSync('src/day2-input.txt')
    .toString()
    .split('\n')
    .map(el => el
      .split(' ')
    );

  let myScore = 0;
  input.forEach(([a, b]) => {
    const oppWeapon = getWeapon(a);
    const myWeapon = getWeapon(b);
    const myWin = Boolean(weaponsMapping.get(myWeapon) === oppWeapon);
    const oppWin = Boolean(weaponsMapping.get(oppWeapon) === myWeapon);
    const meOppDraw = oppWeapon === myWeapon;

    if (oppWin) {
      myScore = myScore + scoreMapping.get(loss) + scoreMapping.get(myWeapon);
    } else if (myWin) {
      myScore = myScore + scoreMapping.get(win) + scoreMapping.get(myWeapon);
    } else if (meOppDraw) {
      myScore = myScore + scoreMapping.get(draw) + scoreMapping.get(myWeapon);
    }
  });

  return myScore;
}
const part2 = () => {
  const input = fs.readFileSync('src/day2-input.txt')
    .toString()
    .split('\n')
    .map(el => el
      .split(' ')
    );

  let myScore = 0;
  input.forEach(([a, gameResult]) => {
    const oppWeapon = getWeapon(a);

    if (gameResult === winCode) {
      let myWeapon = getWinWeapon(oppWeapon);
      myScore = myScore + scoreMapping.get(win) + scoreMapping.get(myWeapon);
    } else if (gameResult === lossCode) {
      let myWeapon = weaponsMapping.get(oppWeapon);
      myScore = myScore + scoreMapping.get(loss) + scoreMapping.get(myWeapon);
    } else if (gameResult === drawCode) {
      let myWeapon = oppWeapon;
      myScore = myScore + scoreMapping.get(draw) + scoreMapping.get(myWeapon);
    }
  });

  return myScore;
};

// ax rock
// by paper
// cz scissors
it('should ', () => {
  expect(part2()).toBeTruthy();
});
