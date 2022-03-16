const MAX_COMMENT_LENGTH = 140;
const MAX_COUNT_HASHTAGS = 5;
const MAX_LENGTH_HASHTAG = 20;
const MIN_LENGTH_HASHTAG = 2;
const FIRST_SIMBOL_HASHTAG = '#';

const textHashtags = document.querySelector('.text__hashtags');
const textComment = document.querySelector('.text__description');

//функция проверки хештега
//разделим на отдельные хештеги там где пробел, поместим в массив,
//и потом отдельной функцией проверим весь массив.
const setListenerHashtag = () => {
  textHashtags.addEventListener('input', () => {
    const valueHashtags = textHashtags.value;
    let checkText = '';
    const arrayHashtags = [];
    let target = ' '; // цель поиска
    let pos = 0;
    const i = true;
    while (i) {
      checkText = '';
      let foundPos = valueHashtags.indexOf(target, pos);
      if (foundPos == -1) {
        checkText = valueHashtags.slice(pos);
      } else {
        checkText = valueHashtags.slice(pos, foundPos);
      }
      if (checkText !== '' && checkText !== ' ') {
        arrayHashtags.push(checkText);
      }
      if (foundPos == -1) break;
      pos = foundPos + 1;
    }
    const checkResult = checkArray(arrayHashtags);
    textHashtags.setCustomValidity(checkResult);
    textHashtags.reportValidity();
    textHashtags.style.border = (checkResult === '') ? '' : '5px solid #FF0000'; //красный цвет рамки
  })
}

//проверка массива хештегов на правильность заполнения
const checkArray = (arrayHashtags) => {

  const redex = /^[A-Za-z0-9]+$/;

  if (arrayHashtags.length > MAX_COUNT_HASHTAGS) {
    return `Количество хештегов превышает допустимое: ${MAX_COUNT_HASHTAGS}`;
  }
  if (arrayHashtags.length === 0) {
    return '';
  }
  const arrayRepeat = [];

  //обходим весь массив
  for (let i = 0; i <= arrayHashtags.length - 1; i++) {
    const textHashtag = arrayHashtags[i].trim(); //replace(/\s+/g, ''); //убрать пробелы, переносы строк и т.д.
    if (textHashtag.length > MAX_LENGTH_HASHTAG) {        //длина хештега (максимум)
      return `Длина хештега (${textHashtag}) превышает допустимую (${MAX_LENGTH_HASHTAG}).`;
    }
    if (textHashtag.length < MIN_LENGTH_HASHTAG) {          //длина хештега (минимум)
      return `Длина хештега (${textHashtag}) меньше допустимой (${MIN_LENGTH_HASHTAG}).`;
    }
    if (!textHashtag.startsWith(FIRST_SIMBOL_HASHTAG)) { //проверка первого символа в строке
      return `Первый символ хештега (${textHashtag}) должен быть (${FIRST_SIMBOL_HASHTAG}).`;
    }
    if (textHashtag.indexOf(FIRST_SIMBOL_HASHTAG, 1) !== -1) { //проверка если еще такой символ дальше в строке
      return `В хештеге (${textHashtag}) несколько символов (${FIRST_SIMBOL_HASHTAG}).`;
    }
    if (!redex.test(textHashtag.slice(1))) {                 //проверка всех символов кроме первого (на соответствие шаблону)
      return `В хештеге (${textHashtag}) неверные символы.`;
    }
    if (arrayRepeat.indexOf(textHashtag.toLowerCase()) >= 0) { //поиск в массиве
      return `Хештег (${textHashtag}) уже использовался.`;
    } else {
      arrayRepeat.push(textHashtag.toLowerCase());
    }
  }
  return '';
}

//функция установки сообщения при проверке поля
//при установке не дает отправить форму!
const checkComment = () => {
  console.log('111')
  // const valueLength = textComment.value.length;
  // let textMessage = '';
  // if (valueLength > MAX_COMMENT_LENGTH) {
  //   textMessage = 'Удалите лишние ' + (valueLength - MAX_COMMENT_LENGTH) + ' симв.';
  // } else {
  //   textMessage = '';
  // }
  // textComment.setCustomValidity(textMessage);
  // textComment.reportValidity();
  // textComment.style.border = (textMessage === '') ? '' : '5px solid #FF0000'; //красный цвет рамки
}

//установка прослушки на поле Комментарий
const setListenerComment = () => {
  textComment.addEventListener('input', () => {
    checkComment();
  })
}

export { setListenerHashtag, setListenerComment, textHashtags, textComment }
