import refs from './refs';

const API_KEY =
  'live_1649jraXXFJZ0EuCmTKzj7icNC9VGyoX53IwfWwbmARWyiy1MmjGJcOuaMofRudb';
const BASE_URL = 'https://api.thecatapi.com/v1';
const END_POINT = '/breeds';
const END_POINT_SEARCH = '/images/search';
const options = {
  method: 'GET',
  headers: {
    'x-api-key': API_KEY,
  },
};

refs.error.classList.add('is-hidden');
refs.loader.classList.add('is-hidden');

export const fetchBreeds = () => {
  refs.selectBreedEl.classList.add('is-hidden');
  refs.loader.classList.remove('is-hidden');
  return fetch(`${BASE_URL}${END_POINT}`, options).then(response => {
    if (!response.ok) {
      refs.loader.classList.add('is-hidden');
      refs.error.classList.remove('is-hidden');
      throw new Error(response.statusText);
    }
    refs.loader.classList.add('is-hidden');
    refs.selectBreedEl.classList.remove('is-hidden');
    return response.json();
  });
};

export const fetchCatByBreed = breedId => {
  refs.loader.classList.remove('is-hidden');
  refs.catInfoEl.classList.add('is-hidden');
  return fetch(
    `${BASE_URL}${END_POINT_SEARCH}?breed_ids=${breedId}`,
    options
  ).then(response => {
    if (!response.ok) {
      refs.loader.classList.add('is-hidden');
      refs.error.classList.remove('is-hidden');
      throw new Error(response.statusText);
    }
    refs.loader.classList.add('is-hidden');
    refs.catInfoEl.classList.remove('is-hidden');
    return response.json();
  });
};
