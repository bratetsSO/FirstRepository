"use strict";
const R = 150; // радиус циферблата
const rn = 15; // радиус кружка вокруг цифр
const radiusNum = R - 25; //радиус центров окружностей цифр

var cf = document.getElementById("clockface");
cf.style.backgroundColor = "orange";
cf.style.borderRadius = 50 + "%";
cf.style.width = R * 2 + "px";
cf.style.height = R * 2 + "px";
cf.style.position = "relative";
cf.style.zIndex = -10 ;

numberByCircle();
updateTime();
setInterval(updateTime, 1000);

function updateTime() {
    var currTime = new Date();
    var currTimeStr = formatTime(currTime);
    document.getElementById('clock').innerHTML = currTimeStr;
}

// форматирует переданную время в формате чч:мм:сс
function formatTime(dt) {
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var seconds = dt.getSeconds();
    handMove("secondhand", seconds);
    handMove("minutehand", minutes + seconds / 60);
    handMove("hourhand", (hours < 12) ? hours * 5 + minutes * 5 / 60 : (hours - 12) * 5 + minutes * 5 / 60);
    return str0l(hours, 2) + ':' + str0l(minutes, 2) + ':' + str0l(seconds, 2);
}

// дополняет строку val слева нулями до длины Len
function str0l(val, len) {
    var strVal = val.toString();
    while (strVal.length < len)
        strVal = '0' + strVal;
    return strVal;
}

function handMove(handId, numDeg) {
    const secDeg = 6; //угол поворота 1 секунды
    var rotDeg = secDeg * numDeg;
    document.getElementById(handId).style.transform = "rotate(" + rotDeg + "deg)";
}

function numberByCircle() {
    var clockFace = document.getElementById("clockface");
    const countNumber = 12; // цифры на циферблате
    
    for (var i = 1, elDiv; i <= countNumber; i++) {
        elDiv = document.createElement("div");
        clockFace.appendChild(elDiv);
        elDiv.style.zIndex = -5;
        elDiv.style.position = 'absolute';
        elDiv.style.width = rn * 2 + 'px';
        elDiv.style.height = rn * 2 + 'px';
        elDiv.style.borderRadius = 50 + '%';
        elDiv.style.backgroundColor = 'green';
        elDiv.style.textAlign = "center";
        elDiv.style.lineHeight = rn * 2 + 'px';
        elDiv.style.left = R + radiusNum * Math.cos(-30 * i * (Math.PI / 180) + Math.PI / 2) - rn + 'px';
        elDiv.style.top = R - radiusNum * Math.sin(-30 * i * (Math.PI / 180) + Math.PI / 2) - rn + 'px';
        elDiv.innerText = i;
        clockFace.appendChild(elDiv);
    }
}


