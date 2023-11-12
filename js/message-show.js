const showMessage = (templateName, callbackModal = null) => {
  const MESSAGE_TIMEOUT = 5000;
  const container = document.body;
  const templateFragment = document.querySelector(`#${templateName}`).content;
  const template = templateFragment.querySelector(`.${templateName}`);

  const element = template.cloneNode(true);

  const fragment = document.createDocumentFragment();
  fragment.append(element);

  container.append(fragment);

  const overlayMessage = document.querySelector(`.${templateName}`);
  const blockMessage = document.querySelector('.success__inner');
  const buttonMessage = overlayMessage.querySelector('button');

  function resetElement() {
    container.removeChild(overlayMessage);

    buttonMessage.removeEventListener('click', onButtonMessageClick);
    overlayMessage.removeEventListener('click', onOverlayMessageClick);
    document.removeEventListener('keydown', onMessageKeydown);
    document.addEventListener('keydown', callbackModal);
  }

  function onButtonMessageClick() {
    resetElement();
  }

  function onOverlayMessageClick(evt) {
    if (evt.target !== blockMessage) {
      resetElement();
    }
  }

  function onMessageKeydown(evt) {
    if (evt.key === 'Escape') {
      resetElement();
    }
  }

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

export { showMessage };
