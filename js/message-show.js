import { EventOptions, addHandlers, removeHandlers } from './util.js';

const MESSAGE_TIMEOUT = 5000;

const container = document.body;

let overlayMessage;
let buttonMessage;
let callbackModal;

const onButtonMessageClick = () => {
  resetElement();
};

const onOverlayMessageClick = (evt) => {
  const successMessage = document.querySelector('.success__inner');
  const errorMessage = document.querySelector('.error__inner');

  if (evt.target !== successMessage && evt.target !== errorMessage) {
    resetElement();
  }
};

const onMessageKeydown = (evt) => {
  if (evt.key === 'Escape') {
    resetElement();
  }
};

const handlers = [[document, EventOptions.TYPE.KEYDOWN, onMessageKeydown]];

const showMessage = (templateName, cb = null) => {
  const templateFragment = document.querySelector(`#${templateName}`).content;
  const template = templateFragment.querySelector(`.${templateName}`);
  let errorServer;

  callbackModal = cb;

  const element = template.cloneNode(true);

  const fragment = document.createDocumentFragment();
  fragment.append(element);

  container.append(fragment);

  overlayMessage = document.querySelector(`.${templateName}`);
  handlers.push([
    overlayMessage,
    EventOptions.TYPE.CLICK,
    onOverlayMessageClick,
  ]);
  buttonMessage = overlayMessage.querySelector('button');
  handlers.push([buttonMessage, EventOptions.TYPE.CLICK, onButtonMessageClick]);

  if (templateName === 'data-error') {
    setTimeout(() => {
      errorServer = document.querySelector('.data-error');
      overlayMessage.remove();
    }, MESSAGE_TIMEOUT);
  } else {
    addHandlers(handlers);
    removeHandlers([[document, EventOptions.TYPE.KEYDOWN, callbackModal]]);

    if (errorServer) {
      errorServer.remove();
    }
  }
};

function resetElement() {
  overlayMessage.remove();

  removeHandlers(handlers);
  addHandlers([[document, EventOptions.TYPE.KEYDOWN, callbackModal]]);
}

export { showMessage };
