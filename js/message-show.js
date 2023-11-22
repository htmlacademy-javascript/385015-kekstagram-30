import { eventOptions, addHandlers, removeHandlers } from './util.js';

const MESSAGE_TIMEOUT = 5000;

const container = document.body;

let overlayMessage;
let buttonMessage;
let callbackModal;

const onButtonMessageClick = () => {
  resetElement();
};

const onOverlayMessageClick = (evt) => {
  const messageBlock = overlayMessage.querySelector('div');
  const messageHeader = overlayMessage.querySelector('h2');

  if (evt.target === messageBlock || evt.target === messageHeader) {
    evt.stopPropagation();
  } else {
    resetElement();
  }
};

const onMessageKeydown = (evt) => {
  if (evt.key === 'Escape') {
    resetElement();
  }
};

const handlers = [[document, eventOptions.type.keydown, onMessageKeydown]];

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
    eventOptions.type.click,
    onOverlayMessageClick,
  ]);
  buttonMessage = overlayMessage.querySelector('button');
  handlers.push([buttonMessage, eventOptions.type.click, onButtonMessageClick]);

  if (templateName === 'data-error') {
    setTimeout(() => {
      errorServer = document.querySelector('.data-error');
      overlayMessage.remove();
    }, MESSAGE_TIMEOUT);
  } else {
    addHandlers(handlers);
    removeHandlers([[document, eventOptions.type.keydown, callbackModal]]);

    if (errorServer) {
      errorServer.remove();
    }
  }
};

function resetElement() {
  overlayMessage.remove();

  removeHandlers(handlers);
  addHandlers([[document, eventOptions.type.keydown, callbackModal]]);
}

export { showMessage };
