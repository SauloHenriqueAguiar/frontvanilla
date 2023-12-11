const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

// pesquisa por artista ou música
async function searchSongs(term) {
 const res = await fetch(`${apiURL}/suggest/${term}`);
 const data = await res.json();

 showData(data);
}

// mostra as músicas e artistas na DOM
function showData(data) {
 result.innerHTML = `
   <ul class="songs">
     ${data.data
       .map(
         song => `<li>
     <span><strong>${song.artist.name}</strong> - ${song.title}</span>
     <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Obter letras</button>
   </li>`
       )
       .join('')}
   </ul>
 `;

 if (data.prev || data.next) {
   more.innerHTML = `
     ${
       data.prev
         ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Anterior</button>`
         : ''
     }
     ${
       data.next
         ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Próximo</button>`
         : ''
     }
   `;
 } else {
   more.innerHTML = '';
 }
}

// va para anterior ou proximo música
async function getMoreSongs(url) {
 const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
 const data = await res.json();

 showData(data);
}


// obtem  letra para musica
async function getLyrics(artist, title) {
 const res = await fetch(`${apiURL}/v1/${artist}/${title}`);
 const data = await res.json();

  if (data.error) {
       result.innerHTML = data.error;
  } else {
       const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

       result.innerHTML = `
           <h2><strong>${artist}</strong> - ${title}</h2>
           <span>${lyrics}</span>
       `;
 }

 more.innerHTML = '';
}

// Event listeners
form.addEventListener('submit', e => {
 e.preventDefault();

 const searchTerm = search.value.trim();

 if (!searchTerm) {
   alert('Por favor digite um termo de pesquisa');
 } else {
   searchSongs(searchTerm);
 }
});

// obtem letra com clique
result.addEventListener('click', e => {
 const clickedEl = e.target;

 if (clickedEl.tagName === 'BUTTON') {
   const artist = clickedEl.getAttribute('data-artist');
   const songTitle = clickedEl.getAttribute('data-songtitle');

   getLyrics(artist, songTitle);
 }
});