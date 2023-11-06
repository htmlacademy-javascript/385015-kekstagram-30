function openModal(windowModal, modalType) {
  const buttonClose = getButtonClose();

  document.body.classList.add('modal-open');
  windowModal.classList.remove('hidden');

  // кнопку закрытия вычисляем в зависимости от типа модального окна
  function getButtonClose() {
    switch (modalType) {
      case 'uploadForm':
        return windowModal.querySelector('.img-upload__cancel');
      case 'image':
        return windowModal.querySelector('.big-picture__cancel');
    }
  }

  function clearData() {
    switch (modalType) {
      case 'uploadForm':
        document.querySelector('.img-upload__input').value = '';
        break;
      case 'image':
        windowModal.querySelector('.social__comments').innerHTML = '';
        break;
    }
  }

  function onDocumentKeydown(evt) {
    const hashtagField = windowModal.querySelector('.text__hashtags');
    const commentField = windowModal.querySelector('.text__description');

    if (
      evt.target !== hashtagField &&
      evt.target !== commentField &&
      evt.key === 'Escape'
    ) {
      evt.preventDefault();
      closeModal();
    }
  }

  function onButtonCloseClick() {
    closeModal();
  }

  function closeModal() {
    document.body.classList.remove('modal-open');
    windowModal.classList.add('hidden');

    clearData();

    // здесь будет "удаление" слайдера

    document.removeEventListener('keydown', onDocumentKeydown);
    buttonClose.removeEventListener('click', onButtonCloseClick);
  }

  // здесь будет инициализация слайдера. Буду для этого передавать отдельный флаг из модуля формы

  document.addEventListener('keydown', onDocumentKeydown);
  buttonClose.addEventListener('click', onButtonCloseClick);
}

export { openModal };
