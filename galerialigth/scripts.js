const galleryItems = document.querySelectorAll('.galery-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');

galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
       const imageURL = item.querySelector('.galery-image').getAttribute('data-src');
       lightboxImage.setAttribute('src', imageURL);
       lightbox.style.display = 'flex';
    });
});

lightboxClose.addEventListener('click', function () {
 lightbox.style.display = 'none';
}
);
