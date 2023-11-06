import { openModal } from './modal.js';

const COMMENT_SHOW_COUNT = 5; // пусть будет - потом пригодится
const modal = document.querySelector('.big-picture');
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

const templateFragment = document.querySelector('#comment').content;
const template = templateFragment.querySelector('.social__comment');

const fragment = document.createDocumentFragment();

function getComments(comments) {
  comments.forEach((commentData) => {
    const commentTemplate = template.cloneNode(true);
    commentTemplate.querySelector('.social__picture').src = commentData.avatar;
    commentTemplate.querySelector('.social__text').textContent =
      commentData.message;
    fragment.append(commentTemplate);
  });
}

function openImage({ url, likes, description, comments }) {
  imageURL.src = url;
  imageDescription.textContent = description;
  imageLikesCount.textContent = likes;
  imageCommentsCountTotal.textContent = comments.length;
  imageCommentsCountShown.textContent =
    comments.length < COMMENT_SHOW_COUNT ? comments.length : COMMENT_SHOW_COUNT;

  getComments(comments);
  commentsContainer.append(fragment);

  imageCommentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  openModal(modal, 'image');
}

export { openImage };
