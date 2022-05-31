import { Operation, initGame, timer, leftBottom } from './game.js';

let operation = new Operation(9, "-", 4);

const game = initGame();

const rightBottom = document.querySelector('.right-bottom');
const leftTop = document.querySelector('.left-top');
const rightTop = document.querySelector('.right-top');

function setOperationButtons() {
    leftBottom.innerText = game['operationsPair1'][0];
    rightBottom.innerText = game['operationsPair1'][1];
    leftTop.innerText = game['operationsPair2'][0];
    rightTop.innerText = game['operationsPair2'][1];
}

function nextStep() {
    game['operationsPair1'][0] = game['operationsPair2'][0];
    game['operationsPair1'][1] = game['operationsPair2'][1];
    game['operationsPair2'][0] = 'END';
    game['operationsPair2'][1] = 'GAME';
}

function hideTopButtons() {
    if (leftTop.innerText === 'END'){
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

const initValue = document.querySelector('div.score > span');

function setInitValue(value) {
    initValue.innerText = value;
    game['initValue'] = value;
}

function startGame() {
    initValue.removeEventListener('click', startGame);
    initValue.classList.remove('init-start');
    setOperationButtons();
    setInitValue(game['initValue']);
    timer();
    enableButtons();
}

function initButton(element) {
    let operator, operand;
    [operator, operand] = element.innerText.split(" ");


    operation.operand1 = Number(game['initValue']);
    operation.operator = operator;
    operation.operand2 = Number(operand);

    console.log('Operation result:', operation.getResult()); // TO DELETE
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
    if (leftBottom.innerText === 'END') {
        disableButtons();
    }
}

leftBottom.addEventListener('click', () => {
    initButton(leftBottom);
    nextStep();
    setOperationButtons();
    hideTopButtons();

    disableButtonsAtEnd();
});

rightBottom.addEventListener('click', () => {
    initButton(rightBottom);
    nextStep();
    setOperationButtons();
    hideTopButtons();

    disableButtonsAtEnd();
});

initValue.innerText = 'START';
initValue.classList.add('init-start');
initValue.addEventListener('click', startGame);

disableButtons();