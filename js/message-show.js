const showMessage = (templateName) => {
  const MESSAGE_TIMEOUT = 5000;
  const container = document.body;
  const templateFragment = document.querySelector(`#${templateName}`).content;
  const template = templateFragment.querySelector(`.${templateName}`);
  const element = template.cloneNode(true);

  const fragment = document.createDocumentFragment();
  fragment.append(element);

  container.append(fragment);

  const message = document.querySelector(`.${templateName}`);
  const buttonMessage = message.querySelector('button');

  function onButtonMessageClick() {
    container.removeChild(message);

    buttonMessage.removeEventListener('click', onButtonMessageClick);
  }

  if (templateName === 'data-error') {
    setTimeout(() => {
      container.removeChild(message);
    }, MESSAGE_TIMEOUT);
  } else {
    buttonMessage.addEventListener('click', onButtonMessageClick);
  }
};

export { showMessage };
