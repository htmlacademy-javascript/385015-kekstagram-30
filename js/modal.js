function openModal(windowModal, elementToClean, element) {
  // кнопку закрытия вычисляем в зависимости от значения флага
  const getButtonClose = () => {
    switch (element) {
      case 'uploadForm':
        return document.querySelector('.img-upload__cancel');
      case 'image':
        return document.querySelector('.big-picture__cancel');
      default:
        break;
    }
  };

  const buttonClose = getButtonClose();
  document.body.classList.add('modal-open');
  windowModal.classList.remove('hidden');

  const payload = {
    windowModal,
    buttonClose,
    elementToClean,
    onDocumentKeydown,
    onButtonCloseClick,
  };

  function onDocumentKeydown(evt) {
    const hashtagField = windowModal.querySelector('.text__hashtags');
    const commentField = windowModal.querySelector('.text__description');

    if (
      evt.target !== hashtagField &&
      evt.target !== commentField &&
      evt.key === 'Escape'
    ) {
      evt.preventDefault();
      closeModal(payload);
    }
  }

  function onButtonCloseClick() {
    closeModal(payload);
  }

  // здесь будет инициализация слайдера. Буду для этого передавать отдельный флаг из модуля формы

  document.addEventListener('keydown', onDocumentKeydown);
  buttonClose.addEventListener('click', onButtonCloseClick);
}

function closeModal(payload) {
  const {
    windowModal,
    buttonClose,
    elementToClean,
    onDocumentKeydown,
    onButtonCloseClick,
  } = payload;

  document.body.classList.remove('modal-open');
  windowModal.classList.add('hidden');

  elementToClean.value = '';

  // здесь будет "удаление" слайдера

  document.removeEventListener('keydown', onDocumentKeydown);
  buttonClose.removeEventListener('click', onButtonCloseClick);
}

export { openModal };
