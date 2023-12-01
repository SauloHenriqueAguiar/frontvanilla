const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Busca usuário aleatório e adiciona dinheiro
async function getRandomUser() {
 const res = await fetch('https://randomuser.me/api');
 const data = await res.json();

 const user = data.results[0];

 const newUser = {
   name: `${user.name.first} ${user.name.last}`,
   money: Math.floor(Math.random() * 1000000)
 };

 
 addData(newUser);
}

// Dinheiro em dobro para todos
function doubleMoney() {
 data = data.map(user => {
   return { ...user, money: user.money * 2 };
 });

 updateDOM();
}

// Classifique os usuários pelos mais ricos
function sortByRichest() {
 console.log(123);
 data.sort((a, b) => b.money - a.money);

 updateDOM();
}


// Filtre apenas milionários
function showMillionaires() {
 data = data.filter(user => user.money > 1000000);

 updateDOM();
}



// Calcule o total da fortuna
function calculateWealth() {
 const wealth = data.reduce((acc, user) => (acc += user.money), 0);

 const wealthEl = document.createElement('div');
 wealthEl.innerHTML = `<h3>Fortuna Total: <strong>${formatMoney(
   wealth
 )}</strong></h3>`;
 main.appendChild(wealthEl);
}


// Adicionar novo objeto à matriz de dados
function addData(obj) {
 data.push(obj);

 updateDOM();
}

// Atualiza o DOM
function updateDOM(providedData = data) {
 // Limpa main div
 main.innerHTML = '<h2><strong>Pessoa</strong> Fortuna</h2>';

 providedData.forEach(item => {
   const element = document.createElement('div');
   element.classList.add('person');
   element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
     item.money
   )}`;
   main.appendChild(element);
 });
}

// Formata numeros do dinheiro 
function formatMoney(number) {
 return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Eventos de botão 
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);