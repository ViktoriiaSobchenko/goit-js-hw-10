import Notiflix from 'notiflix';

const URL = 'https://restcountries.com/v3.1/name/';
const FIELDS = 'name,capital,population,flags,languages';

function fetchCountries(name) {
  return fetch(`${URL}/${name}?fields=${FIELDS}`).then(response => {
    if (!response.ok) {
      Notiflix.Notify.failure('Oops, there is no country with that name', {
        timeout: 2500,
      });
    }
    return response.json();
  });
}

export default fetchCountries;
