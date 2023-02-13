import '../css/styles.css';
import fetchCountries from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
  const inputValue = evt.target.value.trim();

  if (inputValue) {
    fetchCountries(inputValue).then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name',
          { timeout: 2500 }
        );
      }
      if (countries.length >= 2 && countries.length <= 10) {
        resetCountryInfo();
        return renderCountryList(countries);
      }
      if (countries.length === 1) {
        resetCountryList();
        return renderCountryCard(countries);
      }
    });
  }
  resetCountryList();
  resetCountryInfo();
  return;
}

function renderCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li class="country-item">
            <img src="${country.flags.svg}" alt="${country.flags.alt}" width="40" height="30" /> 
            <p>${country.name.official}</p>
            </li>`;
    })
    .join('');

  countryList.innerHTML = markup;
}

function renderCountryCard(countries) {
  const markup = countries
    .map(country => {
      return `<h1>
       <img src="${country.flags.svg}" alt="${
        country.flags.alt
      }" width="40" height="30" /> 
       ${country.name.official}
      </h1>
      <ul class="country-info_list">
        <li class="country-info_item">
          <h2>Capital:</h2>
          <p>${country.capital}</p>
        </li>
        <li class="country-info_item">
          <h2>Population:</h2>
          <p>${country.population}</p>
        </li>
        <li class="country-info_item">
          <h2>Languages:</h2>
          <p>${Object.values(country.languages).join(', ')}</p>
        </li>
      </ul>`;
    })
    .join('');

  countryInfo.innerHTML = markup;
}

function resetCountryList() {
  countryList.innerHTML = '';
}

function resetCountryInfo() {
  countryInfo.innerHTML = '';
}
