function getAnswer(question) {
  var sAnswer = prompt(question);
  while (sAnswer == "" || sAnswer == null) {
    alert("Ответ не может быть пустым!");
    sAnswer = prompt(question);
  }
  return sAnswer;
};

//с помощью метода forEach
function countRusVowels_forEach(text) {
  const arrRusVowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'];
  var arrText = text.split('');
  var count = 0;
  arrText.forEach(function(item) {
    if (arrRusVowels.indexOf(item) != -1)
      count++;
  })
  return count;
};

//с помощью метода filter
function countRusVowels_filter(text) {
  const arrRusVowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'];
  var arrText = text.split('');
  //var count = 0;
  var arrCount = arrText.filter(function(item) {
    return (arrRusVowels.indexOf(item) != -1)
  })
  return arrCount.length;
};

//с помощью метода reduce
function countRusVowels_reduce(text) {
  const arrRusVowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'];
  var arrText = text.split('');
  var сount = arrText.reduce(function(n, item) {
  	if (arrRusVowels.indexOf(item) != -1) n += 1;
    return n;
    //return  ((arrRusVowels.indexOf(item) != -1) ? count+=1 : count)
  },0)
  return сount;
};


var sText = getAnswer("Введите фразу на русском языке!");
//var nCount = countRusVowels_forEach('длинношеее животное');
//var nCount = countRusVowels_filter(getAnswer("Введите фразу на русском языке!"));
var nCount = countRusVowels_reduce(sText);
alert("Во введенной фразе '" + sText + "' русских гласных букв" + (nCount == 0 ? " нет!" : ": " + nCount));
