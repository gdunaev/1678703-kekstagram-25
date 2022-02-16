import { getData } from './data.js';
import { getArrayPhotos } from './photos.js';
import { uploadFile } from './upload.js';
import { setListenersFilters } from './filter.js';
import { renderPhotos } from './render.js';


renderPhotos(getData); //это загрузка локальных фото, отключить getArrayPhotos

// getArrayPhotos();

setListenersFilters();

uploadFile();


// posts();
//вопросы:
//1. при загрузке фотографий появляются надписи Случайное фото, как избавиться от них?
//2. как сделать чтобы функция выполнялась только после выполнения функции-параметра, например renderPhotos(getPhotos)
//только getPhotos будет функцией, а не промисом.
//3.Код НЕ удалять в фильтрах.
