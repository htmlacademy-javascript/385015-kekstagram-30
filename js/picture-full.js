import { eventOptions, addHandlers, removeHandlers } from './util.js';
import { openModal, closeModal } from './modal.js';

const COMMENT_SHOW_STEP = 5;

let commentsArray = [];
let commentsToRender = 0;

const modal = document.querySelector('.big-picture');
const buttonCloseImage = document.querySelector('.big-picture__cancel');
const imageURL = modal.querySelector('.big-picture__img img');
const imageDescription = modal.querySelector('.social__caption');
const imageLikesCount = modal.querySelector('.likes-count');
const imageCommentsCount = modal.querySelector('.social__comment-count');
const imageCommentsCountTotal = imageCommentsCount.querySelector(
  '.social__comment-total-count'
);
const imageCommentsCountShown = imageCommentsCount.querySelector(
  '.social__comment-shown-count'
);
const commentsContainer = modal.querySelector('.social__comments');
const commentsLoader = modal.querySelector('.comments-loader');

const getCountComments = (comments) => {
  commentsLoader.classList.remove('hidden');
  if (commentsToRender < comments.length) {
    commentsToRender += COMMENT_SHOW_STEP;
    if (commentsToRender >= comments.length) {
      commentsLoader.classList.add('hidden');
    }
  }

  return commentsToRender;
};

const getPartComments = (comments) =>
  comments.slice(0, getCountComments(comments));

const renderComments = (comments) => {
  const templateFragment = document.querySelector('#comment').content;
  const template = templateFragment.querySelector('.social__comment');

  commentsArray = comments;

  const fragment = document.createDocumentFragment();

  const partComments = getPartComments(comments);
  partComments.forEach((commentData) => {
    const commentTemplate = template.cloneNode(true);
    commentTemplate.querySelector('.social__picture').src = commentData.avatar;
    commentTemplate.querySelector('.social__picture').alt = commentData.name;
    commentTemplate.querySelector('.social__text').textContent =
      commentData.message;
    fragment.append(commentTemplate);
  });
  commentsContainer.innerHTML = '';
  commentsContainer.append(fragment);

  imageCommentsCountTotal.textContent = comments.length;
  imageCommentsCountShown.textContent =
    comments.length < partComments.length
      ? comments.length
      : partComments.length;

  addHandlers([[commentsLoader, eventOptions.type.click, updateCountComments]]);
};

const onButtonCloseClick = () => {
  closeModal(modal);
  resetElement();
};

const onModalKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeModal(modal);
    resetElement();
  }
};

const handlers = [
  [buttonCloseImage, eventOptions.type.click, onButtonCloseClick],
  [document, eventOptions.type.keydown, onModalKeydown],
];

const openImage = ({ url, likes, description, comments }) => {
  imageURL.src = url;
  imageDescription.textContent = description;
  imageLikesCount.textContent = likes;
  imageCommentsCountTotal.textContent = comments.length;
  imageCommentsCountShown.textContent =
    comments.length < COMMENT_SHOW_STEP ? comments.length : COMMENT_SHOW_STEP;

  renderComments(comments);
  openModal(modal);
  addHandlers(handlers);
};

function resetElement() {
  commentsContainer.innerHTML = '';
  commentsToRender = 0;

  removeHandlers(handlers);
  removeHandlers([
    [commentsLoader, eventOptions.type.click, updateCountComments],
  ]);
}

function updateCountComments() {
  commentsContainer.innerHTML = '';
  renderComments(commentsArray);
}

resetElement();

export { openImage };
