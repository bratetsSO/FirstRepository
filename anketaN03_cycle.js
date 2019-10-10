const MaleAgeRetierd = 65;
const FemaleAgeRetired = 50;

function getAnswer(question) {
  var sAnswer = prompt(question);
  while (sAnswer == "") {
    alert("Ответ не может быть пустым!");
    sAnswer = prompt(question);
  }
  return sAnswer;
};

function getNumberAnswer(question) {
  var sAnswer = getAnswer(question);
  var nAnswer = Number(sAnswer);
  while (isNaN(nAnswer) || nAnswer <= 0) {
    alert("Ответ должен быть числом, больше нуля!");
    sAnswer = getAnswer(question);
    nAnswer = Number(sAnswer);
  }
  return nAnswer;
};

var sLN = getAnswer("Введите вашу фамилию");
var sFN = getAnswer("Введите ваше имя");
var sMN = getAnswer("Введите ваше отчество");
var nAge = getNumberAnswer("Введите ваш возраст (в годах)");
var bSex = confirm("Ваш пол - мужской?"); //"мужской':'женский'
var sSex, nRetiredAge, bRetired;

// пол и пенсионный возраст
sSex = bSex ? 'мужской' : 'женский';
nRetiredAge = bSex ? MaleAgeRetierd : FemaleAgeRetired;
//пенсионер?
bRetired = (nAge <= nRetiredAge) ? 'нет' : 'да';

alert(
  'ваше ФИО: ' + sLN + ' ' + sFN + ' ' + sMN + '\n' +
  'ваш возраст в годах: ' + nAge + '\n' +
  'ваш возраст в днях: ' + (nAge * 365) + '\n' +
  'через 5 лет вам будет: ' + (nAge + 5) + '\n' +
  'ваш пол: ' + sSex + '\n' +
  'вы на пенсии: ' + bRetired);
