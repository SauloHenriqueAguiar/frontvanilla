const defalutCharacter = {
 name: '',
 life: 1,
 maxLife: 1,
 attack: 0,
 defense: 0,
}

const createKnight = (name) => {
 return {
  ...defalutCharacter, //herda as propriedades do objeto defalutCharacter ,
  name,
  life: 100,
  maxLife: 100,
  attack: 10,
  defense: 10,
 }
}

const createSorcerer = (name) => {
 return {
  ...defalutCharacter,
  name,
  life: 50,
  maxLife: 50,
  attack: 15,
  defense: 5,
 }
}

const createLitterMonster = () => {
 return {
  ...defalutCharacter,
  name: 'Litter Monster',
  life: 40,
  maxLife: 40,
  attack: 4,
  defense: 4,
 }
}

const createBigMonster = () => {
 return {
  ...defalutCharacter,
  name: 'Big Monster',
  life: 120,
  maxLife: 120,
  attack: 16,
  defense: 6,
 }
}

const stage = {
 fighter1: null,
 fighter2: null,
 fighter1El: null,
 fighter2El: null,

 start(fighter1, fighter2, fighter1El, fighter2El) {
  this.fighter1 = fighter1;
  this.fighter2 = fighter2;
  this.fighter1El = fighter1El;
  this.fighter2El = fighter2El;

  this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
  this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));

  this.update();
 },

 update() {
  //fighter 1
  this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`;
  let f1Pct = (this.fighter1.life / this.fighter1.maxLife)*100;
  this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`;
  //fighter 2
  this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`;
  let f2Pct = (this.fighter2.life / this.fighter2.maxLife)*100;
  this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`;
 },

 doAttack(attacking, attacked) {
  if(attacking.life <= 0 || attacked.life <= 0) {
   log.addMessage('Não é possível atacar um personagem morto');
   return;
  }
  const attackFactor = (Math.random() * 2).toFixed(2);
  const defenseFactor = (Math.random() * 2).toFixed(2);

  const actualAttack = attacking.attack * attackFactor;
  const actualDefense = attacked.defense * defenseFactor;

  if(actualAttack > actualDefense) {
     attacked.life -= actualAttack;
     attacked.life = attacked.life < 0 ? 0 : attacked.life;
     log.addMessage(`${attacking.name} atacou ${attacked.name} com ${actualAttack.toFixed(2)} de dano`);
  }else{
   log.addMessage(`${attacked.name} defendeu o ataque`);
  }

  this.update();
 }
}

const log = {
 list : [],
 addMessage(msg) {
  this.list.push(msg);
  this.render();
 },
 render() {
  const logEL = document.querySelector('.log');
  logEL.innerHTML = '';

  for(let i in this.list) {
   logEL.innerHTML += `<li>${this.list[i]}</li>`;
  }
  }

}