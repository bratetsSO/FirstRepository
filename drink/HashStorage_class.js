"use sctrict";
/* классы */
function HashStorage() { //описание класса
    this.storage = {}; //хранилище
    this.addValue = function (key, value) { //добавление нового значения
        this.storage[key] = value;
    };
    this.getValue = function (key) { //получение значения по ключу (undefined в случае отсутствия)
        if (key in this.storage) {
            return this.storage[key];
        } else {
            return undefined;
        }
    };
    this.deleteValue = function (key) { //удаление значения по ключу
        var result = false;
        if (key in this.storage) {
            delete this.storage[key];
            result = true;
        }
        return result;
    };

    this.getKeys = function () { //вывод всех ключей массивом
        return Object.keys(this.storage);
    }
};