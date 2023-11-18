const HASHTAGS_COUNT_MAX = 5;
const COMMENT_LETTERS_MAX = 140;

const validateForm = () => {
  const uploadForm = document.querySelector('.img-upload__form');
  const hashtagField = document.querySelector('.text__hashtags');
  const commentField = document.querySelector('.text__description');
  const formSubmit = document.querySelector('.img-upload__submit');

  const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

  let hashtagsArray = [];

  const pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: '.img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'field__error',
  });

  const removePrestineElements = () => {
    document.querySelectorAll('.pristine-error').forEach((block) => {
      block.remove();
    });
  };

  const validateHashTag = (value) => {
    hashtagsArray = value
      .toLowerCase()
      .split(' ')
      .filter((n) => n)
      .join(' ')
      .split(' ');
    const isHashTag = (string) => hashtag.test(string);
    formSubmit.removeAttribute('disabled');
    removePrestineElements();
    return hashtagsArray.every(isHashTag) || value.length === 0;
  };

  pristine.addValidator(
    hashtagField,
    validateHashTag,
    'Требования к хэш-тегу: знак "#" в начале, от 2 до 20 символов'
  );

  const getHashTagsCount = () => {
    const countHashTags = hashtagsArray.length;

    return countHashTags <= HASHTAGS_COUNT_MAX;
  };

  pristine.addValidator(
    hashtagField,
    getHashTagsCount,
    'Максимальное количество хэш-тегов: 5'
  );

  const checkHashTagsDuplicate = () => {
    const uniqCount = hashtagsArray.filter(
      (number, index, numbers) => numbers.indexOf(number) !== index
    );

    return uniqCount < hashtagsArray.length;
  };

  pristine.addValidator(
    hashtagField,
    checkHashTagsDuplicate,
    'Хэш-теги повторяются'
  );

  const getCommentLength = (value) => value.length <= COMMENT_LETTERS_MAX;

  pristine.addValidator(
    commentField,
    getCommentLength,
    'Длина комментария больше 140 символов'
  );

  return pristine.validate();
};

export { validateForm };
