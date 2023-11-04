import { openModal } from './modal.js';
import { validateForm } from './validate.js';

const uploadControl = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');

const openForm = () => {
  uploadControl.addEventListener('change', () => {
    openModal(uploadOverlay, uploadControl, 'uploadForm');
    validateForm();
  });
};

export { openForm };
