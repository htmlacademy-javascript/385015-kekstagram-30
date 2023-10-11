const exampleStringLength = "Некая строка, некоторой длинны";

const exampleStringPolindrom1 = "Лёша на полке клопа нашёл";
const exampleStringPolindrom2 = "Лёша  на полке  клопа нашёл";
const exampleStringPolindrom3 = "Лёша на полке клопа нашОл";

const checkLengthString = (string, maxLength) => {
  let result = string.length <= maxLength ? true : false;
  console.log(
    `${result ? "Можно ещё" : "Уже хватит"}: Вы ввели ${
      string.length
    } символов из ${maxLength}`
  );
  return result;
};

console.log("-----Проверка длинны строки-----");
checkLengthString(exampleStringLength, 10);
checkLengthString(exampleStringLength, 50);
checkLengthString(exampleStringLength, 20);

const checkPolindrom = (string) => {
  const inputString = string.replaceAll(" ", "").toUpperCase();
  const reverseString = string
    .replaceAll(" ", "")
    .toUpperCase()
    .split("")
    .reverse()
    .join("");

  const result = inputString === reverseString;

  console.log(`Строка "${string}"${result ? " " : " не "}является полиндромом`);

  return result;
};

console.log("-----Проверка строки на полиндром-----");
checkPolindrom(exampleStringPolindrom1);
checkPolindrom(exampleStringPolindrom2);
checkPolindrom(exampleStringPolindrom3);
