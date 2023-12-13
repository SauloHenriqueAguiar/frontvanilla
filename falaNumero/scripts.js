const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Number:', randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

 // inicia reconhecimento e jogo
recognition.start();


// capturua o que o usuario fala
function onSpeak(e) {
 const msg = e.results[0][0].transcript;

 writeMessage(msg);
 checkNumber(msg);
}

// Escreve oque o usuario fala
function writeMessage(msg) {
 msgEl.innerHTML = `
   <div>Você disse: </div>
   <span class="box">${msg}</span>
 `;
}

// checa a mensagem em relação ao número
function checkNumber(msg) {
 const num = +msg;

 // checa se é um numero valido
 if (Number.isNaN(num)) {
   msgEl.innerHTML += '<div>Esse número não é valido</div>';
   return;
 }

 // checa no intervalo de 1 a 100
 if (num > 100 || num < 1) {
   msgEl.innerHTML += '<div>O Número deve está entre 1 e 100</div>';
   return;
 }

 // checa o numero
 if (num === randomNum) {
   document.body.innerHTML = `
     <h2>Parabens! Você advinhou o número! <br><br>
    Era ${num}</h2>
     <button class="play-again" id="play-again">Jogue Novamente</button>
   `;
 } else if (num > randomNum) {
   msgEl.innerHTML += '<div>É um número menor</div>';
 } else {
   msgEl.innerHTML += '<div>É um número maior</div>';
 }
}

// gera numero aleatório
function getRandomNumber() {
 return Math.floor(Math.random() * 100) + 1;
}

// resultado de fala
recognition.addEventListener('result', onSpeak);

// encerra o serviço de fala
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', e => {
 if (e.target.id == 'play-again') {
   window.location.reload();
 }
});


