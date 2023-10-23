const cpfEl = document.querySelector('#cpf');
const gerarCPFBtn = document.querySelector('#gerar-cpf');
const copiarCPFBtn = document.querySelector('#copiar-cpf');

function gerarCPF() {
 let n = Math.floor(Math.random() * 999999999) + 1;
 let nStr = n.toString().padStart(9, '0');
 let dv1 = calcularDigitoVerificador(nStr, 10);
 let dv2 = calcularDigitoVerificador(nStr + dv1, 11);

 cpfEl.innerHTML = formataCPF(nStr + dv1 + dv2);
}


function calcularDigitoVerificador(numero, peso) {
 let total =0;
 for (let i=0; i< numero.length; i++) {
  total += parseInt(numero.charAt(i)) * peso--;
 }
 let resto = total % 11;
 return resto < 2 ? 0 : 11 - resto;
}

function formataCPF(numero) {
 return numero.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function copiarCPF() {
 const cpf = cpfEl.innerHTML;
 navigator.clipboard.writeText(cpf).then(() => {
  alert(`CPF ${cpf} copiado com sucesso!`);
 },
 () => {
  alert('Não foi possível copiar o CPF');
 });
}

gerarCPFBtn.addEventListener('click', gerarCPF);
copiarCPFBtn.addEventListener('click', copiarCPF);