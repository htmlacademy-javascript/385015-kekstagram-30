const MESSAGE_TIMEOUT = 5000;
const container = document.body;

let overlayMessage;
let buttonMessage;
let callbackModal;

const onButtonMessageClick = () => {
  resetElement();
};

const onOverlayMessageClick = (evt) => {
  const blockMessage = document.querySelector('.success__inner');

  if (evt.target !== blockMessage) {
    resetElement();
  }
};

const onMessageKeydown = (evt) => {
  if (evt.key === 'Escape') {
    resetElement();
  }
};

const showMessage = (templateName, cb = null) => {
  const templateFragment = document.querySelector(`#${templateName}`).content;
  const template = templateFragment.querySelector(`.${templateName}`);

  callbackModal = cb;

  const element = template.cloneNode(true);

  const fragment = document.createDocumentFragment();
  fragment.append(element);

  container.append(fragment);

  overlayMessage = document.querySelector(`.${templateName}`);
  buttonMessage = overlayMessage.querySelector('button');

  if (templateName === 'data-error') {
    setTimeout(() => {
      container.removeChild(overlayMessage);
    }, MESSAGE_TIMEOUT);
  } else {
    buttonMessage.addEventListener('click', onButtonMessageClick);
    overlayMessage.addEventListener('click', onOverlayMessageClick);
    document.addEventListener('keydown', onMessageKeydown);
    document.removeEventListener('keydown', callbackModal);
  }
};

function resetElement() {
  container.removeChild(overlayMessage);

  buttonMessage.removeEventListener('click', onButtonMessageClick);
  overlayMessage.removeEventListener('click', onOverlayMessageClick);
  document.removeEventListener('keydown', onMessageKeydown);
  document.addEventListener('keydown', callbackModal);
}

export { showMessage };
