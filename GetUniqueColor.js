function randomDiap(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
  }

  //original function
  function mood(colorsCount) {
    var colors = ['', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый'];

    console.log('цветов: ' + colorsCount);
    for (var i = 1; i <= colorsCount; i++) {
      var n = randomDiap(1, 7);
      var colorName = colors[n];
      console.log(colorName);
    }
  }

  //new function
  function moodUni(colorsCount) {
    var colors = ['', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый'];
    var selectedColors = []; 
    console.log('цветов: ' + colorsCount);
    var i = 1;
    do {
      var n = randomDiap(1, 7);
      var colorName = colors[n];
      if (~selectedColors.indexOf(colorName) == 0) {
        selectedColors.push(colorName);
        console.log(colorName);
        i++;
      }
    } while (i <= colorsCount)
  }

  moodUni(5);