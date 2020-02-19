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
  return Math.round(Math.random() * (max - min)) + min;
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

var getArrayComments = function (count) {
  var arrayComments = [];
  for (var i = 0; i < count; i++) {
    arrayComments[i] =
    {
      avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
      message: getRandomInt(1, 2) === 2 ?
        MESSAGES[getRandomInt(0, MESSAGES.length - 1)] + ' ' +
        MESSAGES[getRandomInt(0, MESSAGES.length - 1)] :
        MESSAGES[getRandomInt(0, MESSAGES.length - 1)],
      name: NAMES[getRandomInt(0, NAMES.length - 1)],
    };
  }
  return arrayComments;
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
      comments: getArrayComments(getRandomInt(3, 8)),
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
  randomUserPicture.querySelector('.picture__comments').textContent = picture.comments.length;
  return randomUserPicture;
};

var makeFiledFragment = function (elements, render) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < elements.length; i++) {
    fragment.appendChild(render(elements[i]));
  }
  return fragment;
};

var photoMocks = getPhotoMocks(PHOTO_COUNT);
var fragment = makeFiledFragment(photoMocks, renderRandomUserPicture);
picturesContainer.appendChild(fragment);

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
var allCommentOfPicture = bigPicture.querySelector('.social__comments');
var pictureComment = allCommentOfPicture.querySelectorAll('.social__comment');
var commentNode = pictureComment[0];

for (var j = pictureComment.length - 1; j >= 0; j--) {
  allCommentOfPicture.removeChild(pictureComment[j]);
}

var renderRandomComment = function (comment) {
  var randomComment = commentNode.cloneNode(true);
  randomComment.querySelector('.social__picture').src = comment.avatar;
  randomComment.querySelector('.social__picture').alt = comment.name;
  randomComment.querySelector('.social__text').textContent = comment.message;
  return randomComment;
};

var renderBigPicture = function (element) {
  bigPicture.querySelector('img').src = element.url;
  bigPicture.querySelector('.likes-count').textContent = element.likes;
  bigPicture.querySelector('.comments-count').textContent = element.comments.length;
  bigPicture.querySelector('.social__caption').textContent = element.description;
  var comments = element.comments;
  var fragmentOfComment = makeFiledFragment(comments, renderRandomComment);
  allCommentOfPicture.appendChild(fragmentOfComment);
};

renderBigPicture(photoMocks[0]);

bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');

document.querySelector('body').classList.add('modal-open');
