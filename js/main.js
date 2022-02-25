//получить рандомное число
const getRandomInt = (min, max) => {

  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);

};

//проверить длину строки
const checkLengthString = (currentString, maxLength) => !(String(currentString).length > maxLength);


getRandomInt(5, 2);
checkLengthString('привет', 6);

