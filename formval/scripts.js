const form = document.querySelector('form');
const nome = document.querySelector('#nome');
const email = document.querySelector('#email');
const mensagem = document.querySelector('#mensagem');
const assunto = document.querySelector('#assunto');
const errorMessages = document.querySelectorAll('.error-message');

form.addEventListener('submit', (e) => {
 e.preventDefault();
 resetErros();
 checkInputs();
});

function setError(input, errorMessage) {
 const errorMessageElement = input.nextElementSibling;
 errorMessageElement.textContent = errorMessage;
 input.parentElement.classList.add('error');
}

function isEmail(email) {
 const re = /\S+@\S+\.\S+/;
 return re.test(email);
}

function resetErros() {
 errorMessages.forEach((msg) => {
  msg.textContent = '';
  msg.parentElement.classList.remove('error');
 });
 nome.parentElement.classList.remove('error');
 email.parentElement.classList.remove('error');
 mensagem.parentElement.classList.remove('error');
 assunto.parentElement.classList.remove('error');
}

function checkInputs() {
 const nomeValue = nome.value.trim();
 const emailValue = email.value.trim();
 const mensagemValue = mensagem.value.trim();
 const assuntoValue = assunto.value.trim();

 if (nomeValue === '') {
  setError(nome, 'Nome não pode ser vazio');
 }
 if (emailValue === '' && !isEmail(emailValue)) {
  setError(email, 'Email inválido');
 }
 if (mensagemValue === '') {
  setError(mensagem, 'Mensagem não pode ser vazio');
 }
 if (assuntoValue === '') {
  setError(assunto, 'Assunto não pode ser vazio');
 }
}
