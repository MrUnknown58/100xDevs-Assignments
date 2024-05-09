/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor() {
    this.result = 0;
  }
  add(number) {
    this.result += number;
  }
  subtract(number) {
    this.result -= number;
  }
  multiply(number) {
    this.result *= number;
  }
  divide(number) {
    if (number === 0) throw new Error("Cannot divide by 0");
    this.result /= number;
  }
  clear() {
    this.result = 0;
  }
  getResult() {
    console.log(this.result);
    return this.result;
  }
  calculate(expression) {
    const operatorPrecedence = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
    };

    let outputQueue = [];
    let operatorStack = [];

    expression.split(/\b/).forEach((token) => {
      let floatVal = parseFloat(token);
      if (!isNaN(floatVal)) {
        outputQueue.push(floatVal);
      } else if (token in operatorPrecedence) {
        while (
          operatorStack.length > 0 &&
          operatorPrecedence[operatorStack[operatorStack.length - 1]] >=
            operatorPrecedence[token]
        ) {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.push(token);
      } else if (token === "(") {
        operatorStack.push(token);
      } else if (token === ")") {
        while (operatorStack[operatorStack.length - 1] !== "(") {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.pop(); // Pop the '('
      }
    });

    while (operatorStack.length > 0) {
      outputQueue.push(operatorStack.pop());
    }

    let evaluationStack = [];

    outputQueue.forEach((token) => {
      if (typeof token === "number") {
        evaluationStack.push(token);
      } else {
        let b = evaluationStack.pop();
        let a = evaluationStack.pop();
        switch (token) {
          case "+":
            evaluationStack.push(a + b);
            break;
          case "-":
            evaluationStack.push(a - b);
            break;
          case "*":
            evaluationStack.push(a * b);
            break;
          case "/":
            evaluationStack.push(a / b);
            break;
        }
      }
    });

    this.result = evaluationStack.pop();
  }
}

module.exports = Calculator;
