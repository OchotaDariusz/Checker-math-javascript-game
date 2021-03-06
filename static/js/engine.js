const MIN_DIFFERENCE = 2;
const OPERATIONS_LIMIT = 2;
const FACTOR_1 = 12;
const FACTOR_2 = 18;
const MAX_INIT_VALUE = 25;


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
  parseEndToString() {
    return String(this.operator) + " " + String(this.operand2);
  }
}

export function initTurn(level)  {
  const initValue = getInitValue(level);
  const operationsPairs = getOperationsPairs(initValue, level);
  const stringOperationsPairs = parseOperationsToString(operationsPairs);//zmienić nazwę
  const result = operationsPairs[operationsPairs.length -1][0].getResult();
  console.log("result = ", result)
  return {
    initValue: initValue,
    result: result,
    operations: stringOperationsPairs
  }
}

function getInitValue(level) {
  return getRndIntegerBetween(level + 1, getMaxValue(level));
}

function getMinDifference(level) {
 return MIN_DIFFERENCE * level;
}

function getOperationsPairs(initValue, level) {
  const correctOperations = getOperations(initValue, level);
  let otherOperations;
  do {
    otherOperations = getOperations(initValue, level);
  } while (areDuplicates(correctOperations, otherOperations))
  return getPairs(correctOperations, otherOperations);
}

function areDuplicates (operationsArr1, operationsArr2) {
  for (let i = 0; i < operationsArr1.length; i++){
    if (operationsArr1[i].parseEndToString() === operationsArr2[i].parseEndToString()){
      return true;
    }
  }
  return false;
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
  let minDifference = getMinDifference(level)
  switch (operator) {
    case "+":
      return getRndIntegerBetween(minDifference, maxResult - value);
    case "-":
      return getRndIntegerBetween(minDifference, value - minDifference);
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
  let i = Math.round(Math.random());
  let tmp1 = pair[i];
  let tmp2 = pair[1 - i];
  pair[0] = tmp1;
  pair[1] = tmp2;
  return pair;
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
    stringOperationsPairs.push(shuffle([
        operationsPairs[i][0].parseEndToString(),
        operationsPairs[i][1].parseEndToString()
    ]))
  }
  return stringOperationsPairs;
}
