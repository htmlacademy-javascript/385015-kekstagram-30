const container = document.querySelector('.pictures');

const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('.picture');

const fragment = document.createDocumentFragment();

const fillDataTemplate = (element, { url, description, likes, comments }) => {
  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__img').alt = description;
  element.querySelector('.picture__comments').textContent = comments.length;
  element.querySelector('.picture__likes').textContent = likes;
};

const render = (dataArray) => {
  dataArray.forEach((item) => {
    const element = template.cloneNode(true);

    fillDataTemplate(element, item);

    fragment.append(element);
  });

  container.append(fragment);
};

export { render };
