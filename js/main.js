import { getData } from './data.js';
import { renderPhotos } from './render-photo.js';
import { uploadFile } from './upload.js';
import {fillSite} from './fill.js';
// import { setListenersFilters } from './filter.js';

// renderPhotos(getData()); //это загрузка локальных фото

// setListenersFilters();
fillSite();

uploadFile();

