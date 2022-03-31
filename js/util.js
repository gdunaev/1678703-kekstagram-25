const NameBlock = {
  SUCCESS: 'success',
  ERROR: 'error',
};


//удаление блока c сообщением
const deleteBlock = (name) => {
  const currentBlock = document.querySelector(name);
  currentBlock.remove();
};


//удалить блок с сообщением и обработчики
const deleteBlockMessage = (name) => {
  if (name === NameBlock.SUCCESS) {
    document.removeEventListener('keydown', successEscHandler);
    document.removeEventListener('click', successClickHandler);
  } else {
    document.removeEventListener('keydown', errorEscHandler);
    document.removeEventListener('click', errorClickHandler);
  }
  deleteBlock(`.${name}`);
};

//проверить нажата ли клавиша Escape или Esc
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

//нажатие Escape
const onPopupeEscPress = (name) => (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    deleteBlockMessage(name);
  }
};


//клик на кнопке закрытия, обработчики не удаляем, т.к. элемент будет удален
const onButtonClick = (name) => () => {
  deleteBlockMessage(name);
};


//клик на любом месте окна кроме таблички
const onDocumentClick = (name) => (evt) => {
  const currentElement = evt.target;
  if (currentElement.classList.contains(name)) {
    deleteBlockMessage(name);
  }
};


//показать окно с ошибкой загрузки либо успешной загрузки
const showBlockMessage = (text, textButton, name) => {

  const currentTemplate = document.querySelector(`#${name}`).content.querySelector(`.${name}`);
  const body = document.querySelector('body');

  const currentBlock = currentTemplate.cloneNode(true);
  currentBlock.querySelector(`.${name}__title`).textContent = text;
  const currentButton = currentBlock.querySelector(`.${name}__button`);
  currentButton.textContent = textButton;

  body.appendChild(currentBlock);

  if (name === NameBlock.SUCCESS) {
    document.addEventListener('keydown', successEscHandler);
    currentButton.addEventListener('click', successButtonHandler);
    document.addEventListener('click', successClickHandler);
    return;
  }
  document.addEventListener('keydown', errorEscHandler);
  currentButton.addEventListener('click', errorButtonHandler);
  document.addEventListener('click', errorClickHandler);
};


//получить рандомное число
const getRandomInt = (min, max, checkedValues = null) => {

  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  const initialValues = [];
  for (let i = lower; i <= upper; i++) {
    if (checkedValues !== null && checkedValues.includes(i)) {
      continue;
    }
    initialValues.push(i);
  }

  const result = initialValues[Math.floor(Math.random() * initialValues.length)];

  if (checkedValues !== null) {
    checkedValues.push(result);
  }
  return result;
};

//проверить длину строки
// eslint-disable-next-line no-unused-vars
const checkLengthString = (currentString, maxLength) => !(String(currentString).length > maxLength);

function successEscHandler () {
  onPopupeEscPress(NameBlock.SUCCESS);
}
function errorEscHandler () {
  onPopupeEscPress(NameBlock.ERROR);
}
function successClickHandler () {
  onDocumentClick(NameBlock.SUCCESS);
}
function errorClickHandler() {
  onDocumentClick(NameBlock.ERROR);
}
function successButtonHandler(){
  onButtonClick(NameBlock.SUCCESS);
}
function errorButtonHandler(){
  onButtonClick(NameBlock.ERROR);
}

export { getRandomInt, isEscEvent, showBlockMessage};
