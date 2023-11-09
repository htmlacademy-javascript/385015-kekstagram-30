import { showMessage } from './message-show.js';
import { openModal, closeModal } from './modal.js';
import { validateForm } from './validate.js';
import { sendData } from './api.js';

const uploadControl = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const uploadFormSubmit = uploadForm.querySelector('.img-upload__submit');
const buttonCloseOverlay = document.querySelector('.img-upload__cancel');

const imageBlock = document.querySelector('.img-upload__preview img');
const scaleButtonSmaller = document.querySelector('.scale__control--smaller');
const scaleButtonBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
let scaleCount = Number(
  scaleValue.value.slice(0, scaleValue.value.indexOf('%'))
);

const effectLevelContainer = document.querySelector(
  '.img-upload__effect-level'
);
const effectLevelCounter = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');

const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

function resetElement() {
  uploadControl.value = '';
  hashtagField.value = '';
  commentField.value = '';

  imageBlock.style = '';

  buttonCloseOverlay.removeEventListener('click', onButtonCloseClick);
  scaleButtonSmaller.removeEventListener('click', onScaleButtonSmallerClick);
  scaleButtonBigger.removeEventListener('click', onScaleButtonBiggerClick);
  uploadForm.removeEventListener('submit', onSubmitUploadForm);
  document.removeEventListener('keydown', onModalKeydown);
}

function onButtonCloseClick() {
  closeModal(uploadOverlay);
  resetElement();
}

function onModalKeydown(evt) {
  if (
    evt.target !== hashtagField &&
    evt.target !== commentField &&
    evt.key === 'Escape'
  ) {
    closeModal(uploadOverlay);
    resetElement();
  }
}

function onSubmitUploadForm(evt) {
  const isValid = validateForm();
  evt.preventDefault();
  if (isValid) {
    uploadFormSubmit.disabled = true;
    sendData(new FormData(evt.target))
      .then(() => {
        closeModal(uploadOverlay);
        resetElement();
        showMessage('success');
      })
      .catch(() => {
        showMessage('error', onModalKeydown);
      })
      .finally(() => {
        uploadFormSubmit.disabled = false;
      });
  }
}

function changeScale() {
  scaleValue.value = `${scaleCount}%`;
  imageBlock.style.transform = `scale(${scaleCount / 100})`;
}

function onScaleButtonSmallerClick() {
  if (scaleCount > 25) {
    scaleCount -= 25;
    changeScale();
  }
}

function onScaleButtonBiggerClick() {
  if (scaleCount < 100) {
    scaleCount += 25;
    changeScale();
  }
}

effectLevelContainer.classList.add('hidden');

let effectStyle = '';

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  effectLevelCounter.value = parseFloat(sliderElement.noUiSlider.get());
  changeStyle();
});

function changeStyle() {
  effectLevelContainer.classList.remove('hidden');

  if (effectStyle === 'blur') {
    imageBlock.style.filter = `${effectStyle}(${effectLevelCounter.value}px)`;
  } else if (effectStyle === 'invert') {
    imageBlock.style.filter = `${effectStyle}(${effectLevelCounter.value}%)`;
  } else if (effectStyle === 'none') {
    effectLevelContainer.classList.add('hidden');
    imageBlock.style = '';
  } else {
    imageBlock.style.filter = `${effectStyle}(${effectLevelCounter.value})`;
  }
}

function updateEffect(effect, min, max, step) {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: max,
    step: step,
  });

  effectStyle = effect;

  changeStyle();
}

effectsList.addEventListener('click', (evt) => {
  switch (evt.target.value) {
    case 'none':
      effectStyle = 'none';
      changeStyle();
      break;
    case 'chrome':
      updateEffect('grayscale', 0, 1, 0.1);
      break;
    case 'sepia':
      updateEffect('sepia', 0, 1, 0.1);
      break;
    case 'marvin':
      updateEffect('invert', 0, 100, 1);
      break;
    case 'phobos':
      updateEffect('blur', 0, 3, 0.1);
      break;
    case 'heat':
      updateEffect('brightness', 1, 3, 0.1);
      break;
  }
});

function openForm() {
  uploadControl.addEventListener('change', (evt) => {
    const target = evt.target;
    const files = target.files;
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imageBlock.src = reader.result;
      openModal(uploadOverlay);
    });

    reader.readAsDataURL(files[0]);

    buttonCloseOverlay.addEventListener('click', onButtonCloseClick);
    document.addEventListener('keydown', onModalKeydown);

    scaleCount = 100;
    scaleButtonSmaller.addEventListener('click', onScaleButtonSmallerClick);
    scaleButtonBigger.addEventListener('click', onScaleButtonBiggerClick);

    effectLevelContainer.classList.add('hidden');

    uploadForm.addEventListener('submit', onSubmitUploadForm);
  });
}

export { openForm };
