"use sctrict";
/* классы */
function LocStorage(locStorageName) { //описание класса
    var that = this; //спасаем this
    that.locStorageName = locStorageName;
    that.storage = {}; //хранилище

    that.addValue = function (key, value) { //добавление нового значения
        that.storage[key] = value;
        that.setToLocStorage(that.locStorageName);//сохраняем в localStorage
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
            that.setToLocStorage(that.locStorageName);//сохраняем в localStorage
            result = true;
        }
        return result;
    };

    that.getKeys = function () { //вывод всех ключей массивом
        return Object.keys(that.storage);
    }

    that.setToLocStorage = function (key) {//сохраняем в localStorage
        localStorage.setItem(key, JSON.stringify(that.storage));
    }

    that.getFromLocStorage = function (key) {//читаем из localStorage
        that.storage = JSON.parse((localStorage.getItem(key)));
        return that.storage;
    }

};
function Item(name) { //класс Единицы хранения информации (напиток, блюдо и т.п.)
    var that = this;
    that.name = name;
    that.info = {};
}
/*
function Drink(name) { //класс Drink
    var that = this;
    that.name = name;
    that.info = {};
}*/
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
    var drink = new Item(getAnswer("Введите наименование напитка"));
    drink.info.alcohol = (confirm("Напиток алкогольный?")) ? "да" : "нет";
    drink.info.recipe = getAnswer("Введите рецепт напитка");
    drinkStorage.addValue(drink.name, drink.info);
};

function newDish() {
    var dish = new Item(getAnswer("Введите наименование блюда"));
    dish.info.spicy = (confirm("Блюдо острое?")) ? "да" : "нет";
    dish.info.recipe = getAnswer("Введите рецепт блюда");
    dishStorage.addValue(dish.name, dish.info);
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
};

function getDishInfoByName() {
    var dishName = getAnswer("Введите наименование блюда");
    var dishInfo = dishStorage.getValue(dishName);
    var text = "";
    if (dishInfo != undefined) {
        text = "Наименование блюда: " + dishName + '\n' +
            "острое: " + dishInfo.spicy + '\n' +
            "рецепт: " + dishInfo.recipe
    } else {
        text = "Информации о блюде '" + dishName + "' не обнаружено."
    }
    alert(text);
};

function deleteDrink() {
    var drinkName = getAnswer("Введите наименование напитка");
    var text = "";
    if (drinkStorage.deleteValue(drinkName) == true) {
        text = "Информация о напитке '" + drinkName + "' удалена."
    } else {
        text = "Информации о напитке '" + drinkName + "' не обнаружено."
    }
    alert(text);
};

function deleteDish() {
    var dishName = getAnswer("Введите наименование блюда");
    var text = "";
    if (dishStorage.deleteValue(dishName) == true) {
        text = "Информация о блюде '" + dishName + "' удалена."
    } else {
        text = "Информации о блюде '" + dishName + "' не обнаружено."
    }
    alert(text);
};

function getAllDrinksName() {
    var text = '';
    var drinks = drinkStorage.getKeys();
    if (drinks.length != 0) {
        text = "В хранилище есть информация о следующих напитках: " + drinks;
    } else {
        text = "На текущий момент в хранилище нет информация о напитках."
    }
    alert(text);
};

function getAllDishesName() {
    var text = '';
    var dishes = dishStorage.getKeys();
    if (dishes.length != 0) {
        text = "В хранилище есть информация о следующих блюдах: " + dishes;
    } else {
        text = "На текущий момент в хранилище нет информация о блюдах."
    }
    alert(text);
};
/*-------*/

var drinkStorage = new LocStorage("DrinkStorage");
if (localStorage.DrinkStorage === undefined) drinkStorage.setToLocStorage("DrinkStorage")
else drinkStorage.getFromLocStorage("DrinkStorage");

var dishStorage = new LocStorage("DishStorage");
if (localStorage.DishStorage === undefined) dishStorage.setToLocStorage("DishStorage")
else dishStorage.getFromLocStorage("DishStorage");