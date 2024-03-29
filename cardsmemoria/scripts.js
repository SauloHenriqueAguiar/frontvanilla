const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');


// Acompanhe o cartão atual
let currentActiveCard = 0;

// Armazene cards DOM
const cardsEl = [];

// Armazenar dados do card
const cardsData = getCardsData();

// cria todos os cards
function createCards() {
 cardsData.forEach((data, index) => createCard(data, index));
}


// Crie um único card no DOM
function createCard(data, index) {
 const card = document.createElement('div');
 card.classList.add('card');

 if (index === 0) {
   card.classList.add('active');
 }

 card.innerHTML = `
 <div class="inner-card">
 <div class="inner-card-front">
   <p>
     ${data.question}
   </p>
 </div>
 <div class="inner-card-back">
   <p>
     ${data.answer}
   </p>
 </div>
</div>
 `;

 card.addEventListener('click', () => card.classList.toggle('show-answer'));

 // Adicione ao DOM
 cardsEl.push(card);

 cardsContainer.appendChild(card);

 updateCurrentText();
}

// mostrar o número de cards
function updateCurrentText() {
 currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// pega os dados cards do local storage
function getCardsData() {
 const cards = JSON.parse(localStorage.getItem('cards'));
 return cards === null ? [] : cards;
}

// adiciona card no local storage
function setCardsData(cards) {
 localStorage.setItem('cards', JSON.stringify(cards));
 window.location.reload();
}

createCards();

// Event listeners

// botão próximo
nextBtn.addEventListener('click', () => {
 cardsEl[currentActiveCard].className = 'card left';

 currentActiveCard = currentActiveCard + 1;

 if (currentActiveCard > cardsEl.length - 1) {
   currentActiveCard = cardsEl.length - 1;
 }

 cardsEl[currentActiveCard].className = 'card active';

 updateCurrentText();
});

// botão anterior
prevBtn.addEventListener('click', () => {
 cardsEl[currentActiveCard].className = 'card right';

 currentActiveCard = currentActiveCard - 1;

 if (currentActiveCard < 0) {
   currentActiveCard = 0;
 }

 cardsEl[currentActiveCard].className = 'card active';

 updateCurrentText();
});

// Mostrar adicionar tela
showBtn.addEventListener('click', () => addContainer.classList.add('show'));
// Ocultar adicionar tela
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// Adicionar novo card
addCardBtn.addEventListener('click', () => {
 const question = questionEl.value;
 const answer = answerEl.value;

 if (question.trim() && answer.trim()) {
   const newCard = { question, answer };

   createCard(newCard);

   questionEl.value = '';
   answerEl.value = '';

   addContainer.classList.remove('show');

   cardsData.push(newCard);
   setCardsData(cardsData);
 }
});

// botão limpar cards 
clearBtn.addEventListener('click', () => {
 localStorage.clear();
 cardsContainer.innerHTML = '';
 window.location.reload();
});