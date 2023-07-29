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

export const fetchBreeds = () => {
  return fetch(`${BASE_URL}${END_POINT}`, options).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};

export const fetchCatByBreed = breedId => {
  return fetch(
    `${BASE_URL}${END_POINT_SEARCH}?breed_ids=${breedId}`,
    options
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};
