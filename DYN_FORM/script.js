var formDef1 =
  [
    { label: 'Название сайта:', kind: 'longtext', name: 'sitename' },
    { label: 'URL сайта:', kind: 'longtext', name: 'siteurl' },
    { label: 'Посетителей в сутки:', kind: 'number', name: 'visitors' },
    { label: 'E-mail для связи:', kind: 'shorttext', name: 'email' },
    {
      label: 'Рубрика каталога:', kind: 'combo', name: 'division',
      variants: [{ text: 'здоровье', value: 1 }, { text: 'домашний уют', value: 2 }, { text: 'бытовая техника', value: 3 }]
    },
    {
      label: 'Размещение:', kind: 'radio', name: 'payment',
      variants: [{ text: 'бесплатное', value: 1 }, { text: 'платное', value: 2 }, { text: 'VIP', value: 3 }]
    },
    { label: 'Разрешить отзывы:', kind: 'check', name: 'votes' },
    { label: 'Описание сайта:', kind: 'memo', name: 'description' },
    { label: 'Опубликовать:', kind: 'submit' },
  ];

var formDef2 =
  [
    { label: 'Фамилия:', kind: 'longtext', name: 'lastname' },
    { label: 'Имя:', kind: 'longtext', name: 'firstname' },
    { label: 'Отчество:', kind: 'longtext', name: 'secondname' },
    { label: 'Возраст:', kind: 'number', name: 'age' },
    { label: 'Зарегистрироваться:', kind: 'submit' },
  ];


function builtForm(formDescr) {
  //var formName = formDescr.name();
  var parentElem = document.body;
  var elForm = document.createElement('form');
  elForm.action = "http://fe.it-academy.by/TestForm.php";
  elForm.method = "POST";
  elForm.target = "_blank";
  parentElem.appendChild(elForm);

  var elemKind;
  var elemLabel;
  var elemName;
  var elemVariants;
  var elSelect;
  var elOption;
  var elVariant;
  var elInput;
  var elDiv;
  var elLabel;
  var elText;
  var elSpan;
  var elArea;

  for (var i = 0; i < formDescr.length; i++) {
    elemKind = formDescr[i].kind;
    elemLabel = formDescr[i].label;
    elemName = formDescr[i].name;
    elemVariants = formDescr[i].variants;
    //контейнер
    elDiv = document.createElement("div");
    elForm.appendChild(elDiv);
    elDiv.className = elemKind;

    if (elemKind!='submit'){
      elText = document.createTextNode(elemLabel);
      elSpan = document.createElement("span");
      elSpan.appendChild(elText);
      elDiv.appendChild(elSpan);
    }

    switch (elemKind) {
      case 'longtext':
      case 'shorttext':{
        elInput = document.createElement("input");
        elInput.setAttribute("type", "text");
        elInput.setAttribute("name", elemName);
        elDiv.appendChild(elInput);
        break;
      }
      case 'number':{
        elInput = document.createElement("input");
        elInput.setAttribute("type", "number");
        elInput.setAttribute("name", elemName);
        elDiv.appendChild(elInput);
        break;
      }
      case 'submit': {
        elInput = document.createElement("input");
        elInput.type = "submit";
        elInput.value = elemLabel.replace(':','');
        elDiv.appendChild(elInput);
        break;
      }
      case 'combo':{
        elSelect = document.createElement("select");
        for (var j=0; j<elemVariants.length; j++){
          elVariant = elemVariants[j];
          elOption = document.createElement("option");
          elOption.value = elVariant.value;
          elOption.text = elVariant.text;
          elSelect.appendChild(elOption);
        }
        elDiv.appendChild(elSelect);
        break;
      }
      case 'radio':{
        for (var k=0; k<elemVariants.length; k++){
          elVariant = elemVariants[k];
          elInput = document.createElement("input");
          elInput.type = "radio";
          elInput.name = elemName;
          elInput.value = elVariant.value;
          elDiv.appendChild(elInput);
          elText = document.createTextNode(elVariant.text);
          elDiv.appendChild(elText);
        }
        break;
      }
      case 'check':{
        elInput = document.createElement("input");
        elInput.type = "checkbox";
        elDiv.appendChild(elInput);
        break;
      }
      case 'memo':{
        elArea = document.createElement("textarea");
        elArea.name = elemName;
        elDiv.appendChild(document.createElement("br"));
        elDiv.appendChild(elArea);
        break;
      }
    }
  }
}
document.body.appendChild(document.createElement("hr"));
document.body.appendChild(document.createElement("hr"));
builtForm(formDef1);
document.body.appendChild(document.createElement("hr"));
document.body.appendChild(document.createElement("hr"));
builtForm(formDef2);