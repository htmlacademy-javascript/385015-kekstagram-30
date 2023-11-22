import { getData } from './api.js';
import { initFilter } from './filter.js';
import { initBorder } from './render.js';
import { showMessage } from './message-show.js';
import { initForm } from './form.js';

getData()
  .then((pictures) => {
    initFilter(pictures);
    initBorder(pictures);
  })
  .catch(() => {
    showMessage('data-error');
  });

initForm();
