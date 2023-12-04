const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


const localStorageTransactions = JSON.parse(
 localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];


// adiciona transação
function addTransaction(e) {
 e.preventDefault();

 if (text.value.trim() === '' || amount.value.trim() === '') {
   alert('Por favor adicione um texto e valor');
 } else {
   const transaction = {
     id: generateID(),
     text: text.value,
     amount: +amount.value
   };

   transactions.push(transaction);

   addTransactionDOM(transaction);

   updateValues();

   updateLocalStorage();

   text.value = '';
   amount.value = '';
 }
}

// Gerar ID aleatório
function generateID() {
 return Math.floor(Math.random() * 100000000);
}

// Add transactions para DOM list
function addTransactionDOM(transaction) {
 // sign
 const sign = transaction.amount < 0 ? '-' : '+';

 const item = document.createElement('li');

 // adiciona classe de acordo com o valor
 item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

 item.innerHTML = `
   ${transaction.text} <span>${sign}${Math.abs(
   transaction.amount
 )}</span> <button class="delete-btn" onclick="removeTransaction(${
   transaction.id
 })">x</button>
 `;

 list.appendChild(item);
}


// Atualiza o balanço, receita e despesa
function updateValues() {
 const amounts = transactions.map(transaction => transaction.amount);

 const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

 const income = amounts
   .filter(item => item > 0)
   .reduce((acc, item) => (acc += item), 0)
   .toFixed(2);

 const expense = (
   amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
   -1
 ).toFixed(2);

 balance.innerText = `$${total}`;
 money_plus.innerText = `$${income}`;
 money_minus.innerText = `$${expense}`;
}


// remove transação por ID
function removeTransaction(id) {
 transactions = transactions.filter(transaction => transaction.id !== id);

 updateLocalStorage();

 init();
}


// Update local storage transactions
function updateLocalStorage() {
 localStorage.setItem('transactions', JSON.stringify(transactions));
}

// inicia app
function init() {
 list.innerHTML = '';

 transactions.forEach(addTransactionDOM);
 updateValues();
}

init();

form.addEventListener('submit', addTransaction);