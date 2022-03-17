import { isEscEvent } from './util.js';
import { scaleControlValue, } from './scale.js';

const textComment = document.querySelector('.text__description');
const formUpload = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const bodySelector = document.querySelector('body');
const fileUpload = document.querySelector('#upload-file');
const effectNone = document.querySelector('#effect-none');

const MAX_COMMENT_LENGTH = 140;
const MAX_COUNT_HASHTAGS = 5;
const MAX_LENGTH_HASHTAG = 20;
const MIN_LENGTH_HASHTAG = 2;
const FIRST_SIMBOL_HASHTAG = '#';




//функция открытия окна редактирования
function uploadFile() {
    fileUpload.addEventListener('change', onUploadFileChange);
}

//удаление обработчиков
const removeListeners = () => {
    document.removeEventListener('keydown', onPopupeEscPress);
    document.removeEventListener('submit', onFormSubmit);
    document.removeEventListener('click', onUploadCancelClick);
};

//убрать окно загрузки и убрать обработчики
const hideFormUpload = () => {
    imgUploadOverlay.classList.add('hidden');
    bodySelector.classList.add('.modal-open');
    textHashtags.value = '';
    textComment.value = '';
    effectNone.checked = true;
    fileUpload.value = '';
    removeListeners();
}


//функция показа окна для редактирования с подключением обработчиков
const onUploadFileChange = () => {
    submitForm();
    showImgUpload();
}


//функция показа окна с загружаемым изображением
const showImgUpload = () => {
    scaleControlValue.value = '100%';
    imgUploadOverlay.classList.remove('hidden');
    bodySelector.classList.remove('.modal-open');
    uploadCancel.addEventListener('click', onUploadCancelClick);
    document.addEventListener('keydown', onPopupeEscPress);
}

// //обработчики
const onUploadCancelClick = () => {
        hideFormUpload();
    }

//функция проверки нажата ли клавиша Esc, и вызова функции hideFormUpload
//не срабатывает если курсор в полях Хештег или Комментарий
const onPopupeEscPress = (evt) => {
    if (isEscEvent(evt) && evt.target !== textHashtags && evt.target !== textComment) {
        evt.preventDefault();
        hideFormUpload();
    }
}

const pristine = new Pristine(formUpload, {
    classTo: 'form__text__pristine', //обязательное поле, пришлось добавлять div, и этим дивом надо обернуть проверяемое поле
    //  errorClass: 'form__item--invalid',
    // successClass: 'img-upload__text--valid',
    errorTextParent: 'form__text__pristine', //обязательное поле, одинаковое название с classTo
    errorTextTag: 'div', //fieldset', //вывод в строку (span)
    // errorTextClass: 'img-upload__form__error-text',
}, true);


function validateComment(value) {
    return value.length <= MAX_COMMENT_LENGTH;
}

let message = '';

function validateHastag(value) {

    message = '';
    const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

    //убираем пробелы и формируем массив
    let arr = value.split(/\s+/g);
    arr = arr.filter((element) => {
        return element !== '';
    })

    //проверка на кол-во хештегов
    if (arr.length > MAX_COUNT_HASHTAGS) {
      message = `Количество хештегов превышает допустимое: ${MAX_COUNT_HASHTAGS}`;
      return false;
    }


    //обход всех хештегов
  const repeatingHastags = [];
  for (const hashtag of arr) {

    //все валидные
    if (re.test(hashtag)) {
      //проверка повторяющихся хештегов без учета регистра
      if (repeatingHastags.indexOf(hashtag.toLowerCase()) >= 0) {
        message = `Хештег (${hashtag}) уже использовался.`;
        return false;
      }
      repeatingHastags.push(hashtag.toLowerCase());
      continue;
    }

    //все НЕвалидные
    //если длина меньше
    if (hashtag.length < MIN_LENGTH_HASHTAG) {
      message = `Длина хештега (${hashtag}) меньше допустимой (${MIN_LENGTH_HASHTAG}).`;
      return false;
    }
    //если длина больше
    if (hashtag.length > MAX_LENGTH_HASHTAG) {
      message = `Длина хештега (${hashtag}) превышает допустимую (${MAX_LENGTH_HASHTAG}).`;
      return false;
    }
    //если первый символ не решетка
    if (hashtag !== FIRST_SIMBOL_HASHTAG && hashtag.length === 1) {
      message = `Первый символ хештега (${hashtag}) должен быть (${FIRST_SIMBOL_HASHTAG}).`;
      return false;
    }
    //если несколько решеток, re не справляется
    if (hashtag.indexOf(FIRST_SIMBOL_HASHTAG, 1) !== -1) {
      message = `В хештеге (${hashtag}) несколько символов (${FIRST_SIMBOL_HASHTAG}).`;
      return false;
    }
    //все остальные случаи невалидности
    message = `В хештеге (${hashtag}) неверные символы.`;
    return false;
  };

   return true;
}

//функция с текстом ошибки
function getHashtagErrorMessage() {
  return message;
}

// 1-поле которое проверяется, 2 -функция проверки, 3 -текст ошибки
pristine.addValidator(formUpload.querySelector('.text__description'),
    validateComment, `Максимум ${MAX_COMMENT_LENGTH} символов`);

pristine.addValidator(formUpload.querySelector('.text__hashtags'),
    validateHastag, getHashtagErrorMessage);

const onFormSubmit = (evt) => {
    pristine.validate();
}

const submitForm = () => {
    formUpload.addEventListener('submit', onFormSubmit);
}

export { uploadFile };
