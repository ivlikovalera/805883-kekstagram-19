'use strict';

var PHOTO_COUNT = 25;
var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

var NAMES = [
  'Мулан',
  'Рататуй',
  'Ариэль',
  'ДжейДи',
  'Золушка',
  'Белоснежка',
  'Чип',
  'Р2Д2',
  'Микки',
  'Эльза',
];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getShuffleArray = function (values) {
  for (var i = values.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = values[i];
    values[i] = values[j];
    values[j] = temp;
  }
  return values;
};

var getPhotoMocks = function (count) {
  var photoMocks = [];
  MESSAGES = getShuffleArray(MESSAGES);
  NAMES = getShuffleArray(NAMES);
  for (var i = 0; i < count; i++) {
    photoMocks[i] =
    {
      url: 'photos/' + getRandomInt(1, 25) + '.jpg',
      description: 'random pic',
      likes: getRandomInt(15, 200),
      comments: getRandomInt(1, 50),
      // [
      //  {
      //    avatar: 'img/avatar-' + getRandomInt(1, 6) + 'svg',
      //    message: MESSAGES[getRandomInt(0, MESSAGES.length)],
      //    name: NAMES[getRandomInt(0, NAMES.length)],
      //  }
      // ]
    };
  }
  return photoMocks;
};

var picturesContainer = document.querySelector('.pictures');

var randomUserPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var renderRandomUserPicture = function (picture) {
  var randomUserPicture = randomUserPictureTemplate.cloneNode(true);
  randomUserPicture.querySelector('.picture__img').src = picture.url;
  randomUserPicture.querySelector('.picture__img').alt = picture.description;
  randomUserPicture.querySelector('.picture__likes').textContent = picture.likes;
  randomUserPicture.querySelector('.picture__comments').textContent = picture.comments;
  return randomUserPicture;
};

var makeFiledFragment = function (pictures) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderRandomUserPicture(pictures[i]));
  }
  return fragment;
};

var fragment = makeFiledFragment(getPhotoMocks(PHOTO_COUNT));
picturesContainer.appendChild(fragment);
