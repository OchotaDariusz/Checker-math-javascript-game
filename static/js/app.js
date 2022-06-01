import {Operation, initTurn, startTimer, leftBottom, timer} from './engine.js';

let operation = new Operation(9, "-", 4);

let game = initTurn(1);
let gameCopy = JSON.parse(JSON.stringify(game));

let score = 0;

const rightBottom = document.querySelector('.right-bottom');
const leftTop = document.querySelector('.left-top');
const rightTop = document.querySelector('.right-top');

function setOperationButtons() {
    leftBottom.innerText = game['operations'][0][0];
    rightBottom.innerText = game['operations'][0][1];
    leftTop.innerText = game['operations'][1][0];
    rightTop.innerText = game['operations'][1][1];
}

function nextStep() {
    game['operations'][0][0] = game['operations'][1][0];
    game['operations'][0][1] = game['operations'][1][1];
    game['operations'][1][0] = 'AGAIN';
    game['operations'][1][1] = 'NEXT LEVEL';
}

function hideTopButtons() {
    if (leftTop.innerText === 'AGAIN') {
        leftTop.style.opacity = '0';
        rightTop.style.opacity = '0';
        leftBottom.style.webkitBoxShadow = 'none';
        leftBottom.style.mozBoxShadow = 'none';
        leftBottom.style.boxShadow = 'none';
        rightBottom.style.webkitBoxShadow = 'none';
        rightBottom.style.mozBoxShadow = 'none';
        rightBottom.style.boxShadow = 'none';
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

const initValue = document.querySelector('div.current-result > span');
const goal = document.querySelector('.goal');
const points = document.querySelector('.points');

function updateScore() {
    points.innerHTML = `POINTS<br>${score}`;
}

function setInitValue(value) {
    initValue.innerText = value;
    game['initValue'] = value;
    goal.innerText = `GOAL: ${game['result']}`;
    updateScore();
}

function startGame() {
    initValue.removeEventListener('click', startGame);
    initValue.classList.remove('init-button');
    setOperationButtons();
    setInitValue(game['initValue']);
    startTimer();
    enableButtons();
}

function initButton(element) {
    let operator, operand;
    [operator, operand] = element.innerText.split(" ");


    operation.operand1 = Number(game['initValue']);
    operation.operator = operator;
    operation.operand2 = Number(operand);

    setInitValue(operation.getResult());
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

function playTurn(again = false) {
    if (again) {
        game = gameCopy;
        initValue.removeEventListener('click', () => {
            playTurn(true);
        });

        leftBottom.addEventListener('click', () => {
            initGameButton(leftBottom);
        });
    } else {
        initValue.removeEventListener('click', playTurn);
        game = initTurn(1);
        gameCopy = JSON.parse(JSON.stringify(game));
    }
    initValue.classList.remove('init-button');
    setInitValue(game['initValue']);
    startTimer();
    showTopButtons();
    enableButtons();
    setOperationButtons();
}

function checkForTurnWin() {
    if (initValue.innerText === goal.innerText.split(" ")[1] && leftBottom.innerText === 'AGAIN') {
        alert('You have won!');
        score++;
        updateScore();
        initValue.innerText = 'NEXT ROUND';
        initValue.classList.add('init-button');
        initValue.addEventListener('click', playTurn);
    } else if (timer.innerText === "Time Out" || leftBottom.innerText === 'AGAIN' && initValue.innerText !== goal.innerText.split(" ")[1]) {
        alert('You lost!');
        leftBottom.classList.remove('disabled');
        leftBottom.style.pointerEvents = 'auto';

        leftBottom.removeEventListener('click', () => {
            initGameButton(leftBottom);
        });
        leftBottom.addEventListener('click', () => {
            playTurn(true);
        });
    }
}

function initGameButton(element) {
    initButton(element);
    nextStep();
    checkForTurnWin();
    hideTopButtons();
    //disableButtonsAtEnd();
    setOperationButtons();
}

leftBottom.addEventListener('click', () => {
    initGameButton(leftBottom);
});

rightBottom.addEventListener('click', () => {
    initGameButton(rightBottom);
});

initValue.innerText = 'START';
initValue.classList.add('init-button');
initValue.addEventListener('click', startGame);

disableButtons();