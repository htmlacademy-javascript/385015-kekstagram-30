import { showMessage } from './message-show.js';
import { openModal, closeModal } from './modal.js';
import { validateForm } from './validate.js';
import { sendData } from './api.js';

const uploadControl = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const buttonCloseOverlay = document.querySelector('.img-upload__cancel');

// uploadOverlay.classList.remove('hidden'); // для проверки работы с эффектами

const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

function clearData() {
  uploadControl.value = '';
  hashtagField.value = '';
  commentField.value = '';
}

function onButtonCloseClick() {
  closeModal(uploadOverlay);
  clearData();

  buttonCloseOverlay.removeEventListener('click', onButtonCloseClick);
  uploadForm.removeEventListener('submit', onSubmitUploadForm);
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onDocumentKeydown(evt) {
  if (
    evt.target !== hashtagField &&
    evt.target !== commentField &&
    evt.key === 'Escape'
  ) {
    closeModal(uploadOverlay);
    clearData();

    buttonCloseOverlay.removeEventListener('click', onButtonCloseClick);
    uploadForm.removeEventListener('submit', onSubmitUploadForm);
    document.removeEventListener('keydown', onDocumentKeydown);
  }
}

function onSubmitUploadForm(evt) {
  const isValid = validateForm();
  evt.preventDefault();
  if (isValid) {
    sendData(new FormData(evt.target))
      .then(() => {
        closeModal(uploadOverlay);
        clearData();
        uploadForm.removeEventListener('submit', onSubmitUploadForm);
        showMessage('success');
      })
      .catch(() => {
        showMessage('error');
      });
  }
}

const openForm = () => {
  uploadControl.addEventListener('change', (evt) => {
    const imageBlock = document.querySelector('.img-upload__preview img');

    const target = evt.target;
    const files = target.files;
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imageBlock.src = reader.result;
      openModal(uploadOverlay);
    });

    reader.readAsDataURL(files[0]);

    buttonCloseOverlay.addEventListener('click', onButtonCloseClick);
    document.addEventListener('keydown', onDocumentKeydown);

    uploadForm.addEventListener('submit', onSubmitUploadForm);
  });
};

export { openForm };
