import { EventOptions, addHandlers } from './util.js';
import { openImage } from './picture-full.js';

const container = document.querySelector('.pictures');

let data;

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

const onPreviewClick = (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();

    const preview = evt.target.closest('.picture');
    const pictureID = Number(preview.dataset.pictureId);
    const pictureObject = data.find((item) => item.id === pictureID);

    openImage(pictureObject);
  }
};

const clickPreview = () => {
  addHandlers([[container, EventOptions.TYPE.CLICK, onPreviewClick]]);
};

const resetBoard = () => {
  const pictureCollection = container.querySelectorAll('.picture');
  pictureCollection.forEach((element) => {
    element.remove();
  });
};

const renderBoard = (pictures) => {
  resetBoard();

  pictures.forEach((item) => {
    const element = template.cloneNode(true);

    fillDataTemplate(element, item);

    fragment.append(element);
  });

  container.append(fragment);
  clickPreview();
};

const initBorder = (pictures) => {
  data = pictures;
  renderBoard(data);
};

export { initBorder, renderBoard };
