const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// titulos das musicas
const songs = ['hey', 'summer', 'ukulele'];

// Acompanhe a música
let songIndex = 2;

// Carregue inicialmente os detalhes da música no DOM
loadSong(songs[songIndex]);

// Atualize os detalhes da música
function loadSong(song) {
 title.innerText = song;
 audio.src = `music/${song}.mp3`;
 cover.src = `images/${song}.jpg`;
}

// Eventos de ouvinte
function playSong() {
 musicContainer.classList.add('play');
 playBtn.querySelector('i.fas').classList.remove('fa-play');
 playBtn.querySelector('i.fas').classList.add('fa-pause');

 audio.play();
}

// pausa a musica
function pauseSong() {
 musicContainer.classList.remove('play');
 playBtn.querySelector('i.fas').classList.add('fa-play');
 playBtn.querySelector('i.fas').classList.remove('fa-pause');

 audio.pause();
}

// musica anterior
function prevSong() {
 songIndex--;

 if (songIndex < 0) {
   songIndex = songs.length - 1;
 }

 loadSong(songs[songIndex]);

 playSong();
}

// musica seguinte
function nextSong() {
 songIndex++;

 if (songIndex > songs.length - 1) {
   songIndex = 0;
 }

 loadSong(songs[songIndex]);

 playSong();
}

// Atualize a barra de progresso
function updateProgress(e) {
 const { duration, currentTime } = e.srcElement;
 const progressPercent = (currentTime / duration) * 100;
 progress.style.width = `${progressPercent}%`;
}

// Defina a barra de progresso
function setProgress(e) {
 const width = this.clientWidth;
 const clickX = e.offsetX;
 const duration = audio.duration;

 audio.currentTime = (clickX / width) * duration;
}

// obter duração e tempo atual para o tempo da música
function DurTime (e) {
const {duration,currentTime} = e.srcElement;
var sec;
var sec_d;

// definir minutos currentTime
let min = (currentTime==null)? 0:
 Math.floor(currentTime/60);
 min = min <10 ? '0'+min:min;

// definir segundos currentTime
function get_sec (x) {
 if(Math.floor(x) >= 60){
  
  for (var i = 1; i<=60; i++){
   if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
    sec = Math.floor(x) - (60*i);
    sec = sec <10 ? '0'+sec:sec;
   }
  }
 }else{
   sec = Math.floor(x);
   sec = sec <10 ? '0'+sec:sec;
  }
} 

get_sec (currentTime,sec);

// alterar DOM de horário atual
currTime.innerHTML = min +':'+ sec;

// definir minutos duration
let min_d = (isNaN(duration) === true)? '0':
 Math.floor(duration/60);
 min_d = min_d <10 ? '0'+min_d:min_d;


 function get_sec_d (x) {
 if(Math.floor(x) >= 60){
  
  for (var i = 1; i<=60; i++){
   if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
    sec_d = Math.floor(x) - (60*i);
    sec_d = sec_d <10 ? '0'+sec_d:sec_d;
   }
  }
 }else{
   sec_d = (isNaN(duration) === true)? '0':
   Math.floor(x);
   sec_d = sec_d <10 ? '0'+sec_d:sec_d;
  }
} 

// definir segundos duration

get_sec_d (duration);

// alterar DOM de duração
durTime.innerHTML = min_d +':'+ sec_d;
 
};

// Event listeners
playBtn.addEventListener('click', () => {
 const isPlaying = musicContainer.classList.contains('play');

 if (isPlaying) {
   pauseSong();
 } else {
   playSong();
 }
});

// mudar musica
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// atualizar o tempo da musica
audio.addEventListener('timeupdate', updateProgress);

//  clique na barra de progresso
progressContainer.addEventListener('click', setProgress);

// quando a música terminar
audio.addEventListener('ended', nextSong);

// tempo da musica
audio.addEventListener('timeupdate',DurTime);

