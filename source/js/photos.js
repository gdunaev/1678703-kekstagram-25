
import { getPhotos } from './data-server.js';
import { renderPhotos } from './render.js';


//получение фото с сервера и отрисовка их
const getArrayPhotos = () => {
  getPhotos().then((result) => {
    renderPhotos(result);
  })
}

export { getArrayPhotos };



