import { Operation, initTurn } from './engine.js';

let leftBottom = document.querySelector('.left-bottom');
let rightBottom = document.querySelector('.right-bottom');
const leftTop = document.querySelector('.left-top');
const rightTop = document.querySelector('.right-top');
let initValue = document.querySelector('div.current-result > span');
const goal = document.querySelector('.goal');
const points = document.querySelector('.points');
const timeLeft = document.querySelector(".timer");
const visibleLevel = document.querySelector('.level');
let game, gameCopy, hiddenTopButtons, hasWon, timer;
let level = 1;

let operation = new Operation(9, "-", 4);

function startTimer() {

    let countDownDate = new Date().getTime() + 100000


    timer = setInterval(function () {


        let now = new Date().getTime();


        let distance = countDownDate - now;


        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        let miliseconds = Math.floor((distance % (1000)));

        if (distance < 5000) {
            timeLeft.style.color = "red"
            timeLeft.innerHTML = minutes + "m " + seconds + "s " + miliseconds + "ms";
        } else {

            timeLeft.innerHTML = minutes + "m " + seconds + "s " + miliseconds + "ms";
        }

        if (distance < 0 || leftBottom.innerText === 'AGAIN') {
            clearInterval(timer);
            if (leftBottom.innerText !== 'AGAIN')
            {
                timeLeft.innerHTML = "Time Out";
                hiddenTopButtons = hideTopButtons();
                gameLost();
            }
        }
    }, 10);
}

function enableButtons() {
    leftBottom.classList.remove('disabled');
    leftBottom.style.pointerEvents = 'auto';
    rightBottom.classList.remove('disabled');
    rightBottom.style.pointerEvents = 'auto';
}

function disableButtons() {
    leftBottom.classList.add('disabled');
    leftBottom.style.pointerEvents = 'none';
    rightBottom.classList.add('disabled');
    rightBottom.style.pointerEvents = 'none';
}

function disableButtonsAtEnd() {
    if (leftBottom.innerText === 'AGAIN') {
        disableButtons();
    }
}

function setOperationButtons() {
    leftBottom.innerText = game.operations[0][0];
    rightBottom.innerText = game.operations[0][1];
    leftTop.innerText = game.operations[1][0];
    rightTop.innerText = game.operations[1][1];
}

function removeAllEventListeners(element) {
    let newElement = element.cloneNode(true);
    element.parentNode.replaceChild(newElement, element);
    return newElement;
}

function updateScore() {
    points.innerHTML = `POINTS<br>${game.score}`;
}

function setInitValue(value) {
    initValue.innerText = value;
    game.initValue = value;
}

function initButton(element) {
    let operator, operand;
    [operator, operand] = element.innerText.split(" ");

    operation.operand1 = Number(game['initValue']);
    operation.operator = operator;
    operation.operand2 = Number(operand);

    setInitValue(operation.getResult());
}

function hideTopButtons() {
    if (leftTop.innerText === 'AGAIN' || timeLeft.innerText === 'Time Out') {
        leftTop.style.opacity = '0';
        rightTop.style.opacity = '0';
        leftBottom.style.webkitBoxShadow = 'none';
        leftBottom.style.mozBoxShadow = 'none';
        leftBottom.style.boxShadow = 'none';
        rightBottom.style.webkitBoxShadow = 'none';
        rightBottom.style.mozBoxShadow = 'none';
        rightBottom.style.boxShadow = 'none';
        return true;
    }
    return false;
}

function checkForTurnWin() {
    if (initValue.innerText === goal.innerText.split(" ")[1] && leftBottom.innerText === 'AGAIN') {
        return true;
    } else if (timer.innerText === "Time Out" || leftBottom.innerText === 'AGAIN' && initValue.innerText !== goal.innerText.split(" ")[1]) {
        return false;
    }
}

function showTopButtons() {
    leftTop.style.opacity = '1';
    rightTop.style.opacity = '1';
    leftBottom.style.webkitBoxShadow = '0 -50px 15px -10px var(--shadow)';
    leftBottom.style.mozBoxShadow = '0 -50px 15px -10px var(--shadow)';
    leftBottom.style.boxShadow = '0 -50px 15px -10px var(--shadow)';
    rightBottom.style.webkitBoxShadow = '0 -50px 15px -10px var(--shadow)';
    rightBottom.style.mozBoxShadow = '0 -50px 15px -10px var(--shadow)';
    rightBottom.style.boxShadow = '0 -50px 15px -10px var(--shadow)';
}

function nextPlay(newLevel=false) {
    enableButtons();
    if (newLevel){
        level++;
        game = initTurn(level);
        game.score = 0;
        visibleLevel.innerHTML = `LEVEL<br>${level}`;
    } else {
        let score = game.score;
        game = initTurn(level);
        game.score = score;
    }
    gameCopy = JSON.parse(JSON.stringify(game));
    goal.innerText = `GOAL: ${game.result}`;
    updateScore();

    if (hiddenTopButtons) {
        showTopButtons();
        hiddenTopButtons = false;
    }

    initValue = removeAllEventListeners(initValue);
    initValue.classList.remove('init-button');
    initValue.innerText = game.initValue;

    setOperationButtons();
}

function nextTurn(){
    nextPlay();
}

function nextLevel() {
    nextPlay(true);
}

function gameLost() {
    leftBottom = removeAllEventListeners(leftBottom);
    rightBottom = removeAllEventListeners(rightBottom);

    leftBottom.addEventListener('click', () => {
        startGame(false);
    });

    rightBottom.addEventListener('click', () => {
        startGame(true);
    });

    initValue.innerText = 'PLAY AGAIN?';

    leftBottom.innerText = 'AGAIN';
    rightBottom.innerText = 'NEW GAME';
}

function nextStep() {
    game.operations[0][0] = game.operations[1][0];
    game.operations[0][1] = game.operations[1][1];
    game.operations[1][0] = 'AGAIN';
    game.operations[1][1] = 'NEW GAME';
    setOperationButtons();

    if (hiddenTopButtons) {
        clearInterval(timer);
        // check result
        hasWon = checkForTurnWin(); //result good/bad
        if (hasWon) {
            game.score++;
            updateScore();
            disableButtonsAtEnd();
        } else {
            gameLost();
            return;
        }
        if (game.score === 3) {
            // next level, set score to 0
            alert('next level');
            initValue.innerText = 'NEXT LEVEL';
            initValue.classList.add('init-button');
            initValue.addEventListener('click', () => {
                nextLevel();
            });
        } else {
            // next round
            initValue.innerText = 'NEXT TURN';
            initValue.classList.add('init-button');
            initValue.addEventListener('click', () => {
                nextTurn();
            });
        }
    }
    hiddenTopButtons = hideTopButtons();
}

function initGameButton(element) {
    console.log('level', level);
    initButton(element);
    nextStep();
}

function initializeGameButtons() {
    leftBottom = removeAllEventListeners(leftBottom);
    rightBottom = removeAllEventListeners(rightBottom);

    leftBottom.addEventListener('click', () => {
        initGameButton(leftBottom);
    });

    rightBottom.addEventListener('click', () => {
        initGameButton(rightBottom);
    });

}

function startGame(newGame=true) {
    if (newGame) {
        level = 1;
        game = initTurn(level);
        game.score = 0;
        gameCopy = JSON.parse(JSON.stringify(game));
    } else {
        //play again
        game = JSON.parse(JSON.stringify(gameCopy));
        console.log(game);
        console.log(gameCopy);
    }
    visibleLevel.innerHTML = `LEVEL<br>${level}`;
    startTimer();
    if (hiddenTopButtons) {
        showTopButtons();
        hiddenTopButtons = false;
    }

    updateScore();
    goal.innerText = `GOAL: ${game.result}`;

    initValue = removeAllEventListeners(initValue);
    initValue.classList.remove('init-button');
    initValue.innerText = game.initValue;

    setOperationButtons();

    initializeGameButtons();

}

function initStartGame() {
    initValue.innerText = 'START';
    initValue.classList.add('init-button');
    initValue.addEventListener('click', () => {
        startGame(true);
    });
}

function main() {
    initStartGame();
}

main();