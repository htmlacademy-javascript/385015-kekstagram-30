const getRandom = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandom(min, max);

    while (previousValues.includes(currentValue)) {
      currentValue = getRandom(min, max);
    }

    previousValues.push(currentValue);
    return currentValue;
  };
};

export { getRandom, createRandomIdFromRangeGenerator };
