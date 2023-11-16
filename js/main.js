import { showMessage } from './message-show.js';
import { getData } from './api.js';
import { openForm } from './form.js';
import { initBorder } from './render.js';
import { filterInit } from './filter.js';

getData()
  .then((pictures) => {
    filterInit(pictures);
    initBorder(pictures);
  })
  .catch(() => {
    showMessage('data-error');
  });

openForm();
