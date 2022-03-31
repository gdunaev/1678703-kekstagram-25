// import { getData } from './data.js';
// import { renderPhotos } from './render-photo.js';
import { uploadFile } from './upload.js';
import {fillSite} from './fill.js';
// import { setListenersFilters } from './filter.js';

//это загрузка локальных фото ПОКА ОСТАВИЛ, УБЕРУ В КОНЦЕ
// renderPhotos(getData());

// setListenersFilters();
fillSite();

uploadFile();

