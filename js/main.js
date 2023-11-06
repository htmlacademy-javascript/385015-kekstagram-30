import { getPictures } from './data.js';
import { openForm } from './form.js';
import { renderBoard } from './render.js';

renderBoard(getPictures());

openForm();
