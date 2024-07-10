const result = document.getElementById('result');
const history = document.getElementById('history');
let currentInput = '';
let currentOperation = null;
let previousInput = '';

document.querySelectorAll('.number, .operator, .function').forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.textContent, button.dataset.action));
});

function handleButtonClick(value, action) {
    if (!action) {
        appendNumber(value);
    } else if (action === 'calculate') {
        calculate();
    } else if (action === 'clear') {
        clear();
    } else if (action === 'backspace') {
        backspace();
    } else if (['add', 'subtract', 'multiply', 'divide', 'percent'].includes(action)) {
        setOperation(action);
    } else {
        performFunction(action);
    }
    updateDisplay();
}

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
}

function setOperation(operation) {
    if (currentInput === '') return;
    if (currentOperation !== null) calculate();
    previousInput = currentInput;
    currentInput = '';
    currentOperation = operation;
}

function calculate() {
    if (currentOperation === null || previousInput === '' || currentInput === '') return;
    let calculation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    switch (currentOperation) {
        case 'add':
            calculation = prev + current;
            break;
        case 'subtract':
            calculation = prev - current;
            break;
        case 'multiply':
            calculation = prev * current;
            break;
        case 'divide':
            calculation = prev / current;
            break;
        case 'percent':
            calculation = prev * (current / 100);
            break;
    }
    currentInput = calculation.toString();
    addToHistory(`${previousInput} ${getOperationSymbol(currentOperation)} ${current} = ${calculation}`);
    currentOperation = null;
    previousInput = '';
}

function performFunction(func) {
    if (currentInput === '') return;
    const current = parseFloat(currentInput);
    let result;
    switch (func) {
        case 'sin':
            result = Math.sin(current);
            break;
        case 'cos':
            result = Math.cos(current);
            break;
        case 'tan':
            result = Math.tan(current);
            break;
        case 'log':
            result = Math.log10(current);
            break;
        case 'ln':
            result = Math.log(current);
            break;
        case 'sqrt':
            result = Math.sqrt(current);
            break;
        case 'power':
            previousInput = current;
            currentOperation = 'power';
            currentInput = '';
            return;
    }
    currentInput = result.toString();
    addToHistory(`${func}(${current}) = ${result}`);
}

function clear() {
    currentInput = '';
    previousInput = '';
    currentOperation = null;
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
}

function updateDisplay() {
    result.value = currentInput;
}

function addToHistory(entry) {
    history.textContent = entry;
}

function getOperationSymbol(operation) {
    switch (operation) {
        case 'add': return '+';
        case 'subtract': return '-';
        case 'multiply': return '*';
        case 'divide': return '÷';
        case 'percent': return '%';
        case 'power': return '^';
    }
}