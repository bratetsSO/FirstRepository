"use sctrict";
var DISABLE_STORAGE = true; //disable buttons
const DISABLE_MESSAGE = "Идет синхронизация хранилища. Повторите свое действие позже.";
//const ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
//var updatePassword;

var ajaxDrinkStorage = new AjaxStorage("SOROKIN_DRINKS_STORAGE");
ajaxDrinkStorage.restore();

/*функции для работы с пользователем*/
function getAnswer(question) {
    var sAnswer = prompt(question);
    while (sAnswer == "" || sAnswer == null) {
        alert("Ответ не может быть пустым!");
        sAnswer = prompt(question);
    }
    return sAnswer;
};

function newDrink() {
    if (DISABLE_STORAGE == "true") {
        alert(DISABLE_MESSAGE);
        return;
    }
    var drink = new Item(getAnswer("Введите наименование напитка"));
    drink.info.alcohol = (confirm("Напиток алкогольный?")) ? "да" : "нет";
    drink.info.recipe = getAnswer("Введите рецепт напитка");
    ajaxDrinkStorage.addValue(drink.name, drink.info);
};

function getDrinkInfoByName() {
    if (DISABLE_STORAGE == "true") {
        alert(DISABLE_MESSAGE);
        return;
    }
    var drinkName = getAnswer("Введите наименование напитка");
    var drinkInfo = ajaxDrinkStorage.getValue(drinkName);
    var text = "";
    if (drinkInfo != undefined) {
        text = "Наименование напитка: " + drinkName + '\n' +
            "алкогольный: " + drinkInfo.alcohol + '\n' +
            "рецепт: " + drinkInfo.recipe
    } else {
        text = "Информации о напитке '" + drinkName + "' не обнаружено."
    }
    alert(text);
};

function deleteDrink() {
    if (DISABLE_STORAGE == "true") {
        alert(DISABLE_MESSAGE);
        return;
    }
    var drinkName = getAnswer("Введите наименование напитка");
    var text = "";
    if (ajaxDrinkStorage.deleteValue(drinkName) == true) {
        text = "Информация о напитке '" + drinkName + "' удалена."
    } else {
        text = "Информации о напитке '" + drinkName + "' не обнаружено."
    }
    alert(text);
};

function getAllDrinksName() {
    if (DISABLE_STORAGE == "true") {
        alert(DISABLE_MESSAGE);
        return;
    }
    var text = '';
    var drinks = ajaxDrinkStorage.getKeys();
    if (drinks.length != 0) {
        text = "В хранилище есть информация о следующих напитках: " + drinks;
    } else {
        text = "На текущий момент в хранилище нет информация о напитках."
    }
    alert(text);
};
/*-------*/



