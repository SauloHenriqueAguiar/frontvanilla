const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');


const data = [
 {
   image: './img/drink.jpg',
   text: "Estou com sede"
 },
 {
   image: './img/food.jpg',
   text: "Estou com fome"
 },
 {
   image: './img/tired.jpg',
   text: "Estou cansado"
 },
 {
   image: './img/hurt.jpg',
   text: "Estou ferido"
 },
 {
   image: './img/happy.jpg',
   text: "Estou Feliz"
 },
 {
   image: './img/angry.jpg',
   text: "Estou com raiva"
 },
 {
   image: './img/sad.jpg',
   text: "Estou triste"
 },
 {
   image: './img/scared.jpg',
   text: "Eu estou assustado"
 },
 {
   image: './img/outside.jpg',
   text: 'Eu quero sair'
 },
 {
   image: './img/home.jpg',
   text: 'Eu quero ir para casa'
 },
 {
   image: './img/school.jpg',
   text: 'Eu quero ir a escola'
 },
 {
   image: './img/grandma.jpg',
   text: 'Eu quero ir para as vovós'
 }
];

data.forEach(createBox);

// Cria caixas de fala
function createBox(item) {
 const box = document.createElement('div');

 const { image, text } = item;

 box.classList.add('box');

 box.innerHTML = `
   <img src="${image}" alt="${text}" />
   <p class="info">${text}</p>
 `;

 box.addEventListener('click', () => {
   setTextMessage(text);
   speakText();

   // Adiciona efeito ativo
   box.classList.add('active');
   setTimeout(() => box.classList.remove('active'), 800);
 });

 main.appendChild(box);
}

// Sintetizador de fala inicial
const message = new SpeechSynthesisUtterance();

// Armazenar vozes
let voices = [];



function getVoices() {
 voices = speechSynthesis.getVoices();

 voices.forEach(voice => {
   const option = document.createElement('option');

   option.value = voice.name;
   option.innerText = `${voice.name} ${voice.lang}`;

   voicesSelect.appendChild(option);
 });
}


// Definir texto
function setTextMessage(text) {
 message.text = text;
}

// Falar texto
function speakText() {
 speechSynthesis.speak(message);
}

// Definir voz
function setVoice(e) {
 message.voice = voices.find(voice => voice.name === e.target.value);
}

// Vozes alteradas
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Alternar caixa de texto
toggleBtn.addEventListener('click', () =>
 document.getElementById('text-box').classList.toggle('show')
);

// Botão Fechar
closeBtn.addEventListener('click', () =>
 document.getElementById('text-box').classList.remove('show')
);

// Mudar voz
voicesSelect.addEventListener('change', setVoice);

// Ler texto do botão
readBtn.addEventListener('click', () => {
 setTextMessage(textarea.value);
 speakText();
});

getVoices();