
const ARRAY_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const ARRAY_NAMES = [
  'Олег',
  'Маша',
  'Саша',
  'Вася',
  'Лена',
  'Леша',
];

const NameBlock = {
  SUCCESS: 'success',
  ERROR: 'error',
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
}

//нажатие Escape
const onPopupeEscPress = (name) => {
  return (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      deleteBlockMessage(name);
    }
  }
}

const successEscHandler = onPopupeEscPress(NameBlock.SUCCESS);
const errorEscHandler = onPopupeEscPress(NameBlock.ERROR);

//клик на кнопке закрытия, обработчики не удаляем, т.к. элемент будет удален
const onButtonClick = (name) => {
  return () => {
    deleteBlockMessage(name);
  }
}

const successButtonHandler = onButtonClick(NameBlock.SUCCESS);
const errorButtonHandler = onButtonClick(NameBlock.ERROR);

//клик на любом месте окна кроме таблички
const onDocumentClick = (name) => {
  return (evt) => {
    const currentElement = evt.target;
    if (currentElement.classList.contains(name)) {
      deleteBlockMessage(name);
    }
  }
}

const successClickHandler = onDocumentClick(NameBlock.SUCCESS);
const errorClickHandler = onDocumentClick(NameBlock.ERROR);

//показать окно с ошибкой загрузки либо успешной загрузки
const showBlockMessage = (text, text_button, name) => {

  const currentTemplate = document.querySelector(`#${name}`).content.querySelector(`.${name}`);
  const body = document.querySelector('body');

  const currentBlock = currentTemplate.cloneNode(true);
  currentBlock.querySelector(`.${name}__title`).textContent = text;
  const currentButton = currentBlock.querySelector(`.${name}__button`);
  currentButton.textContent = text_button;

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
}

//удаление блока c сообщением
const deleteBlock = (name) => {
  const currentBlock = document.querySelector(name);
  currentBlock.remove();
}

//получить массив комментариев
const getArrayComments = (arrayCheckCommentsId, MAX_ID) => {

  const commentUserCount = getRandomInt(1, 5);

  let arrayComments = [];
  for (let i = 1; i <= commentUserCount; i++) {
    arrayComments.push({
      'id': getRandomInt(1, MAX_ID, arrayCheckCommentsId),
      'avatar': `img/avatar-${getRandomInt(1, 6)}.svg`,
      'message': ARRAY_MESSAGES[getRandomInt(0, ARRAY_MESSAGES.length - 1)],
      'name': ARRAY_NAMES[getRandomInt(0, ARRAY_NAMES.length - 1)],
    })
  }
  return arrayComments;
}

//получить рандомное число
const getRandomInt = (min, max, arrayCheck = null) => {
  if (min < 0) {
    min = 1;
  } else if (min >= max) {
    return 'Неправильно указаны значения.';
  }

  //сначала наполняем массив "arrayInt" числами например от 10 до 20, или индексами другого массива от 0 до 24
  //это массив последовательных цифр.
  let arrayInt = [];
  for (let i = min; i <= max; i++) {

    //но если число уже есть в проверочном массиве "arrayCheck", пропускаем его.
    if (arrayCheck !== null && arrayCheck.includes(i)) {
      continue;
    }

    //Таким образом при каждом вызове массив будет все короче.
    arrayInt.push(i);
  }

  //Потом получаем рандомное число из массива (получаем по индексу который не больше длины массива)
  const randomNumber = arrayInt[Math.floor(Math.random() * arrayInt.length)];

  //и сразу добавляем его в проверочный массив
  if (arrayCheck !== null) {
    arrayCheck.push(randomNumber);
  }
  return randomNumber;
}

//проверить длину строки
//const checkLengthString = (currentString, maxLength) => String(currentString).length >= maxLength ? false : true;

//проверить нажата ли клавиша Escape или Esc
const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

export { getArrayComments, getRandomInt, isEscEvent, showBlockMessage };
