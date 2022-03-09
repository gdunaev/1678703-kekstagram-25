import { isEscEvent } from './util.js';

const LOAD_COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const pictureCancel = document.querySelector('.big-picture__cancel');
const bodySelector = document.querySelector('body');
const socialComments = bigPicture.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentList = document.createDocumentFragment();
const socialCommentCount = document.querySelector('.social__comment-count');
const socialCommentsLoader = document.querySelector('.social__comments-loader');
const commentsLoader = bigPicture.querySelector('.comments-loader');


//открыть окно
const showBigPhoto = (photo) => {
  fillPhoto(photo);
  show();
}

//функция закрытия окна: добавляет класс и удаляет обработчик
const hide = () => {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onPopupeEscPress); //удаляем функцию, она тут не вызывается
  bodySelector.classList.add('modal-open');
}

//загрузка порции комментариев
const loadNextComments = () => {

  const socialComments = bigPicture.querySelector('.social__comments');

  let currentCount = LOAD_COMMENTS_STEP;
  let allOpen = Number(commentsCount.textContent);

  //обходим всю коллекцию
  for (let elem of socialComments.children) {
    if (elem.classList.contains('hidden')) {
      if (currentCount > 0) {
        currentCount--;
        elem.classList.remove('hidden');
      } else {
        allOpen--;
      }
    }
  }
  getStringCount(allOpen);
}

//нажатие на кнопку Загрузить еще
const onLoaderClick = () => {
  loadNextComments();
}

//нажатие на кнопку закрытия большого фото
const onCancelClick = () => {
  bigPicture.classList.add('hidden');
}

//создать строку для отображения счетчика
const getStringCount = (currentCount) => {

  let stringCount = '0';
  if (Number(commentsCount.textContent) === 0) {
    socialCommentCount.innerHTML = `${stringCount} из <span class="comments-count">${commentsCount.textContent}</span> комментариев`;
    return;
  } else if (Number(commentsCount.textContent) <= LOAD_COMMENTS_STEP || Number(commentsCount.textContent) === currentCount) {
    stringCount = `${commentsCount.textContent}`;
    commentsLoader.classList.add('hidden');
    socialCommentCount.innerHTML = `${stringCount} из <span class="comments-count">${commentsCount.textContent}</span> комментариев`;
    return;
  } else {
    stringCount = currentCount;
    commentsLoader.classList.remove('hidden');
    socialCommentCount.innerHTML = `${stringCount} из <span class="comments-count">${commentsCount.textContent}</span> комментариев`;
  }
}

//открытие окна: удаляет класс и добавляет обработчик на нажатие клавиши и на клик
const show = () => {

  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onPopupeEscPress);
  socialCommentsLoader.addEventListener('click', onLoaderClick);
  pictureCancel.addEventListener('click', onCancelClick);

  //показываем прокрутку
  bodySelector.classList.remove('.modal-open');
}

//нажатие клавиши Esc на открытом окне
const onPopupeEscPress = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hide();
  }
}

//функция заполнения реквизитов картинки
const fillPhoto = (photo) => {

  likesCount.textContent = photo.likes;
  bigPictureImg.children[0].src = photo.url;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  renderComments(photo.comments);
}

//при открытии показывает разрешенное кол-во комментариев
const showComments = (commentList) => {

  if (commentList) {
    let currentCount = 1;

    //обходим всю коллекцию, последние элементы закрываем для просмотра
    for (let elem of commentList.children) {
      if (currentCount > LOAD_COMMENTS_STEP) {
        elem.classList.add('hidden');
      }
      currentCount++;
    }
    getStringCount(LOAD_COMMENTS_STEP);
  }
}

//удаляем комменты из разметки и добавляем свои
const renderComments = (comments) => {

  deleteComments(socialComments);

  let currentCount = LOAD_COMMENTS_STEP;
  comments.forEach((comment, index) => {
    addComment(comment, index, currentCount);
  })

  showComments(commentList);

  socialComments.appendChild(commentList);
}

//добавляем коммент во фрагмент
const addComment = (comment) => {
  const currentComment = socialComment.cloneNode(true);
  const socialPicture = currentComment.querySelector('.social__picture');
  const socialText = currentComment.querySelector('.social__text');

  socialPicture.src = comment.avatar;
  socialPicture.alt = comment.name;
  socialText.textContent = comment.message;
  commentList.appendChild(currentComment);
}

//удаляем комменты из разметки
const deleteComments = (socialComments) => {
  for (let i = socialComments.children.length - 1; i >= 0; i--) {
    const child = socialComments.children[i];
    child.parentElement.removeChild(child);
  }
}

export { showBigPhoto };




