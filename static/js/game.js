MIN_DIFFERENCE = 3;
OPERATIONS_LIMIT = 2;
FACTOR_1 = 12;
FACTOR_2 = 18;
MAX_INIT_VALUE = 30;

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

  parseEndToString() {
    return String(this.operator) + " " + String(this.operand2);
  }
}

function initTurn(level)  {
  const initValue = getInitValue(level);
  const operationsPairs = getOperationsPairs(initValue, level);
  const result = operationsPairs[-1][0].getResult();
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
