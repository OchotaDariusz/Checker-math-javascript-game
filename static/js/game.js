import { Operation, initTurn } from './engine';

export function initGame() {
    let level = 1;
    let turnOnLevel = 1;
    while (true) {
        const initTurnData = initTurn()
        turnOnLevel++;
        if (turnOnLevel == 3) level++;
    }
    /*const initValue = 5;
    const goalValue = 6;
    const operationsPair1 = ["* 4", "+ 13"];
    const operationsPair2 = [": 3", "- 11"];
    return {
        initValue: initValue,
        goal_value: goalValue,
        operationsPair1: operationsPair1,
        operationsPair2: operationsPair2
    };*/
}

export const leftBottom = document.querySelector('.left-bottom');

export function timer() {

    let countDownDate = new Date().getTime() + 10000


    let x = setInterval(function () {


        let now = new Date().getTime();


        let distance = countDownDate - now;


        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        let miliseconds = Math.floor((distance % (1000)));

        if (distance < 5000) {
            document.querySelector(".timer").style.color = "red"
            document.querySelector(".timer").innerHTML = minutes + "m " + seconds + "s " + miliseconds + "ms";
        } else {

            document.querySelector(".timer").innerHTML = minutes + "m " + seconds + "s " + miliseconds + "ms";
        }

        if (distance < 0 || leftBottom.innerText === 'END') {
            clearInterval(x);
            if (leftBottom.innerText !== 'END')
            {
                document.querySelector(".timer").innerHTML = "Time Out";
            }
        }
    }, 10);
}
