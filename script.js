document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("result");
    const history = document.querySelector(".hist");
    let currentValue = "";
    let currentOperator = "";
    let previousValue = "";

    function clearDisplay() {
        display.value = "";
        currentValue = "";
    }

    function clearAll() {
        display.value = "";
        currentValue = "";
        history.textContent = "";
        previousValue = "";
    }

    function appendValue(value) {
        currentValue += value;
        display.value = currentValue;
    }

    function calculate() {
        let result;
        const num1 = parseFloat(previousValue);
        const num2 = parseFloat(currentValue);
        switch (currentOperator) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                result = num1 / num2;
                break;
            default:
                result = num2;
        }
        clearDisplay();
        display.value = result;
        currentValue = result.toString();
        history.textContent = "";
        previousValue = "";
    }

    function updateHistory(operator) {
        history.textContent = previousValue + operator + currentValue;
    }

    function toggleSign() {
        if (currentValue !== "") {
            currentValue = (parseFloat(currentValue) * -1).toString();
            display.value = currentValue;
        }
    }

    function calculatePercentage() {
        if (currentValue !== "") {
            const num = parseFloat(history.textContent.split(currentOperator)[0]); // Pega o primeiro número do histórico
            const percent = parseFloat(currentValue) / 100;
            currentValue = (num * (1 + percent)).toString();
            display.value = currentValue;
        }
    }

    document.querySelectorAll(".buttons button").forEach(button => {
        button.addEventListener("click", function() {
            const btnValue = this.textContent;
            if (!isNaN(btnValue) || btnValue === ".") {
                appendValue(btnValue);
            } else if (btnValue === "+" || btnValue === "-" || btnValue === "*" || btnValue === "/") {
                if (currentValue !== "") {
                    if (previousValue !== "") {
                        calculate();
                    } else {
                        previousValue = currentValue;
                        currentValue = "";
                    }
                    currentOperator = btnValue;
                    updateHistory(btnValue);
                }
            } else if (btnValue === "=") {
                if (previousValue !== "" && currentValue !== "") {
                    calculate();
                }
            } else if (btnValue === "C") {
                clearDisplay();
            } else if (btnValue === "CE") {
                clearAll();
            } else if (btnValue === "+/-") {
                toggleSign();
            } else if (btnValue === "%") {
                calculatePercentage();
            }
        });
    });
});