"use sctrict";
const ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";

/* классы */
//описание класса
function AjaxStorage(stringName) {  // change 'ajaxStorageName' to 'stringName'
    var that = this; //спасаем this
    that.StorageName = stringName;
    that.storage = {}; //хранилище

    that.addValue = function (key, value) { //добавление нового значения
        that.storage[key] = value;
        storeInfo(stringName, that.storage);//сохраняем в Storage
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
            storeInfo(stringName, that.storage);//сохраняем в Storage
            result = true;
        }
        return result;
    };

    that.getKeys = function () { //вывод всех ключей массивом
        return Object.keys(that.storage);
    };

    that.restore = function () {
        restoreInfo(stringName)
            .then(data => {
                if (data.result !== "") {
                    this.storage = JSON.parse(data.result);
                }
                DISABLE_STORAGE = false; //функции недоступны после 
            });
    };
};
function Item(name) { //класс Единицы хранения информации (напиток, блюдо и т.п.)
    var that = this;
    that.name = name;
    that.info = {};
}
/*-------*/
/*функции для работы с хранилищем*/
function storeInfo(stringName,info) {
    var updatePassword = Math.random();
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

function restoreInfo(stringName) {
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