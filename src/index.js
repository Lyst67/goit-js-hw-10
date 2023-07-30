import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import getrRefs from './refs';

const refs = getrRefs();
const { selectBreedEl, loaderEl, errorEl, catInfoEl } = refs;

fetchBreeds()
  .then(cats => {
    selectBreedEl.innerHTML = createMarkup(cats);
    selectBreedEl.addEventListener('change', handleChooseEl);
    loaderEl.classList.add('is-hidden');
    selectBreedEl.classList.remove('is-hidden');
  })
  .catch(onFetchError);

function handleChooseEl() {
  errorEl.classList.add('is-hidden');
  loaderEl.classList.remove('is-hidden');
  const breedId = selectBreedEl.value;
  fetchCatByBreed(breedId)
    .then(data => {
      const imgUrl = data[0].url;
      const title = data[0].breeds[0].name;
      const descr = data[0].breeds[0].description;
      const tempr = data[0].breeds[0].temperament;
      createCard(imgUrl, title, descr, tempr);
      loaderEl.classList.add('is-hidden');
      catInfoEl.classList.remove('is-hidden');
    })
    .catch(onFetchError);
}

function createMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function createCard(url, name, descr, char) {
  const catInf = `<img src="${url}" alt="cat" width="500" />
  <div><h1>${name}</h1>
      <p>${descr}</p>
      <p><b>Temperament:</b> ${char}</p></div>`;
  catInfoEl.innerHTML = catInf;
}
function onFetchError() {
  catInfoEl.classList.add('is-hidden');
  loaderEl.classList.add('is-hidden');
  errorEl.classList.remove('is-hidden');
}
