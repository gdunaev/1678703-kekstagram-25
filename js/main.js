//получить рандомное число
const getRandomInt = (min, max) => {
  if (min < 0) {
    min = 0;
  } else if (min >= max) {
    return 'Неправильно указаны значения.';
  }

  let allNumbers = [];
  for (let i = min; i <= max; i++) {
    allNumbers.push(i);
  }

  const randomNumber = allNumbers[Math.floor(Math.random() * allNumbers.length)];

  return randomNumber;
}

//проверить длину строки
const checkLengthString = (currentString, maxLength) => String(currentString).length > maxLength ? false : true;

getRandomInt(5, 2);
