const display = document.querySelector(".value");
const buttonsContainer = document.querySelector(".buttons-container");
let currentInput = "0";
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;
function updateDisplay() {
  display.textContent =
    currentInput.length > 9 ? currentInput.substring(0, 9) : currentInput;
}
function inputDigit(digit) {
  if (waitingForSecondOperand === true) {
    // Start a new number if an operator was just pressed
    currentInput = digit;
    waitingForSecondOperand = false;
  } else {
    currentInput = currentInput === "0" ? digit : currentInput + digit;
  }
}
function inputDecimal() {
  if (waitingForSecondOperand === true) {
    currentInput = "0.";
    waitingForSecondOperand = false;
    return;
  }
  if (!currentInput.includes(".")) {
    currentInput += ".";
  }
}
function handleOperator(nextOperator) {
  const inputValue = parseFloat(currentInput);

  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    return;
  }
  if (firstOperand === null && !isNaN(inputValue)) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = operate(firstOperand, inputValue, operator);

    currentInput = String(result);
    firstOperand = result;
  }
  waitingForSecondOperand = true;
  operator = nextOperator === "=" ? null : nextOperator;
}
function operate(a, b, op) {
  switch (op) {
    case "+":
      return a + b;
    case "−":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      if (b === 0) {
        alert("Cannot divide by zero!");
        resetCalculator();
        return 0;
      }
      return a / b;
    default:
      return b;
  }
}
function resetCalculator() {
  currentInput = "0";
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
}
function toggleSign() {
  if (currentInput !== "0") {
    currentInput = String(parseFloat(currentInput) * -1);
  }
}
function calculatePercentage() {
  const value = parseFloat(currentInput) / 100;
  currentInput = String(value);
}
document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const target = event.target;
    const value = target.textContent;
    if (!isNaN(value) && value !== "") {
      inputDigit(value);
    } else if (value === ".") {
      inputDecimal();
    } else if (value === "AC") {
      resetCalculator();
    } else if (value === "±") {
      toggleSign();
    } else if (value === "%") {
      calculatePercentage();
    } else if (value === "=" || ["+", "−", "×", "÷"].includes(value)) {
      handleOperator(value);
    }
    updateDisplay();
  });
});
updateDisplay();
