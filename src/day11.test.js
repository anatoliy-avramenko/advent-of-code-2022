import fs from 'fs';



const getFromSplit = (input, targetIndex = null, splitBy = ' ') => {
  if (!targetIndex) {
    return input.split(splitBy);
  }
  return input.split(splitBy)[targetIndex]
};
class Monkey {
  constructor (input, monkeys, worryReductionCof = 3, div) {
    const inputSplit = input.split('\n').map(el => el.trim());
    this.count = getFromSplit(inputSplit[0], 1);
    this.items = getFromSplit(inputSplit[1])
      .slice(2)
      .map(el => parseInt(el));
    this.operationStr = getFromSplit(inputSplit[2]).slice(3).join('');
    this.divisible = Number(getFromSplit(inputSplit[3], 3));
    this.ifTrue = Number(getFromSplit(inputSplit[4], 5));
    this.ifFalse = Number(getFromSplit(inputSplit[5], 5));
    this.currentItem = null;
    this.monkeys = monkeys;
    this.count = 0;
    this.worryReductionCof = worryReductionCof;
    this.div = div;
  }

  _setCurrentItem() {
    let afterOperation = this._performOperation(this.items.shift());
    if (this.div[0]) {
      this.currentItem = afterOperation % this.div[0];
    } else {
      this.currentItem = Math.floor(afterOperation / this.worryReductionCof);
    }
  }

  _performOperation(old) {
    return eval(this.operationStr);
  }

  passCurrentToOther() {
    this._setCurrentItem();

    const targetMonkeyIndex = this.currentItem % this.divisible === 0 ? this.ifTrue : this.ifFalse;
    this.monkeys[targetMonkeyIndex].catchItem(this.currentItem);
    this.count += 1;
  }

  passAllItems() {
    const length = this.items.length;
    for (let i = 0; i < length; i++) {
      this.passCurrentToOther();
    }
  }

  catchItem(item) {
    console.log(item);
    this.items.push(item);
  }
}

const input = fs.readFileSync('src/day11-input.txt')
  .toString()
  .split('\n\n');


const part1 = () => {
  const monkeys = {};
  input.forEach((monkey, index) => {
    monkeys[index] = new Monkey(monkey, monkeys);

  }, {});

  for (let i = 0; i < 20; i++) {
    Object.values(monkeys).forEach((monkey, monkeyIndex) => {
      monkey.passAllItems();
    });
  }
  const counts = Object.values(monkeys).map((monkey) => monkey.count);
  const max = Math.max(...counts);
  const counts2 = counts.filter(el => el !== max);
  const max2 = Math.max(...counts2);
  const res = max * max2;

  return res;
};



const part2 = () => {
  const monkeys = {};
  let divider = [];
  input.forEach((monkey, index) => {
    monkeys[index] = new Monkey(monkey, monkeys, 1, divider);
  }, {});
  divider.push(Object.values(monkeys).reduce((acc, next) => acc * next.divisible, 1));

  for (let i = 0; i < 10000; i++) {
    Object.values(monkeys).forEach((monkey, monkeyIndex) => {
      monkey.passAllItems();
    });
  }
  const counts = Object.values(monkeys).map((monkey) => monkey.count);
  const max = Math.max(...counts);
  const counts2 = counts.filter(el => el !== max);
  const max2 = Math.max(...counts2);
  const res = max * max2;

  console.log();
};

it('should ', () => {
  expect(part2()).toBeTruthy();
});


