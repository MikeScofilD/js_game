var $start = document.querySelector('#start');
var $game = document.querySelector('#game');
var $time = document.querySelector('#time');
var $result = document.querySelector('#result');
var $timeHeader = document.querySelector('#time-header');
var $resultHeader = document.querySelector('#result-header');
var $gameTime = document.querySelector('#game-time');

var colors = ['red','blue','green','yellow','pink'];
var score = 0;
var isGameStarted = false;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);

function show ($el) {
    $el.classList.remove('hide');
}
function hide ($el) {
    $el.classList.add('hide');
}

function startGame(){
    // console.log('start');
    score = 0;
    setGameTime();
    $gameTime.setAttribute('disabled', 'true');
    // $timeHeader.classList.remove('hide');
    //$resultHeader.classList.add('hide');
    
    isGameStarted = true;
    $game.style.backgroundColor = '#fff';
    hide($start);
    $start.classList.add('hide');

    var interval = setInterval(() => {
        var time = parseFloat($time.textContent);
        // console.log('interval',$time.textContent);
        if (time<=0) {
            //end hame
            clearInterval(interval);
            endGame();
        }else{
            $time.textContent = (time - 0.1).toFixed(1);
        }
    }, 100);

    renderBox();
}
function setGameScore () {
    // body
    $result.textContent = score.toString();
    show($timeHeader);
    hide($resultHeader);
}
function setGameTime () {
    // body

    var time = +$gameTime.value;
    $time.textContent = time.toFixed(1);
}

function endGame () {
    isGameStarted = false;
    setGameScore();
    $gameTime.removeAttribute('disabled');
    // $start.classList.remove('hide');
    show($start);
    $game.innerHTML = '';
    $game.style.backgroundColor = '#ccc';
    // $timeHeader.classList.add('hide');
    hide($timeHeader);
    // $resultHeader.classList.remove('hide');
    show($resultHeader);

}

function handleBoxClick (event) {
    // console.log(event.target.dataset);
    if (!isGameStarted) {
        return;
    }
    if (event.target.dataset.box) {
        score++;
        renderBox();
    }

}

function renderBox () {
   console.log(getRandom(30,100));
   $game.innerHTML = '';
   var box = document.createElement('div');
   var boxSize = getRandom(30,100);
   var gameSize = $game.getBoundingClientRect();
   var maxTop = gameSize.height - boxSize;
   var maxLeft = gameSize.width - boxSize;
   var randomColorIndex = getRandom(0, colors.length);
   console.log(gameSize);

   box.style.height = box.style.width = boxSize + 'px';
   box.style.position = 'absolute';
   box.style.backgroundColor = colors[randomColorIndex];
   box.style.top = getRandom(0, maxTop) + 'px';
   box.style.left = getRandom(0, maxLeft) + 'px';
   box.style.cursor = 'pointer';
   box.setAttribute('data-box','true');


   $game.insertAdjacentElement('afterbegin',box);
}

function getRandom (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}