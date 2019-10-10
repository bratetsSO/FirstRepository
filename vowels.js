function getAnswer(question) {
  //test github
  var sAnswer = prompt(question);
  while (sAnswer == "" || sAnswer == null) {
    alert("Ответ не может быть пустым!");
    sAnswer = prompt(question);
  }
  return sAnswer;
};

// поиск с помощью массива
function countRusVowels(text) {
  const arrRusVowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'];
  //const sRusVowels = 'аеёиоуыэюя';
  var arrText = text.split('');
  var count = 0;
  for (var i = 0; i < arrText.length; i++) {
    if (arrRusVowels.indexOf(arrText[i]) != -1) {
      count += 1;
    }
  }
  //return count;
  alert("Во введенной фразе '" + text + "' русских гласных букв" + (count == 0 ? " нет!" : ": " + count));
};

// поиск с помощью длины массива (запасной вариант)
function countRusVowels2(text) {
  const arrRusVowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'];
  var arrCount = [];
  var arrText = text.split('');

  var count = 0;
  for (var i = 0; i < arrText.length; i++) {
    if (arrRusVowels.indexOf(arrText[i]) != -1) {
      arrCount.push(arrText[i]);
    }
  }
  count = arrCount.length;
  //return count;
  alert("Во введенной фразе '" + text + "' русских гласных букв" + (count == 0 ? " нет!" : ": " + count));
}

// решение  со строками
function countRusVowelsByString(text) {
  const sRusVowels = 'аеёиоуыэюя'
  var count = 0;
  for (var i = 0; i < text.length; i++) {
    if (sRusVowels.indexOf(text.charAt(i)) != -1) {
      count += 1;
    }
  }
  //return count;
  alert("Во введенной фразе '" + text + "' русских гласных букв" + (count == 0 ? " нет!" : ": " + count));
}

//countRusVowels('длинношеее животное');
//countRusVowels(getAnswer("Введите фразу на русском языке!"));
//countRusVowels2(getAnswer("Введите фразу на русском языке!"));
countRusVowelsByString(getAnswer("Введите фразу на русском языке!"));
