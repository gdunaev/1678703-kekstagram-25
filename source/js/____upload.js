// import { isEscEvent, showBlockMessage } from './util.js';
// import { setListenerHashtag, setListenerComment, textHashtags, textComment } from './____hashtag.js';
// import { setListenersScale, setScale, scaleControlValue, onSmallerScaleClick, onBiggerScaleClick } from './____scale.js';
// import { createSlaider, changeEffectClick, changeFilter } from './____effect.js';
// import { sendRequest } from './fetch.js';

// const TEXT_ERROR = 'Ошибка загрузки изображений';
// const TEXT_ERROR_BUTTON = 'Закрыть';
// const TEXT_SUCCESS = 'Изображение успешно загружено';
// const TEXT_SUCCESS_BUTTON = 'Закрыть';
// const FILE_TYPES = ['gif', 'jpeg', 'png', 'jpg'];
// const MAX_SIZE_FILE = 930000;

// const imgUploadOverlay = document.querySelector('.img-upload__overlay');
// const uploadCancel = document.querySelector('#upload-cancel');
// const bodySelector = document.querySelector('body');
// const fileUpload = document.querySelector('#upload-file');
// const effectNone = document.querySelector('#effect-none');
// const effectChrome = document.querySelector('#effect-chrome');
// const effectSepia = document.querySelector('#effect-sepia');
// const effectMarvin = document.querySelector('#effect-marvin');
// const effectPhobos = document.querySelector('#effect-phobos');
// const effectHeat = document.querySelector('#effect-heat');

// const formUpload = document.querySelector('#upload-select-image');
// const imgUploadPreview = document.querySelector('.img-upload__preview');
// const sliderElement = document.querySelector('.effect-level__slider');
// const effectsPreview = document.querySelectorAll('.effects__preview');


// //функция открытия окна редактирования
// function uploadFile() {
//   fileUpload.addEventListener('change', onUploadFileChange);
// }

// //удаление обработчиков
// const removeListeners = () => {
//   document.removeEventListener('keydown', onPopupeEscPress);
//   document.removeEventListener('change', onUploadFileChange);
//   document.removeEventListener('submit', onFormSubmit);

//   document.removeEventListener('click', onEffecNoneClick);
//   document.removeEventListener('click', onEffectChromeClick);
//   document.removeEventListener('click', onEffectSepiaClick);
//   document.removeEventListener('click', onEffectMarvinClick);
//   document.removeEventListener('click', onEffectPhobosClick);
//   document.removeEventListener('click', onEffectHeatClick);
//   document.removeEventListener('click', onUploadCancelClick);

//   document.removeEventListener('click', onSmallerScaleClick);
//   document.removeEventListener('click', onBiggerScaleClick);
// };

// //убрать окно загрузки и убрать обработчики
// const hideFormUpload = () => {
//   changeFilter('', 'none');
//   setScale('reset');
//   imgUploadOverlay.classList.add('hidden');
//   bodySelector.classList.add('.modal-open');
//   textHashtags.value = '';
//   textComment.value = '';
//   effectNone.checked = true;
//   imgUploadPreview.children[0].src = '';
//   sliderElement.noUiSlider.destroy();
//   fileUpload.value = '';
//   removeListeners();
// };

// //загрузка файла
// const showUploadFile = () => {

//   const file = fileUpload.files[0];
//   const fileName = file.name.toLowerCase();

//   if (file.size > MAX_SIZE_FILE) {
//     return;
//   }

//   const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

//   if (matches) {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => {
//       imgUploadPreview.children[0].src = reader.result;
//       for (const elem of effectsPreview) {
//         elem.style.backgroundImage = `url(${reader.result})`;
//       }
//     });
//     reader.readAsDataURL(file);
//   }
// };

// //функция показа окна для редактирования с подключением обработчиков
// const onUploadFileChange = () => {
//   submitForm();
//   showImgUpload();
//   setListenersScale();
//   setListenersEffect();
//   createSlaider();
//   setListenerHashtag();
//   setListenerComment();
//   showUploadFile();
// };


// //функция показа окна с загружаемым изображением
// const showImgUpload = () => {
//   scaleControlValue.value = '100%';
//   imgUploadOverlay.classList.remove('hidden');
//   bodySelector.classList.remove('.modal-open');
//   uploadCancel.addEventListener('click', onUploadCancelClick);
//   document.addEventListener('keydown', onPopupeEscPress);
// };

// //обработчики
// const onUploadCancelClick = () => {
//   hideFormUpload();
// };
// const onEffecNoneClick = () => {
//   changeEffectClick('none', 100, 0, 1);
// };
// const onEffectChromeClick = () => {
//   changeEffectClick('chrome', 1, 1, 0.1);
// };
// const onEffectSepiaClick = () => {
//   changeEffectClick('sepia', 1, 1, 0.1);
// };
// const onEffectMarvinClick = () => {
//   changeEffectClick('marvin', 100, 100, 1);
// };
// const onEffectPhobosClick = () => {
//   changeEffectClick('phobos', 3, 3, 0.1);
// };
// const onEffectHeatClick = () => {
//   changeEffectClick('heat', 3, 3, 0.1);
// };

// //функция подключения обработчиков переключения эффектов
// const setListenersEffect = () => {
//   effectNone.addEventListener('click', onEffecNoneClick);
//   effectChrome.addEventListener('click', onEffectChromeClick);
//   effectSepia.addEventListener('click', onEffectSepiaClick);
//   effectMarvin.addEventListener('click', onEffectMarvinClick);
//   effectPhobos.addEventListener('click', onEffectPhobosClick);
//   effectHeat.addEventListener('click', onEffectHeatClick);
// };

// //функция проверки нажата ли клавиша Esc, и вызова функции hideFormUpload
// //не срабатывает если курсор в полях Хештег или Комментарий
// const onPopupeEscPress = (evt) => {
//   if (isEscEvent(evt) && evt.target !== textHashtags && evt.target !== textComment) {
//     evt.preventDefault();
//     hideFormUpload();
//   }
// };

// //обработка успешной отправки
// const onSuccess = () => {
//   showBlockMessage(TEXT_SUCCESS, TEXT_SUCCESS_BUTTON, 'success');
//   hideFormUpload();
// };

// //обработка отправки с ошибкой
// const onError = () => {
//   showBlockMessage(TEXT_ERROR, TEXT_ERROR_BUTTON, 'error');
//   hideFormUpload();
// };

// //сделаем отдельный обработчик чтобы потом удалить его,
// //иначе при последующих отправках он начинает в 2,3,4,n раз больше вызываться.
// const onFormSubmit = (evt) => {
//   evt.preventDefault();
//   sendRequest('POST', { method: 'POST', body: new FormData(formUpload) }, onSuccess, onError);
// };

// const submitForm = () => {
//   formUpload.addEventListener('submit', onFormSubmit);
// };

// export { uploadFile };
