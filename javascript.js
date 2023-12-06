let locationInput = '90302';

const searchForm = document.querySelector('#search');
const searchInput = document.querySelector('input');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  locationInput = searchInput.value;
  getWeatherData(locationInput);

});

async function getTheWeather(locationInput) {
  const weatherData = await getWeatherData(locationInput);
  const filteredData = await filterWeatherData(weatherData);
  console.log(filteredData);
}

async function getWeatherData(locationInput) {
  const url = getSearchUrl(locationInput);
  const response = await fetch(url, { mode: 'cors' });
  const weatherData = await response.json()
  return weatherData;
}

function getSearchUrl(locationInput) {
  const locationString = encodeURIComponent(locationInput);
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationString}`
  return url;
}

async function filterWeatherData(weatherData) {
  const weatherData = await getWeatherData(locationInput);
  console.log(weatherData);

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
    }
  }
  console.log(filteredData);
}

getWeatherData(locationInput);
