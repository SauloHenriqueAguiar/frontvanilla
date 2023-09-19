let log = new Log(document.querySelector('.log'));
let char = new Knight("Saulo");
let monster = new LitterMonster();

const stage = new Stage(
 char, 
 monster, 
 document.querySelector('#char'), 
 document.querySelector('#monster'),
 log);

stage.start();

