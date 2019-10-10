"use sctrict";
/* классы */
function HashStorage() { //описание класса
    var that = this; //спасаем this
    that.storage = {}; //хранилище
    that.addValue = function (key, value) { //добавление нового значения
        that.storage[key] = value;
    };
    that.getValue = function (key) { //получение значения по ключу (undefined в случае отсутствия)
        if (key in that.storage) {
            return that.storage[key];
        } else {
            return undefined;
        }
    };
    that.deleteValue = function (key) { //удаление значения по ключу
        var result = false;
        if (key in that.storage) {
            delete that.storage[key];
            result = true;
        }
        return result;
    };

    that.getKeys = function () { //вывод всех ключей массивом
        return Object.keys(that.storage);
    }
};

function Drink(name) { //класс Drink
    var that = this;
    that.name = name;
    that.info = {};
    //that.info.alcoholFlag;
    //that.info.receipe;
}
/*-------*/
/*функции*/
function getAnswer(question) {
    var sAnswer = prompt(question);
    while (sAnswer == "" || sAnswer == null) {
        alert("Ответ не может быть пустым!");
        sAnswer = prompt(question);
    }
    return sAnswer;
};

function newDrink_old() {
    var nameDrink = getAnswer("Введите наименование напитка");
    var alcohol = (confirm("Напиток алкогольный?")) ? "да" : "нет";
    var sRecipe = getAnswer("Введите рецепт напитка");
    var arrDrink = {};
    arrDrink[nameDrink] = {
        alcohol: alcohol,
        recipe: sRecipe
    };
    return arrDrink;
}

function newDrink() {
    var drink = new Drink(getAnswer("Введите наименование напитка"));
    //drink.name = getAnswer("Введите наименование напитка");
    drink.info.alcohol = (confirm("Напиток алкогольный?")) ? "да" : "нет";
    drink.info.recipe = getAnswer("Введите рецепт напитка");
    drinkStorage.addValue(drink.name, drink.info);
};

function getDrinkInfoByName() {
    var drinkName = getAnswer("Введите наименование напитка");
    var drinkInfo = drinkStorage.getValue(drinkName);
    var text = "";
    if (drinkInfo != undefined) {
        text = "Наименование напитка: " + drinkName + '\n' +
            "алкогольный: " + drinkInfo.alcohol + '\n' +
            "рецепт: " + drinkInfo.recipe
    } else {
        text = "Информации о напитке '" + drinkName + "' не обнаружено."
    }
    alert(text);
}

function deleteDrink() {
    var drinkName = getAnswer("Введите наименование напитка");
    var text = "";
    //var drinkInfo = drinkStorage.getValue(drinkName);
    if (drinkStorage.deleteValue(drinkName) == true) {
        text = "Информации о напитке '" + drinkName + "' удалена."
    } else {
        text = "Информации о напитке '" + drinkName + "' не обнаружено."
    }
    alert(text);
}

function getAllDrinksName() {
    var text = '';
    var drinks = drinkStorage.getKeys();
    if (drinks.length != 0) {
        text = "В хранилище есть информация о следующих напитках: " + drinks;
    } else {
        text = "На текущий момент в хранилище нет информация о напитках."
    }
    alert(text);
}
/*-------*/

var drinkStorage = new HashStorage();







