import { isEscEvent } from './util.js'; 
import { textHashtags, textComment, setListenerComment } from './hashtag.js'; 
import { scaleControlValue, } from './scale.js'; 


const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const bodySelector = document.querySelector('body');
const fileUpload = document.querySelector('#upload-file');
const effectNone = document.querySelector('#effect-none');

const formUpload = document.querySelector('.img-upload__form');


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
    setListenerComment();
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
    return value.length <= 140;
}

function validateHastag(value) {
    return value.length <= 3;
}

// поле которое проверяется, функция проверки, текст ошибки
pristine.addValidator(formUpload.querySelector('.text__description'),
    validateComment, 'Максимум 140 символов');

pristine.addValidator(formUpload.querySelector('.text__hashtags'),
    validateHastag, 'Максимум 3 символов');

const onFormSubmit = (evt) => {
    const v = pristine.validate();
    console.log(v)
}

const submitForm = () => {
    formUpload.addEventListener('submit', onFormSubmit);
}

export { uploadFile };
