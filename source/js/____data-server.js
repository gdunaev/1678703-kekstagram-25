import { sendRequest } from './fetch.js';
import { showBlockMessage } from './util.js';

const TEXT_ERROR = 'Ошибка загрузки изображений';
const TEXT_ERROR_BUTTON = 'Закрыть';


//получаем массив с фото с сервера
const getPhotos = () => new Promise((resolve) => {
  const onSuccess = (array) => {
    resolve(array);
  };
  const onError = () => {
    showBlockMessage(TEXT_ERROR, TEXT_ERROR_BUTTON, 'error');
  };

  sendRequest('GET', { method: 'GET' }, onSuccess, onError);
});

export { getPhotos };
