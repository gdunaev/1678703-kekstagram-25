import { showBigPhoto } from './big-photo.js';

const pictures = document.querySelector('.pictures'); //место куда вставлять фото
const template = document.querySelector('#picture').content.querySelector('.picture'); // В фрагменте находим нужный элемент
const pictureList = document.createDocumentFragment();

//копирование шаблона и его наполнение
const renderPhoto = (photo) => {
  const photoPreview = template.cloneNode(true);
  photoPreview.children[0].src = photo.url;
  photoPreview.children[1].children[0].textContent = photo.comments.length;
  photoPreview.children[1].children[1].textContent = photo.likes;

  photoPreview.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPhoto(photo);
  })
  return photoPreview;
}

//обход массива, вызов функции по наполнению шаблона и заполнение фрагмента
const renderPhotos = (array) => {
  array.forEach((photo) => {
    pictureList.appendChild(renderPhoto(photo));
  })
  pictures.appendChild(pictureList);
}

export { renderPhotos };

