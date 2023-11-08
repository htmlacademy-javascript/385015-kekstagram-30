import { showMessage } from './message-show.js';
import { getData } from './api.js';
import { openForm } from './form.js';
import { renderBoard } from './render.js';

getData()
  .then((pictures) => {
    renderBoard(pictures);
  })
  .catch(() => {
    showMessage('data-error');
  });

openForm();
