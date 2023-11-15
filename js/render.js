import { openImage } from './picture-full.js';
const container = document.querySelector('.pictures');

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
  element.dataset.pictureID = id;
};

const clickPreview = (dataArray) => {
  container.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      evt.preventDefault();

      const preview = evt.target.closest('.picture');
      const pictureID = Number(preview.dataset.pictureID);
      const pictureObject = dataArray.find((item) => item.id === pictureID);

      openImage(pictureObject);
    }
  });
};

const resetBoard = () => {
  const pictureCollection = container.querySelectorAll('.picture');
  pictureCollection.forEach((element) => {
    element.remove();
  });
};

const renderBoard = (dataArray) => {
  resetBoard();

  dataArray.forEach((item) => {
    const element = template.cloneNode(true);

    fillDataTemplate(element, item);

    fragment.append(element);
  });

  container.append(fragment);
  clickPreview(dataArray);
};

const initBorder = (dataArray) => {
  renderBoard(dataArray);
};

export { initBorder, renderBoard };
