const container = document.querySelector('.pictures');
import { openModal } from './picture-full.js';

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

  // получение массива комментариев происходит через id изображения
  // id может быть у превью/фулл изображения и аватарки
  // поэтому чтобы id не смогли "пересекаться" - я сделал через добавление скрытого узла
  const picureID = document.createElement('input');
  picureID.classList.add('picture__id');
  picureID.type = 'hidden';
  picureID.textContent = id;

  element.append(picureID);
};

const clickPreview = (dataArray) => {
  container.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      evt.preventDefault();

      const preview = evt.target.closest('.picture');
      const pictureID = Number(
        preview.querySelector('.picture__id').textContent
      );
      const pictureObject = dataArray.filter(
        (item) => item.id === pictureID
      )[0];

      openModal(pictureObject);
    }
  });
};

const render = (dataArray) => {
  document.createElement('ul');

  dataArray.forEach((item) => {
    const element = template.cloneNode(true);

    fillDataTemplate(element, item);

    fragment.append(element);
  });

  container.append(fragment);
  clickPreview(dataArray);
};

export { render };
