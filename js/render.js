// import { showBigPhoto } from './big-photo.js';
import { sortFilter } from './filter.js';

const pictures = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
const imgFilters = document.querySelector('.img-filters');

// //копирование шаблона и его наполнение
const renderPhoto = (photo) => {
    const photoPreview = template.cloneNode(true);
    photoPreview.children[0].src = photo.url;
    photoPreview.children[1].children[0].textContent = photo.comments.length;
    photoPreview.children[1].children[1].textContent = photo.likes;

    photoPreview.addEventListener('click', (evt) => {
        evt.preventDefault();
        // showBigPhoto(photo);
    })
    return photoPreview;
}


//обход массива с фото, вызов функции по наполнению шаблона и заполнение фрагмента
const renderPhotos = (photos) => {
    let currentPhotos;

    currentPhotos = sortFilter(photos);

    currentPhotos.forEach((photo) => {
        fragment.appendChild(renderPhoto(photo));
    })
    pictures.appendChild(fragment);
    imgFilters.classList.remove('img-filters--inactive');
}

export { renderPhotos };
