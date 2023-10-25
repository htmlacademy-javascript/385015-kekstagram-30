const container = document.querySelector('.pictures');

const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('.picture');

const fragment = document.createDocumentFragment();

const fillDataTemplate = (element, data) => {
  element.querySelector('.picture__img').src = data.url;
  element.querySelector('.picture__img').alt = data.description;
  element.querySelector('.picture__comments').textContent =
    data.comments.length;
  element.querySelector('.picture__likes').textContent = data.likes;
};

const render = (dataArray) => {
  dataArray.forEach((item) => {
    const element = template.cloneNode(true);

    fillDataTemplate(element, item);

    fragment.appendChild(element);
  });

  container.append(fragment);
};

export { render };
