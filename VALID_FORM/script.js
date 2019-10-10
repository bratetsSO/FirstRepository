function setErrorText(elemId, errorText) {
  var sIdName = elemId + "_error";
  var sErrorText = (errorText == undefined) ? "" : errorText;
  document.getElementById(sIdName).innerHTML = sErrorText;
}

function checkInput(EO) {
  var isError = "N";
  EO = EO || window.event;
  var elem = EO.target || EO; // можно ли так делать? сделано для вызова функции из checkAll
  if (elem) {
    var elemValue = elem.value;
    var elemId = elem.id;
    if (elemValue == null || elemValue == "") {
      setErrorText(elemId, "Значение не может быть пустым");
      isError = "Y";
    } else {
      setErrorText(elemId, "");
    }
  }
  return isError;
}

function checkPublic() {
  var isError = 'N';
  var publicValuesArr = document.getElementsByName("public");
  var publicValue = '';
  var count = 0;
  for (var i = 0; i < publicValuesArr.length; i++) {
    publicValue = publicValuesArr[i];
    if (publicValue.checked) {
      setErrorText("public", "");
      count++;
      break;
    }
  }
  if (count == 0) {
    setErrorText("public", "Необходимо выбрать один из вариантов");
    isError = 'Y';
  }
  return isError;
}

function checkComments() {
  var isError = 'N';
  var commentsValues = document.getElementById("comments");
  var publicValue = document.querySelector('input[name="public"]:checked').value;
  if (publicValue == "1" && commentsValues.checked) {
    setErrorText("comments", "Размещать отзывы можно только при платном и VIP размещение");
    isError = 'Y';
  } else {
    setErrorText("comments", "");
  }
  return isError;
}

function validate_date(EO) {
  var isError = 'N';
  EO = EO || window.event;
  var elem = EO.target || EO;
  if (elem) {
    var value = elem.value;
    if (value) {
      var arrD = value.split(".");
      arrD[1] -= 1;
      var d = new Date(arrD[2], arrD[1], arrD[0]);
      if ((d.getFullYear() == arrD[2]) && (d.getMonth() == arrD[1]) && (d.getDate() == arrD[0])) {
        var cur_d = new Date;
        if (cur_d >= d) {
          setErrorText("startdate", "");
        } else {
          setErrorText("startdate", "Дата размещения не может быть больше текущей даты");
          isError = 'Y';
        }
      } else {
        setErrorText("startdate", "Введена некорректная дата");
        isError = 'Y';
      }
    }
  }
  return isError;
}

function checkPersons(EO) {
  var isError = 'N';
  EO = EO || window.event;
  var elem = EO.target || EO;
  if (elem) {
    var elemValue = elem.value;
    if (parseInt(elemValue) != elemValue) {
      setErrorText("persons", "Количество посетителей необходимо указать целым числом");
      isError = 'Y';
    } else if (parseInt(elemValue) < 0) {
      setErrorText("persons", "Количество посетителей не может быть отрицательным числом");
      isError = 'Y';
    } else {
      setErrorText("persons", "");
    }
  }
  return isError;
}

//button_click
function checkAll() {
  // article
  var elemErrorFocus;
  var elemCheck = document.getElementById("article");
  var bError = checkInput(elemCheck);
  if (bError == 'Y') {
    elemErrorFocus = elemCheck;
  }

  //public
  bError = checkPublic();
  if (bError == 'Y') {
    elemErrorFocus = document.getElementById("public_1");
  } else {
    //comments
    bError = checkComments();
    if (bError == 'Y') {
      elemErrorFocus = document.getElementById("comments");
    }
  }
  //other
  var sInpId = "email,persons,startdate,url,title,author";
  var arrInpId = sInpId.split(",");
  var sInpId = '';
  for (var q = 0; q < arrInpId.length; q++) {
    sInpId = arrInpId[q];
    elemCheck = document.getElementById(sInpId);
    bError = checkInput(elemCheck);
    if (sInpId == "persons" && bError == 'N') {
      bError = checkPersons(elemCheck);
    }
    if (sInpId == "startdate" && bError == 'N') {
      validate_date(elemCheck);
    }
    if (bError == 'Y') {
      elemErrorFocus = elemCheck;
    }
  }
  if (elemErrorFocus) {
    event.preventDefault();
    elemErrorFocus.focus();
  }
}

//set focus
//document.getElementById('author').focus();
//input + blur
var sInput = "";
var idName = "";
var idNames = "author,title,url,startdate,persons,email,article";
var idNamesArr = idNames.split(",");
for (var i = 0; i < idNamesArr.length; i++) {
  idName = idNamesArr[i];
  sInput = document.getElementById(idName);
  sInput.addEventListener("blur", checkInput);
}

//public + onblur + onchange
var publicValues = document.getElementsByName("public");
var publicValue = '';
for (var j = 0; j < publicValues.length; j++) {
  publicValue = publicValues[j];
  publicValue.addEventListener("blur", checkPublic);
  publicValue.addEventListener("change", checkComments);
}

//comments + onchange
var comments = document.getElementById("comments");
comments.addEventListener("change", checkComments);

//startdate + blur
var startdate = document.getElementById("startdate");
startdate.addEventListener("blur", validate_date);

//persons + blur
var persons = document.getElementById("persons");
persons.addEventListener("blur", checkPersons);
