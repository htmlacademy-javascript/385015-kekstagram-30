import { showMessage } from './message-show.js';
import { openModal, closeModal } from './modal.js';
import { validateForm } from './validate.js';
import { sendData } from './api.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

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
const effectDefault = document.querySelector('#effect-none');

const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const Effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectOptions = {
  [Effect.DEFAULT]: {
    filter: {
      style: '',
      unit: '',
    },
    slider: {
      min: 0,
      max: 100,
      step: 1,
    },
  },
  [Effect.CHROME]: {
    filter: {
      style: 'grayscale',
      unit: '',
    },
    slider: {
      min: 0,
      max: 1,
      step: 0.1,
    },
  },
  [Effect.SEPIA]: {
    filter: {
      style: 'sepia',
      unit: '',
    },
    slider: {
      min: 0,
      max: 1,
      step: 0.1,
    },
  },
  [Effect.MARVIN]: {
    filter: {
      style: 'invert',
      unit: '%',
    },
    slider: {
      min: 0,
      max: 100,
      step: 1,
    },
  },
  [Effect.PHOBOS]: {
    filter: {
      style: 'blur',
      unit: 'px',
    },
    slider: {
      min: 0,
      max: 3,
      step: 0.1,
    },
  },
  [Effect.HEAT]: {
    filter: {
      style: 'brightness',
      unit: '',
    },
    slider: {
      min: 1,
      max: 3,
      step: 0.1,
    },
  },
};

let activeEffect = Effect.DEFAULT;

const removePrestineElements = () => {
  document.querySelectorAll('.pristine-error').forEach((block) => {
    block.remove();
  });
};

const onButtonCloseClick = () => {
  closeModal(uploadOverlay);
  resetElement();
};

const onModalKeydown = (evt) => {
  if (
    evt.target !== hashtagField &&
    evt.target !== commentField &&
    evt.key === 'Escape'
  ) {
    closeModal(uploadOverlay);
    resetElement();
  }
};

const onUploadFormSubmit = (evt) => {
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
};

const changeScale = () => {
  scaleValue.value = `${scaleCount}%`;
  imageBlock.style.transform = `scale(${scaleCount / 100})`;
};

const onScaleButtonSmallerClick = () => {
  if (scaleCount > Scale.MIN) {
    scaleCount -= Scale.STEP;
    changeScale();
  }
};

const onScaleButtonBiggerClick = () => {
  if (scaleCount < Scale.MAX) {
    scaleCount += Scale.STEP;
    changeScale();
  }
};

const changeStyle = (effect) => {
  if (effect && effect !== effectOptions[Effect.DEFAULT]) {
    const { style, unit } = effect.filter;
    effectLevelContainer.classList.remove('hidden');
    imageBlock.style.filter = `${style}(${effectLevelCounter.value}${unit})`;
  } else {
    effectLevelContainer.classList.add('hidden');
    imageBlock.style.filter = '';
  }
};

const updateSlider = (effect) => {
  sliderElement.noUiSlider.on('update', () => {
    effectLevelCounter.value = parseFloat(sliderElement.noUiSlider.get());
    changeStyle(effect);
  });
};

const updateEffect = (effect) => {
  const { min, max, step } = effect.slider;

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: max,
    step: step,
  });

  updateSlider(effect);
};

const setEffect = (evt) => {
  activeEffect = effectOptions[evt.target.value];
  changeStyle(activeEffect);
  updateEffect(activeEffect);
};

const openFile = () => {
  const file = uploadControl.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  scaleCount = Scale.MAX;
  scaleValue.value = `${scaleCount}%`;

  if (matches) {
    imageBlock.src = URL.createObjectURL(file);

    effectsList.querySelectorAll('.effects__preview').forEach((effect) => {
      effect.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });

    removePrestineElements();
    openModal(uploadOverlay);
  }
};

const createSlider = (effect) => {
  const { min, max, step } = effect.slider;

  noUiSlider.create(sliderElement, {
    range: {
      min: min,
      max: max,
    },
    start: max,
    step: step,
    connect: 'lower',
  });
};

const addHandlers = () => {
  buttonCloseOverlay.addEventListener('click', onButtonCloseClick);
  scaleButtonSmaller.addEventListener('click', onScaleButtonSmallerClick);
  scaleButtonBigger.addEventListener('click', onScaleButtonBiggerClick);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
  document.addEventListener('keydown', onModalKeydown);
};

const removeHandlers = () => {
  buttonCloseOverlay.removeEventListener('click', onButtonCloseClick);
  scaleButtonSmaller.removeEventListener('click', onScaleButtonSmallerClick);
  scaleButtonBigger.removeEventListener('click', onScaleButtonBiggerClick);
  uploadForm.removeEventListener('submit', onUploadFormSubmit);
  document.removeEventListener('keydown', onModalKeydown);
};

const clearElements = () => {
  uploadControl.value = '';
  hashtagField.value = '';
  commentField.value = '';

  imageBlock.style = '';
};

const openForm = () => {
  uploadControl.addEventListener('change', () => {
    openFile();
    addHandlers();

    effectLevelContainer.classList.add('hidden');
  });

  createSlider(effectOptions[Effect.DEFAULT]);
};

function resetElement() {
  clearElements();
  changeStyle(effectOptions[Effect.DEFAULT]);
  removePrestineElements();
  removeHandlers();

  effectDefault.checked = true;
}

effectsList.addEventListener('change', setEffect);

effectLevelContainer.classList.add('hidden');

export { openForm };
