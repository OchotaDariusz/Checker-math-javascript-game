export class Operation {
    constructor(operand1, operator, operand2) {
        this._operand1 = operand1;
        this._operator = operator;
        this._operand2 = operand2;
    }

    get operand1() {
        return this._operand1;
    }

    set operand1(value) {
        this._operand1 = value;
    }

    get operator() {
        return this._operator;
    }

    set operator(symbol) {
        this._operator = symbol;
    }

    get operand2() {
        return this._operand2;
    }

    set operand2(value) {
        this._operand2 = value;
    }

    getResult() {
        switch (this._operator) {
            case "+":
                return this._operand1 + this._operand2;
            case "-":
                return this._operand1 - this._operand2;
            case "*":
                return this._operand1 * this._operand2;
            case ":":
                return Math.round(this._operand1 / this._operand2 * 100) / 100;
            default:
                console.log("invalid operation")
        }
    }
}

export function initGame() {
    const initValue = 5;
    const goalValue = 6;
    const operationsPair1 = ["* 4", "+ 13"];
    const operationsPair2 = [": 3", "- 11"];
    return {
        initValue: initValue,
        goal_value: goalValue,
        operationsPair1: operationsPair1,
        operationsPair2: operationsPair2
    };
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
