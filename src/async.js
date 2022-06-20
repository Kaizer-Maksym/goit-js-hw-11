// // Хочете використовувати async/await? Додайте ключове слово `async` до своєї зовнішньої функції/методу.
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

// async function onSubmitFetch(e) {
//   e.preventDefault();
//   clearImageGallery();
//   if (newApiService.query === '') {
//     Notify.failure(
//       `Sorry, there are no images matching your search query. Please try again.`
//     );
//     return;
//   }
// try { newApiService.query = e.currentTarget.elements.searchQuery.value;
//   newApiService.resetPage();
//   newApiService
//     .fetchContent()
//     .then(data => {
//       if (data.totalHits === 0) {
//         Notify.failure(
//           `Sorry, there are no images matching your search query. Please try again.`
//         );
//         return;
//       } else {
//         Notify.success(`Hooray! We found ${data.totalHits} images.`);
//         refs.bootButton.classList.toggle('hidden');
//       }
//       return data.hits;
//     })
//     .then(renderGalleryMarkup);}

// }
