import fs from 'fs';
import { intersection } from 'lodash';


const input = fs.readFileSync('src/day7-input.txt')
  .toString()
  .split('\n');

const part1 = () => {
  const dirs = {};
  let currentPath = [];
  let isListing = false;
  input.forEach(line => {
    const isLineDir = line.split(' ')[0] === 'dir';
    if (line === '$ cd ..') {
      isListing = false;
      currentPath.pop();
    } else if (line !== '$ cd /' && line.includes('cd')) {
      isListing = false;
      const cdDir = line.split(' ')[2];
      currentPath.push(cdDir);
      const pathStr = currentPath.join('');
      dirs[pathStr] = dirs[pathStr] || 0;
    } else if (line === '$ ls') {
      isListing = true;
    } else if (isListing && !isLineDir) {
      const size = Number(line.split(' ')[0]);
      const pathStr = currentPath.join('');
      currentPath.forEach((path, index) => {
        const targetPath = [...currentPath].splice(0, index + 1).join('');
        dirs[targetPath] += size;
      });
    }
  });
  const res = Object.values(dirs).reduce((acc, next) => {
    if (next <= 100000) {
      return acc + next;
    }
    return acc;
  }, 0);
  console.log();
};

const part2 = () => {
  const dirs = {};
  let currentPath = [];
  let isListing = false;
  input.forEach(line => {
    const isLineDir = line.split(' ')[0] === 'dir';
    if (line === '$ cd ..') {
      isListing = false;
      currentPath.pop();
    } else if (line.includes('$ cd')) {
      isListing = false;
      const cdDir = line.split(' ')[2];
      currentPath.push(cdDir);
      const pathStr = currentPath.join('/');
      dirs[pathStr] = dirs[pathStr] || 0;
    } else if (line === '$ ls') {
      isListing = true;
    } else if (isListing && !isLineDir) {
      const size = Number(line.split(' ')[0]);
      currentPath.forEach((path, index) => {
        const targetPath = [...currentPath].splice(0, index + 1).join('/');
        dirs[targetPath] += size;
      });
    }
  });
  const freeSpace = 70000000 - dirs['main'];
  const lacking = 30000000 - freeSpace;
  let lowest = Infinity;
  Object.values(dirs).forEach(dir => {
    if ((dir >= lacking) && (dir < lowest)) {
      lowest = dir;
    }
  });
  console.log();

};

it('should ', () => {
  expect(part2()).toBeTruthy();
});
