var oDiv = document.getElementsByClassName('content')[0];
var start = document.getElementById('start');
var wrap = document.getElementsByClassName('wrap')[0];
var title = document.getElementsByClassName('title-sore')[0];
var showBox = document.getElementsByClassName('showBox')[0];
var close = document.getElementsByClassName('close')[0];
var startGame = true;
var sore = document.getElementsByClassName('sore')[0];
var box = document.getElementsByClassName('box')[0];
var _sore = 10;
var n =10;

function bindEvent() {

    start.onclick = function (e) {
        if (startGame) {
            startGame = false;
            oDiv.style.display = 'block';
            title.style.display = 'block';
            init();
        }
    }
    close.onclick = function () {
        showBox.style.display = 'none';
    }
}
bindEvent();



function init() {
    _sore = 10;
    sore.innerText = _sore;
    rander(10); // 渲染10*10 个格子
    marker(10); //标记 10 个地雷
    oDiv.onmousedown = function (e) {
        if (e.which == 1) {
            leftClick(e.target);
        } else if (e.which == 3) {
            rightClick(e.target);
        }
    }
    oDiv.oncontextmenu = function () {
        return false;
    }
}


function rightClick(target) {
     if (target.classList.contains('check')) {
         return;
     }
    target.classList.toggle('flag');
       
       
    
    if (target.classList.contains('flag') && target.classList.contains('isLei')){
        _sore--;
    } 
    if (target.classList.contains('flag') && !target.classList.contains('isLei')){
        _sore++;
    }
    if (!target.classList.contains('flag') && target.classList.contains('isLei')) {
        _sore++;
    }
    if (!target.classList.contains('flag') && !target.classList.contains('isLei')) {
        _sore--;
    }
    if(_sore >10){
        sore.innertext = 10;
    }else{
        sore.innerText = _sore;
    }
    
    if (_sore == 0) {
         _sore = 10;
         startGame = true;
         showBox.style.display = 'block';
         box.style.backgroundImage = "url('./img/success.png')"
    }
    
}



function leftClick(target) {
    var cellArr = document.getElementsByClassName('cell');
    if (target.classList.contains('flag')) {
        return;
    }
    target.classList.add('check');
    var num = 0;
    var n = 0;
    var location = target.getAttribute('location').split('-');
    var x = location[0] - 1;
    var y = location[1] - 1;
    for (var i = x; i <= x + 2; i++) {
        for (var j = y; j <= y + 2; j++) {

            var _index = i * 10 + j;
            if (_index < 100 && _index >= 0) {
              
                if (cellArr[_index].classList.contains('isLei')) {
                    num++;
                }
            }
        }
    }
    target.innerText = num;
    if (target.innerText == 0) {
        for (var i = x; i <= x + 2; i++) {
            for (var j = y; j <= y + 2; j++) {

                var _index = i * 10 + j;
                if (_index < 100 && _index >= 0) {
                    if (!cellArr[_index].classList.contains('check')) {
                        leftClick(cellArr[_index]);
                    }

                }
            }
        }
    }
    if (target.classList.contains('isLei')) {
        // alert('game over')
        var isLei = document.getElementsByClassName('isLei');
        for (var i = 0; i < isLei.length; i++) {
            isLei[i].classList.add('boom');
        }
        setTimeout(function () {
            startGame = true;
            showBox.style.display = 'block';
        }, 500)
    }



}

function marker(num) {
    var cellArr = document.getElementsByClassName('cell');
    while (num) {

        var _index = Math.floor(Math.random() * 100);
        if (cellArr[_index].classList.contains('isLei')) {
            _index = Math.floor(Math.random() * 100);
        } else {
            cellArr[_index].classList.add('isLei');
            num--;
        }
    }
}

function rander(num) {
    var str = '';
    for (var i = 0; i < num; i++) {
        for (var j = 0; j < num; j++) {
            str += '<div location=' + i + '-' + j + ' class="cell">0</div>';
        }
    }
    oDiv.innerHTML = str;
}