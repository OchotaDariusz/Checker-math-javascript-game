const MIN_DIFFERENCE = 3;
const OPERATIONS_LIMIT = 2;
const FACTOR_1 = 12;
const FACTOR_2 = 18;
const MAX_INIT_VALUE = 30;


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
        return this._operand1 / this._operand2;
      default:
        console.log("invalid operation")
    }
  }
  parseEndToString() {
    return String(this.operator) + " " + String(this.operand2);
  }
}

export function initTurn(level)  {
  const initValue = getInitValue(level);
  const operationsPairs = getOperationsPairs(initValue, level);
  const stringOperationsPairs = parseOperationsToString(operationsPairs);
  const result = operationsPairs[operationsPairs.length -1][0].getResult();
  return {
    'initValue': initValue,
    'result': result,
    'operations': stringOperationsPairs,
  }
}

function getInitValue(level) {
  return getRndIntegerBetween(level + 1, getMaxValue(level));
}

function getOperationsPairs(initValue, level) {
  const correctOperations = getOperations(initValue, level);
  const otherOperations = getOperations(initValue, level);
  return getPairs(correctOperations, otherOperations);
}

function getPairs(arr1, arr2) {
  let pairsArray = [];
  for (let i = 0; i < arr1.length; i++) {
    pairsArray.push([arr1[i], arr2[i]]);
  }
  return pairsArray;
}

function getMaxValue(level) {
  return MAX_INIT_VALUE * level;
}

function getOperations(initValue, level) {
  let operations = [];
  let x = initValue;
  let count = 1;
  while (count <= OPERATIONS_LIMIT) {
    let operator = getRndOperator(x, level);
    if (operator === ":" && isPrime(x)) continue;
    let operand = getRndOperand(x, operator, level);
    let operation = new Operation(x, operator, operand);
    operations.push(operation);
    x = operation.getResult();
    count++;
  }
  return operations;
}

function getRndOperator(initValue, level) {
  if (initValue <= FACTOR_1 * level) return getRndElement(["+", "*"]);
  if (initValue >= FACTOR_2 * level) return getRndElement(["-", ":"]);
  return getRndElement(["+",  "-"]);
}

function getRndOperand(value, operator, level) {
  let maxResult = getMaxValue(level)
  switch (operator) {
    case "+":
      return getRndIntegerBetween(MIN_DIFFERENCE, maxResult - value);
    case "-":
      return getRndIntegerBetween(MIN_DIFFERENCE, value - MIN_DIFFERENCE);
    case "*":
      let maxFactor = Math.floor(maxResult / value);
      return getRndIntegerBetween(2, maxFactor);
    case ":":
      const divisors = getProperDivisors(value);
      return getRndElement(divisors);
    default:
      console.log("cannot get operand");
  }
}

function getRndIntegerBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getRndElement(arr) {
  return arr[getRndIntegerBetween(0, arr.length - 1)];
}

function shuffle(pair) {
  let i = getRndIntegerBetween(0,1);
  let temp1 = pair[i];
  let temp2 = pair[1 - i];
  pair[0] = temp1;
  pair[1] = temp2;
}

function getProperDivisors(n) {
  let divisors = [];
  for (let i = 2; i <= n/2; i++) {
    if (n % i === 0) divisors.push(i);
  }
  return divisors;
}

function isPrime(n) {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function parseOperationsToString(operationsPairs) {
  let stringOperationsPairs = [];
  for (let i = 0; i < operationsPairs.length; i++) {
    stringOperationsPairs.push([
        operationsPairs[i][0].parseEndToString(),
        operationsPairs[i][1].parseEndToString()
    ])
  }
  return stringOperationsPairs;
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
