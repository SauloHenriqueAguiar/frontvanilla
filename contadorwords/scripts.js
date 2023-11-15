const input = document.querySelector('#input');
const counter = document.querySelector('.counter');
const toggleButton = document.querySelector('#toggle');

let mode = 'characters';

toggleButton.addEventListener('click', () => {
  if (mode === 'characters') {
    mode = 'words';
    toggleButton.textContent = 'Contar Caracteres';
    counter.textContent = `${input.value.split(/\s+/).filter((word) => word !== '').length} Palavras`;
  } else   {
    mode = 'characters';
    toggleButton.textContent = 'Contar Palavras';
    counter.textContent = `${input.value.length} Caracteres`;
  }


} );

input.addEventListener('input', () => {
   
 let count = 0;

 if (mode === 'characters') {
   count = input.value.length;
   counter.textContent = `${count} characters`;

 } else if (mode === 'words') {
   count = input.value.split(/\s+/).filter((word) => word !== '').length;
 }

});