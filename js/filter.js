import { renderBoard } from './render.js';
import { getRandom, debounce } from './util.js';

const COUNT_RANDOM_PHOTOS = 10;
const OPACITY_NONE = 1;
const TIMEOUT_SETINTERVAL = 500;

const filterContainer = document.querySelector('.img-filters');
const filterForm = filterContainer.querySelector('form');
const filterButtons = filterForm.querySelectorAll('button');

let data;
let buttonID;

const Filter = {
  DEFAULT: 'filter-default',
  DISCUSSED: 'filter-discussed',
  RANDOM: 'filter-random',
};

const sortPictures = () =>
  data.slice().sort((a, b) => b.comments.length - a.comments.length);

const getRandomIndexes = () => {
  const randomeIndexes = [];

  const indexMin = 0;
  const indexMax = data.length - 1;

  for (let i = indexMin; i < COUNT_RANDOM_PHOTOS; i++) {
    let currentValue = getRandom(indexMin, indexMax);

    while (randomeIndexes.includes(currentValue)) {
      currentValue = getRandom(indexMin, indexMax);
    }
    randomeIndexes.push(currentValue);
  }

  return randomeIndexes;
};

const getRandomPictures = () => {
  const randomPictures = [];

  getRandomIndexes().forEach((index) => randomPictures.push(data[index]));

  return randomPictures;
};

const getPictures = (filter) => {
  switch (filter) {
    case Filter.DEFAULT:
      return data;
    case Filter.DISCUSSED:
      return sortPictures();
    case Filter.RANDOM:
      return getRandomPictures();
  }
};

const setButtonClick = (cb) => {
  filterForm.addEventListener('click', (evt) => {
    buttonID = evt.target.getAttribute('id');

    if (buttonID) {
      filterButtons.forEach((button) => {
        button.classList.remove('img-filters__button--active');
      });
      evt.target.classList.add('img-filters__button--active');

      cb();
    }
  });
};

const initFilter = (pictures) => {
  data = pictures;

  setButtonClick(
    debounce(() => renderBoard(getPictures(buttonID)), TIMEOUT_SETINTERVAL)
  );

  filterContainer.style.opacity = OPACITY_NONE;
};

export { initFilter };
