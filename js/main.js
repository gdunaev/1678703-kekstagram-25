//получить рандомное число
const getRandomInt = (min, max) => {
  if (min < 0) {
    min = 0;
  } else if (min >= max) {
    return 'Неправильно указаны значения.';
  }

  const allNumbers = [];
  for (let i = min; i <= max; i++) {
    allNumbers.push(i);
  }

  return allNumbers[Math.floor(Math.random() * allNumbers.length)];

};

//проверить длину строки
const checkLengthString = (currentString, maxLength) => {
  return String(currentString).length > maxLength ? false : true;
};

getRandomInt(5, 2);
checkLengthString('привет', 6);
