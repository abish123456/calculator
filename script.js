document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.querySelectorAll('.btn'));

    let currentInput = '';
    let operation = '';
    let previousInput = '';

    function updateDisplay(value) {
        display.textContent = value || '0';
    }

    function handleNumber(number) {
        currentInput += number;
        updateDisplay(currentInput);
    }

    function handleOperation(op) {
        if (currentInput === '' && op !== '-') return;
        if (operation !== '') {
            currentInput = evaluate();
        }
        previousInput = currentInput;
        operation = op;
        currentInput = '';
        updateDisplay(operation);
    }

    function handleDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay(currentInput);
        }
    }

    function handleEqual() {
        if (currentInput === '' || previousInput === '') return;
        currentInput = evaluate();
        operation = '';
        previousInput = '';
        updateDisplay(currentInput);
    }

    function evaluate() {
        try {
            return String(eval(`${previousInput} ${operation} ${currentInput}`));
        } catch {
            return 'Error';
        }
    }

    function handleClear() {
        currentInput = '';
        operation = '';
        previousInput = '';
        updateDisplay();
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.dataset.action;
            const value = button.textContent;

            switch (action) {
                case 'number':
                    handleNumber(value);
                    break;
                case 'operation':
                    handleOperation(value);
                    break;
                case 'decimal':
                    handleDecimal();
                    break;
                case 'equal':
                    handleEqual();
                    break;
                case 'clear':
                    handleClear();
                    break;
            }
        });
    });
});