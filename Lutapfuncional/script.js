const char = createKnight('Saulo');
const monster = createBigMonster();

stage.start(
 char, 
 monster,
 document.querySelector('#char'),
 document.querySelector('#monster')
 );