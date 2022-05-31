MIN_DIFFERENCE = 3;

class Operation {
  constructor(operand1, operator, operand2) {
    this._operand1 = operand1;
    this._operator = operator;
    this._operand2 = operand2;
  }
  get operand1() { return this._operand1; }
  set operand1(value) { this._operand1 = value; }
  get operator() { return this._operator; }
  set operator(symbol) { this._operator = symbol; }
  get operand2() { return this._operand2; }
  set operand2(value) { this._operand2 = value; }

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
}


initGame();


function initGame()  {
  const init_value = 5;
  const goal_value = 6;
  const operationsPair1 = ["* 4", "+ 13"];
  const operationsPair2 = [": 3", "- 11"];
}


function getPairOfDecreasingOperations(value, nmbOfSteps, level) {
  let operation1;
  const divisors = getProperDivisors(value);
  if (divisors.length > 0) {
    const divisor = divisors[getRndInteger(0, divisors.length - 1)];
    operation1 = new Operation(value, "/", divisor);
  } else {
    const subtrahend = getRndInteger(MIN_DIFFERENCE, value - MIN_DIFFERENCE);
    operation1 = new Operation(value, "-", subtrahend);
  }
  let result1 = operation1.getResult();
  let difference = value - result1;
  const subtrahend = getRndInteger(subtrahend - MIN_DIFFERENCE, subtrahend + MIN_DIFFERENCE);
  let operation2 = new Operation(value, "-", subtrahend);
  return [operation1, operation2];
}

function getPairOfIncreasingOperations() {
  const factor = 2;
}


function getInitValue(level) {
  let min = 1 * level;
  let max = 20 * level;
  return getRndInteger(min, max);
}

function getMaxResult(level) {
  return 40 * level;
}

const initValue = getInitValue(level)
function getCorrectOperations(initValue, level) {
  const operators = ["+", "*", "-", ":"];
  let operations = [];
  let x = initValue;
  let count = 1;
  while (count <= 2) {
    let operator = getRndOperator(x, level);
    let operand;
    if (operator === ":" && getProperDivisors(x).length == 0) continue;
    operand = getRndOperand(x, operator, level);
    let operation = new Operation(x, operator, operand);
    operations.push(operation);
    x = operation.getResult();
    count++;
  }
}

function getRndOperator(initValue, level) {

}

function getRndOperand(value, operator, level) {
  let maxResult = getMaxResult(level)
  switch (operator) {
    case "+":
      return getRndInteger(MIN_DIFFERENCE, maxResult - value);
    case "-":
      return getRndInteger(MIN_DIFFERENCE, value - MIN_DIFFERENCE);
    case "*":
      let maxFactor = Math.floor(maxResult / value);
      return getRndInteger(2, maxFactor);
    case ":":
      const divisors = getProperDivisors(value);
      return getRndElement(divisors);
    default:
      console.log("cannot get operand");
  }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getRndBoolean() {
  return Boolean(getRndInteger(0, 1));
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
    if (n % i == 0) return false;
  }
  return true;
}

function getRndElement(arr) {
  return arr[getRndInteger(0, arr.length - 1)];
}