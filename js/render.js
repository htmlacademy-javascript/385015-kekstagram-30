import { openImage } from './picture-full.js';

const container = document.querySelector('.pictures');

let dataArray;

const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('.picture');

const fragment = document.createDocumentFragment();

const fillDataTemplate = (
  element,
  { id, url, description, likes, comments }
) => {
  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__img').alt = description;
  element.querySelector('.picture__comments').textContent = comments.length;
  element.querySelector('.picture__likes').textContent = likes;
  element.dataset.pictureId = id;
};

const onClickPreview = (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();

    const preview = evt.target.closest('.picture');
    const pictureID = Number(preview.dataset.pictureId);
    const pictureObject = dataArray.find((item) => item.id === pictureID);

    openImage(pictureObject);
  }
};

const clickPreview = () => {
  container.addEventListener('click', onClickPreview);
};

const resetBoard = () => {
  const pictureCollection = container.querySelectorAll('.picture');
  pictureCollection.forEach((element) => {
    element.remove();
  });
};

const renderBoard = (data) => {
  resetBoard();

  data.forEach((item) => {
    const element = template.cloneNode(true);

    fillDataTemplate(element, item);

    fragment.append(element);
  });

  container.append(fragment);
  clickPreview();
};

const initBorder = (data) => {
  dataArray = data;
  renderBoard(dataArray);
};

export { initBorder, renderBoard };
