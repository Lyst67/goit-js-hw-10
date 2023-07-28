import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import refs from './refs';

fetchBreeds()
  .then(cats => {
    refs.selectBreedEl.innerHTML = createMarkup(cats);
    refs.selectBreedEl.addEventListener('change', handleChooseEl);
  })
  .catch(error => {
    console.log(error);
  });

function handleChooseEl() {
  const breedId = refs.selectBreedEl.value;
  fetchCatByBreed(breedId)
    .then(data => {
      const imgUrl = data[0].url;
      const title = data[0].breeds[0].name;
      const descr = data[0].breeds[0].description;
      const tempr = data[0].breeds[0].temperament;
      createCard(imgUrl, title, descr, tempr);
    })
    .catch(error => console.log(error));
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
  refs.catInfoEl.innerHTML = catInf;
}
