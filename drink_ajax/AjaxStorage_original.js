"use sctrict";
var DISABLE_STORAGE = true; //disable buttons
const DISABLE_MESSAGE = "Идет синхронизация хранилища. Повторите свое действие позже.";
const ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
var stringName = "SOROKIN_DRINKS_STORAGE";
var updatePassword;

/* классы */
function AjaxStorage(ajaxStorageName) { //описание класса
    var that = this; //спасаем this
    that.StorageName = ajaxStorageName;
    that.storage = {}; //хранилище

    that.addValue = function (key, value) { //добавление нового значения
        that.storage[key] = value;
        storeInfo(that.storage);//сохраняем в Storage
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
            storeInfo(that.storage);//сохраняем в Storage
            result = true;
        }
        return result;
    };

    that.getKeys = function () { //вывод всех ключей массивом
        return Object.keys(that.storage);
    };

    that.restore = function() {
        restoreInfo(this.key)
            .then(data => {
                if (data.result !== "") {
                    this.storage = JSON.parse(data.result);
                }
                DISABLE_STORAGE = false; //функции недоступны после 
            });
    };

    /*
    that.setToStorage = function (key) {//сохраняем в Storage
        localStorage.setItem(key, JSON.stringify(that.storage));
    }

    that.getFromStorage = function (key) {//читаем из Storage
        that.storage = JSON.parse((localStorage.getItem(key)));
        return that.storage;
    }
    */
};
function Item(name) { //класс Единицы хранения информации (напиток, блюдо и т.п.)
    var that = this;
    that.name = name;
    that.info = {};
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

function newDrink() {
    if (DISABLE_STORAGE == "true"){
        alert(DISABLE_MESSAGE);
        return;
    }
    var drink = new Item(getAnswer("Введите наименование напитка"));
    drink.info.alcohol = (confirm("Напиток алкогольный?")) ? "да" : "нет";
    drink.info.recipe = getAnswer("Введите рецепт напитка");
    ajaxDrinkStorage.addValue(drink.name, drink.info);
};

function getDrinkInfoByName() {
    if (DISABLE_STORAGE == "true"){
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
    if (DISABLE_STORAGE == "true"){
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
    if (DISABLE_STORAGE == "true"){
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
function storeInfo(info) {
    updatePassword = Math.random();
    $.ajax({
        url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
        data: { f: 'LOCKGET', n: stringName, p: updatePassword },
        success: lockGetReady, error: errorHandler
    }
    );

    function lockGetReady(callresult) {
        if (callresult.error != undefined)
            alert(callresult.error);
        else {
            $.ajax({
                url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
                data: { f: 'UPDATE', n: stringName, v: JSON.stringify(info), p: updatePassword },
                success: updateReady, error: errorHandler
            }
            );
        }
    }
}
function updateReady(callresult) {
    if (callresult.error != undefined)
        alert(callresult.error);
}
/*
function restoreInfo() {
    $.ajax(
        {
            url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
            data: { f: 'READ', n: stringName },
            success: readReady, error: errorHandler
        }
    );
}

function readReady(callresult) {
    if (callresult.error != undefined)
        alert(callresult.error);
    else if (callresult.result != "") {
        var info = JSON.parse(callresult.result);
        document.getElementById('IName').value = info.name;
        document.getElementById('IAge').value = info.age;
    }
}*/

function restoreInfo() {
    let sp = new URLSearchParams();
    sp.append('f', 'READ');
    sp.append('n', stringName);

    return fetch(ajaxHandlerScript, { //возвращает Promise
        method: 'POST',
        body: sp
    })
        .then(response => response.json());
}

function errorHandler(jqXHR, statusStr, errorStr) {
    alert(statusStr + ' ' + errorStr);
}
/*-------*/


var ajaxDrinkStorage = new AjaxStorage(stringName);
ajaxDrinkStorage.restore();
//if (ajaxDrinkStorage.DrinkStorage === undefined) ajaxDrinkStorage.setToStorage("DrinkStorage")
//else ajaxDrinkStorage.getFromStorage("DrinkStorage");
