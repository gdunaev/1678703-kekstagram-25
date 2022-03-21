import { isEscEvent } from './util.js';
import { setListenersScale, setScale, onSmallerScaleClick, onBiggerScaleClick } from './scale.js';
import { setValidateHashtagComment, pristine } from './hashtag.js';

const textComment = document.querySelector('.text__description');
const formUpload = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const bodySelector = document.querySelector('body');
const fileUpload = document.querySelector('#upload-file');
const effectNone = document.querySelector('#effect-none');


const onFormSubmit = (evt) => {
  pristine.validate();
  if(!pristine.validate()) {
    evt.preventDefault();
  }
};

const submitForm = () => {
  formUpload.addEventListener('submit', onFormSubmit);
};

//функция проверки нажата ли клавиша Esc, и вызова функции hideFormUpload
//не срабатывает если курсор в полях Хештег или Комментарий
const onPopupeEscPress = (evt) => {
  if (isEscEvent(evt) && evt.target !== textHashtags && evt.target !== textComment) {
    evt.preventDefault();
    hideFormUpload();
  }
};

//обработчики
const onUploadCancelClick = () => {
  hideFormUpload();
};

//удаление обработчиков
const removeListeners = () => {
  document.removeEventListener('keydown', onPopupeEscPress);
  document.removeEventListener('submit', onFormSubmit);
  document.removeEventListener('click', onUploadCancelClick);
  document.removeEventListener('click', onSmallerScaleClick);
  document.removeEventListener('click', onBiggerScaleClick);
};

//убрать окно загрузки и убрать обработчики
function hideFormUpload () {
  
  setScale('reset');

  imgUploadOverlay.classList.add('hidden');
  bodySelector.classList.add('.modal-open');
  textHashtags.value = '';
  textComment.value = '';
  effectNone.checked = true;
  fileUpload.value = '';

  removeListeners();
}

//функция показа окна с загружаемым изображением
const showImgUpload = () => {
 
  setScale('reset');

  imgUploadOverlay.classList.remove('hidden');
  bodySelector.classList.remove('.modal-open');
  uploadCancel.addEventListener('click', onUploadCancelClick);
  document.addEventListener('keydown', onPopupeEscPress);
};

//функция показа окна для редактирования с подключением обработчиков
const onUploadFileChange = () => {
  submitForm();
  showImgUpload();
  setValidateHashtagComment();

  setListenersScale();
};

//функция открытия окна редактирования
const uploadFile = () => {
  fileUpload.addEventListener('change', onUploadFileChange);
};


export { uploadFile };
