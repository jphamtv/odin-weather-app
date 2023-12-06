import { API_KEY } from "./config.js";

let locationInput = '90302';

const searchForm = document.querySelector('#search');
const searchInput = document.querySelector('input');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  locationInput = searchInput.value;
  const weatherData = await getWeatherData(locationInput);
  const filteredData = await filterWeatherData(weatherData);
  await displayWeatherData(filteredData);
});


async function displayWeatherData(filteredData) {
  const cityDiv = document.querySelector('.city');
  const currentTimeDiv = document.querySelector('.current-time');
  const temperatureDiv = document.querySelector('.temperature');
  const conditionIcon = document.querySelector('.icon');
  const conditionDescriptionDiv = document.querySelector('.description');

  cityDiv.textContent = filteredData.location.city;
  currentTimeDiv.textContent = filteredData.location.localTime;
  temperatureDiv.textContent = filteredData.current.fahrenheit;
  conditionIcon.src = filteredData.current.iconUrl;
  conditionDescriptionDiv.textContent = filteredData.current.conditionDescription;
}


async function getWeatherData(locationInput) {
  const url = getSearchUrl(locationInput);

  try {
    const response = await fetch(url, { mode: 'cors' });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const weatherData = await response.json()
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data', error);
  }
}


function getSearchUrl(locationInput) {
  const locationString = encodeURIComponent(locationInput);
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${locationString}`
  return url;
}

async function filterWeatherData(weatherData) {
  // Get location information
  const name = weatherData.location.name;
  const region = weatherData.location.region;
  const country = weatherData.location.country;
  const localTime = weatherData.location.localtime;

  // Get current weather condition
  const fahrenheit = weatherData.current.temp_f;
  const celsius = weatherData.current.temp_c;
  const conditionDescription = weatherData.current.condition.text;
  const iconUrl = weatherData.current.condition.icon;
  const isDay = weatherData.current.is_day;

  const filteredData = {
    location: {
      city: name,
      region: region,
      country: country,
      localTime: localTime
    },
    current: {
      fahrenheit: fahrenheit,
      celsius: celsius,
      conditionDescription: conditionDescription,
      iconUrl: iconUrl,
      isDay: isDay
    }
  }
  return filteredData;
}

