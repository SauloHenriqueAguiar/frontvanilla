// ELementos
const input = document.querySelector('input');
const lista = document.querySelector('ul');

// Funções
function handleKeyUp(e) {
  if (e.key === 'Enter') {
   const newLi = document.createElement('li');
   newLi.innerHTML = input.value;
   lista.appendChild(newLi);
   
 }
}

// Eventos
input.addEventListener('keyup', handleKeyUp);
