const PICTURE_QUANTITY = 25;
let commentIDCount = 0;

const LikeQuantity = {
  MIN: 15,
  MAX: 200,
};
const CommentQuantity = {
  MIN: 0,
  MAX: 30,
};

const PICTURE_DESCRIPTIONS = [
  "По синему морю, к зеленой земле",
  "Плыву я на белом своем корабле.",
  "На белом своем корабле,",
  "На белом своем корабле.",
  "Меня не пугают ни волны, ни ветер,",
  "Плыву я к единственной маме на свете.",
  "Плыву я сквозь волны и ветер",
  "К единственной маме на свете.",
  "Плыву я сквозь волны и ветер",
  "К единственной маме на свете.",
  "Скорей до земли я добраться хочу,",
  "Я здесь, я приехал!,- я ей закричу.",
  "Я маме своей закричу,",
  "Я маме своей закричу...",
  "Пусть мама услышит,",
  "Пусть мама придет,",
  "Пусть мама меня непременно найдет!",
  "Ведь так не бывает на свете,",
  "Чтоб были потеряны дети.",
  "Ведь так не бывает на свете,",
  "Чтоб были потеряны дети.",
  "Пусть мама услышит,",
  "Пусть мама придет,",
  "Пусть мама меня непременно найдет!",
  "Ведь так не бывает на свете,",
  "Чтоб были потеряны дети.",
  "Ведь так не бывает на свете,",
  "Чтоб были потеряны дети!",
];
const COMMENTS_MESSAGES = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
];
const NAMES = [
  "Иван",
  "Алексей",
  "Михаил",
  "Алёна",
  "Фёдор",
  "Ирина",
  "Ольга",
  "Андрей",
  "Константин",
  "Елена",
  "Регина",
];

const getRandom = (min, max) => {
  const result = Math.random() * (max - min) + min;
  return Math.round(result);
};

const getComments = (quantity) => {
  const comments = [];
  let count = quantity;

  while (count) {
    const comment = {
      id: commentIDCount++,
      avatar: `img/avatar-${getRandom(1, 6)}.svg`,
      message: COMMENTS_MESSAGES[getRandom(0, COMMENTS_MESSAGES.length - 1)],
      name: NAMES[getRandom(0, NAMES.length - 1)],
    };

    count--;

    comments.push(comment);
  }

  return comments;
};

const getPictures = () => {
  const pictures = [];

  for (let i = 0; i < PICTURE_QUANTITY; i++) {
    const counter = i + 1;
    const picture = {
      id: counter,
      url: `photos/${counter}.jpg`,
      description: PICTURE_DESCRIPTIONS[i],
      likes: getRandom(LikeQuantity.MIN, LikeQuantity.MAX),
      comments: getComments(
        getRandom(CommentQuantity.MIN, CommentQuantity.MAX)
      ),
    };

    pictures.push(picture);
  }

  return pictures;
};

console.log(getPictures());
