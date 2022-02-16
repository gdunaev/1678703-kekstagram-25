import { showBigPhoto } from './big-photo.js';
import { sortArrayFilter } from './filter.js';

const pictures = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');
const fragmentList = document.createDocumentFragment();
const imgFilters = document.querySelector('.img-filters');

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

//удаление фото перед загрузкой новых
const removeChildPictures = () => {
  for (let i = pictures.children.length - 1; i >= 0; i--) {
    const child = pictures.children[i];
    if (child.className === 'picture') {
      child.parentElement.removeChild(child);
    }
  }
}

//обход массива, вызов функции по наполнению шаблона и заполнение фрагмента
const renderPhotos = (array) => {
  let currentArray;
  removeChildPictures();
  //НЕ УДАЛЯТЬ! Почему при последнем фильтре в консоль выводится один и тот же массив??
  // console.log("1:");
  // console.log(array);
  currentArray = sortArrayFilter(array);
  //НЕ УДАЛЯТЬ!
  // console.log("2:");
  //   console.log(currentArray);
  currentArray.forEach((photo) => {
    fragmentList.appendChild(renderPhoto(photo));
  })
  pictures.appendChild(fragmentList);
  imgFilters.classList.remove('img-filters--inactive');
}

export { renderPhotos };

