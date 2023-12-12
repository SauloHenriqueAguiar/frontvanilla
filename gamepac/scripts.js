const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;
const delay = 500; // delay para reiniciar o jogo

// Criar  adereços da bola
const ball = {
 x: canvas.width / 2,
 y: canvas.height / 2,
 size: 10,
 speed: 4,
 dx: 4,
 dy: -4,
 visible: true
};

// Criar adereços paddle
const paddle = {
 x: canvas.width / 2 - 40,
 y: canvas.height - 20,
 w: 80,
 h: 10,
 speed: 8,
 dx: 0,
 visible: true
};

// Criar adereços tijolos
const brickInfo = {
 w: 70,
 h: 20,
 padding: 10,
 offsetX: 45,
 offsetY: 60,
 visible: true
};

// Criar tijolos
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

//Desenha uma bola na tela
function drawBall() {
 ctx.beginPath();
 ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
 ctx.fillStyle = ball.visible ? '#0095dd' : 'transparent';
 ctx.fill();
 ctx.closePath();
}

// Desenhar remo na tela
function drawPaddle() {
 ctx.beginPath();
 ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
 ctx.fillStyle = paddle.visible ? '#0095dd' : 'transparent';
 ctx.fill();
 ctx.closePath();
}

// Desenha a pontuação na tela
function drawScore() {
 ctx.font = '20px Arial';
 ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// Desenha tijolos na tela
function drawBricks() {
 bricks.forEach(column => {
   column.forEach(brick => {
     ctx.beginPath();
     ctx.rect(brick.x, brick.y, brick.w, brick.h);
     ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
     ctx.fill();
     ctx.closePath();
   });
 });
}

// Move o remo na tela
function movePaddle() {
 paddle.x += paddle.dx;

 // Wall detection
 if (paddle.x + paddle.w > canvas.width) {
   paddle.x = canvas.width - paddle.w;
 }

 if (paddle.x < 0) {
   paddle.x = 0;
   }
}

// Move a bola na tela

function moveBall() {
 ball.x += ball.dx;
 ball.y += ball.dy;

 // Colisão de parede (direita/esquerda)
 if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
   ball.dx *= -1; // ball.dx = ball.dx * -1
 }

 // Colisão de parede (superior/inferior)
 if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
   ball.dy *= -1;
 }

 // Colisão com o remo
 if (
  ball.x - ball.size > paddle.x &&
  ball.x + ball.size < paddle.x + paddle.w &&
  ball.y + ball.size > paddle.y
) {
  ball.dy = -ball.speed;
}

// Colisão com tijolos
bricks.forEach(column => {
  column.forEach(brick => {
    if (brick.visible) {
      if (
        ball.x - ball.size > brick.x && // verificação do lado esquerdo do tijolo
        ball.x + ball.size < brick.x + brick.w && // verificação do lado direito do tijolo
        ball.y + ball.size > brick.y && // verificação do topo do tijolo
        ball.y - ball.size < brick.y + brick.h // verificação da parte inferior do tijolo
      ) {
        ball.dy *= -1;
        brick.visible = false;

        increaseScore();
      }
    }
  });
});

// Acerte a parede inferior - Perca
if (ball.y + ball.size > canvas.height) {
 showAllBricks();
 score = 0;
}
}

// Aumenta a pontuação
function increaseScore() {
 score++;

 if (score % (brickRowCount * brickColumnCount) === 0) {

     ball.visible = false;
     paddle.visible = false;

     //depois de 0.5s reinicie o jogo
     setTimeout(function () {
         showAllBricks();
         score = 0;
         paddle.x = canvas.width / 2 - 40;
         paddle.y = canvas.height - 20;
         ball.x = canvas.width / 2;
         ball.y = canvas.height / 2;
         ball.visible = true;
         paddle.visible = true;
     },delay)
 }
}

// Faz todos os tijolos aparecerem
function showAllBricks() {
 bricks.forEach(column => {
   column.forEach(brick => (brick.visible = true));
 });
}

// Desenha tudo
function draw() {
 // clear canvas
 ctx.clearRect(0, 0, canvas.width, canvas.height);

 drawBall();
 drawPaddle();
 drawScore();
 drawBricks();
}

// Atualizar desenho e animação da tela
function update() {
 movePaddle();
 moveBall();

 // Desenhar tudo
 draw();

 requestAnimationFrame(update);
}

update();

//Evento de keydown
function keyDown(e) {
 if (e.key === 'Right' || e.key === 'ArrowRight') {
   paddle.dx = paddle.speed;
 } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
   paddle.dx = -paddle.speed;
 }
}

// Evento Keyup 
function keyUp(e) {
 if (
   e.key === 'Right' ||
   e.key === 'ArrowRight' ||
   e.key === 'Left' ||
   e.key === 'ArrowLeft'
 ) {
   paddle.dx = 0;
 }
}

// Evento de tecla de seta 
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Regras e fechar eventos de botão
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));