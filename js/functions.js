const exampleStringLength = 'Некая строка, некоторой длинны';

const exampleStringPolindrom1 = 'Лёша на полке клопа нашёл';
const exampleStringPolindrom2 = 'Лёша  на полке  клопа нашёл';
const exampleStringPolindrom3 = 'Лёша на полке клопа нашОл';

const checkLengthString = (string, maxLength) => {
  if (string.length <= maxLength) {
    return true;
  }

  return false;
};

checkLengthString(exampleStringLength, 10);
checkLengthString(exampleStringLength, 50);
checkLengthString(exampleStringLength, 20);

const checkPolindrom = (string) => {
  const inputString = string.replaceAll(' ', '').toUpperCase();
  const reverseString = string
    .replaceAll(' ', '')
    .toUpperCase()
    .split('')
    .reverse()
    .join('');

  const result = inputString === reverseString;

  return result;
};

checkPolindrom(exampleStringPolindrom1);
checkPolindrom(exampleStringPolindrom2);
checkPolindrom(exampleStringPolindrom3);
