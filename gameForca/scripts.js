const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['aplicacao', 'programacao', 'futebol', 'pernambuco'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLetters = [];
const wrongLetters = [];


// Mostrar palavra oculta
function displayWord() {
  
 // Monta o HTML para exibir a palavra oculta com as letras adivinhadas

	wordEl.innerHTML = `
    ${selectedWord
			.split('')
			.map(
				letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
			)
			.join('')}
  `;

// Remove espaços em branco e quebras de linha da palavra exibida
	const innerWord = wordEl.innerText.replace(/[ \n]/g, '');

// Verifica se todas as letras foram corretamente adivinhadas

	if (innerWord === selectedWord) {
  // Exibe uma mensagem de vitória
		finalMessage.innerText = 'Parabéns! Você Ganhou! 😃';
		finalMessageRevealWord.innerText = '';
		popup.style.display = 'flex';

  // Desativa a capacidade de jogar 
		playable = false;
	}
}


// Atualiza a lista de letras erradas
function updateWrongLettersEl() {
	// Exibe as letras erradas
	wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

	// Exibe as partes do corpo do boneco da forca
	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;

		if (index < errors) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
	});

	// Verifica se o jogador perdeu
	if (wrongLetters.length === figureParts.length) {
		finalMessage.innerText = 'Infelizmente você perdeu. 😕';
		finalMessageRevealWord.innerText = `...a palavra era: ${selectedWord}`;
		popup.style.display = 'flex';

		playable = false;
	}
}

// mostra notificação
function showNotification() {
	notification.classList.add('show');

	setTimeout(() => {
		notification.classList.remove('show');
	}, 2000);
}

// letra pressionada no teclado
window.addEventListener('keydown', e => {
	if (playable) {
		if (e.keyCode >= 65 && e.keyCode <= 90) {
			const letter = e.key.toLowerCase();

			if (selectedWord.includes(letter)) {
				if (!correctLetters.includes(letter)) {
					correctLetters.push(letter);

					displayWord();
				} else {
					showNotification();
				}
			} else {
				if (!wrongLetters.includes(letter)) {
					wrongLetters.push(letter);

					updateWrongLettersEl();
				} else {
					showNotification();
				}
			}
		}
	}
});

// Reinicia o jogo e joga novamente
playAgainBtn.addEventListener('click', () => {
	playable = true;

	//  Esvazia os arrays de letras corretas e erradas
	correctLetters.splice(0);
	wrongLetters.splice(0);

	selectedWord = words[Math.floor(Math.random() * words.length)];

	displayWord();

	updateWrongLettersEl();

	popup.style.display = 'none';
});

displayWord();