import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ApiService from './js/api-service';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  bootButton: document.querySelector('.load-more'),
};

const lightbox = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const newApiService = new ApiService();

Notify.init({
  width: '400px',
  position: 'right-top',
  distance: '50px',
  cssAnimationStyle: 'from-right',
  fontSize: '15px',
});

refs.searchForm.addEventListener('submit', onSubmitFetch);
refs.bootButton.addEventListener('click', onClickLoad);
refs.bootButton.hidden = true;

function onSubmitFetch(e) {
  e.preventDefault();
  clearImageGallery();

  newApiService.query = e.currentTarget.elements.searchQuery.value;

  if (newApiService.query === '') {
    Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
    return;
  }

  newApiService.resetPage();
  newApiService
    .getContent()
    .then(({ hits, totalHits }) => {
      if (totalHits !== 0) {
        refs.bootButton.hidden = false;
      }
      validateQuery(totalHits);
      renderGalleryMarkup(hits);

      lightbox.refresh();
    })
    .catch(error => {
      console.log(error);
    });
}

function onClickLoad() {
  newApiService
    .getContent()
    .then(({ hits }) => {
      renderGalleryMarkup(hits);
      lightbox.refresh();
    })
    .catch(error => {
      Notify.failure(
        `We're sorry, but you've reached the end of search results.`
      );
      refs.bootButton.hidden = true;
    });
}

function renderGalleryMarkup(hits) {
  const markup = hits
    .map(el => {
      return `
<div class="photo-card">
  <a class="gallery_item" href="${el.largeImageURL}">
  <img class="gallery_image" src="${el.webformatURL}" alt="${el.tags}" loading="lazy" width=400 height=300/>
  </a>
  <div class="info">
    <p class="info-item">
      <b> <span>Likes</span> <span class="info-item__value"> ${el.likes}</span>  </b>
    </p>
    <p class="info-item">
      <b> <span>Views</span> <span class="info-item__value"> ${el.views}</span>  </b>
    </p>
    <p class="info-item">
      <b> <span>Comments</span> <span class="info-item__value"> ${el.comments}</span>  </b>
    </p>
    <p class="info-item">
      <b> <span>Downloads</span> <span class="info-item__value"> ${el.downloads}</span>  </b>
    </p>
  </div>
</div>`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearImageGallery() {
  refs.gallery.innerHTML = '';
}

function validateQuery(value) {
  if (value === 0) {
    Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
    return;
  } else {
    Notify.success(`Hooray! We found ${value} images.`);
  }
}
