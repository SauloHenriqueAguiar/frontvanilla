// seleção de elementos
const generatePasswordButton = document.querySelector('#generate-password');
const generatedpasswordElement = document.querySelector('#generated-password');


//novas funções 
const openCloseGeneretorButton = document.querySelector('#open-generator-options');
const generatePasswordContainer = document.querySelector('#generator-options');
const lengthInput = document.querySelector('#length');
const letterInput = document.querySelector('#letters');
const numberInput = document.querySelector('#numbers');
const symbolInput = document.querySelector('#symbols');
const copypasswordButton = document.querySelector('#copy-password');


// funções
const getLetterLowerCase = () => {
 return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

const getLetterUpperCase = () => {
 return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

const getNumber = () => {
 return Math.floor(Math.random() * 10).toString();
}

const getSymbol = () => {
 const symbols = '!@#$%&*()_+{}[];.,';
 return symbols[Math.floor(Math.random() * symbols.length)];
}

const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {
 let password = '';

 const passwordLength = 10;

 const generators = [
  getLetterLowerCase,
  getLetterUpperCase,
  getNumber,
  getSymbol
 ];

 for (i = 0; i < passwordLength; i = i + 4) {
  generators.forEach(() => {
   const randomValue = generators[Math.floor(Math.random() * generators.length)]();
   password += randomValue;
  });
 }
 password = password.slice(0, passwordLength);

 generatedpasswordElement.style.display = 'block';
 generatedpasswordElement.querySelector('h4').innerHTML = password;
}

// eventos
generatePasswordButton.addEventListener('click', () => {
 generatePassword(
  getLetterLowerCase,
  getLetterUpperCase,
  getNumber,
  getSymbol
 );
});




