
const formElement = document.querySelector('#add-form');
const balanceElement = document.querySelector('#balance');
let balance = +localStorage.getItem('balance') || 0;

balanceElement.textContent = `Balance: ${balance}$`;

formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const firstName = document.querySelector('#first-name').value.trim();
    const lastName = document.querySelector('#last-name').value.trim();
    const patronymic = document.querySelector('#patronymic').value.trim();
    const amountElement = document.querySelector('#amount');
    const amountValue = +amountElement.value;

    const existingError = document.querySelector('.error-text');
    if (existingError) {
        existingError.remove();
    }

    let balanceNotification = document.querySelector('.balance-notification');

    if (isNaN(amountValue) || amountValue <= 0 || amountValue >= 10000000000000) {
        const errorTextElement = document.createElement('p');
        errorTextElement.textContent = "Incorrect amount.";
        errorTextElement.classList.add('error-text');
        amountElement.insertAdjacentElement('afterend', errorTextElement);
        if (balanceNotification) {
            balanceNotification.remove();
        }

        return;
    }

    balance += amountValue;
    localStorage.setItem('balance', balance)
    balanceElement.textContent = `Balance: ${balance} $`;

    if (!balanceNotification) {
        balanceNotification = document.createElement('p');
        balanceNotification.classList.add('balance-notification');
        amountElement.insertAdjacentElement('afterend', balanceNotification);
    }

    balanceNotification.textContent = `Hello, ${firstName} ${lastName} ${patronymic}! Your balance is replenished with ${amountValue} $.`;


    formElement.reset();
});
