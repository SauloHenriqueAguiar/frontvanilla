const botaoVerificar = document.querySelector('#botao-verificar');
const palavraInput = document.querySelector('#palavra');
const resultado = document.querySelector('#resultado');

function verificarPalindromo () {
 const palavra = palavraInput.value;
 const palavraInvertida = palavra.split('').reverse().join(''); 
 if(palavra.toLowerCase() === palavraInvertida.toLowerCase()) {
  resultado.textContent = `${palavra} é um palíndromo`;
 } else {
  resultado.textContent = `${palavra} não é um palíndromo`;
 }
}

botaoVerificar.addEventListener('click', verificarPalindromo);

palavraInput.addEventListener('keyup', (event) => {
 if(event.keyCode === 13) {
  verificarPalindromo();
 }
});