MIN_DIFFERENCE = 4;

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
      case "/":
        return this._operand1 / this._operand2;
      default:
        console.log("invalid operation")
    }
  }
}


initGame();


function initGame() {
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

function getPairOfIncreasingOperations()


function setGoalValue(level) {
  let min = 10 * level;
  let max = 50 * level;
  return getRndInteger(min, max);
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
