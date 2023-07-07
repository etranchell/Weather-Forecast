const apiKey = '7463aec950d8030240c60a772ae32e7f';

// Function to fetch weather data for a city
function fetchWeatherData(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Process and display current weather data
      displayCurrentWeather(data);
      console.log(data);
      // Fetch and display forecast data
      fetchForecastData(cityName);
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

// Function to fetch forecast data for a city
function fetchForecastData(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Process and display forecast data
      console.log(data);
      displayForecast(data.list);
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

// Function to display current weather data
function displayCurrentWeather(data) {
  const currentWeatherContainer = document.getElementById('currentWeather');
  currentWeatherContainer.innerHTML = '';

  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const weatherIcon = data.weather[0].icon;

  // Create HTML elements for current weather data
  const temperatureElement = document.createElement('p');
  temperatureElement.textContent = `Temperature: ${temperature}°F`;

  const humidityElement = document.createElement('p');
  humidityElement.textContent = `Humidity: ${humidity}%`;

  const windSpeedElement = document.createElement('p');
  windSpeedElement.textContent = `Wind Speed: ${windSpeed} mph`;

  const weatherIconElement = document.createElement('img');
  weatherIconElement.src = `http://openweathermap.org/img/w/${weatherIcon}.png`;
  weatherIconElement.alt = 'Weather Icon';

  // Append elements to the container
  currentWeatherContainer.appendChild(temperatureElement);
  currentWeatherContainer.appendChild(humidityElement);
  currentWeatherContainer.appendChild(windSpeedElement);
  currentWeatherContainer.appendChild(weatherIconElement);
}

// Function to display forecast data
function displayForecast(forecasts) {
  const forecastContainer = document.getElementById('forecast');
  forecastContainer.innerHTML = '';

  // Group forecasts by day
  const forecastByDay = groupForecastsByDay(forecasts);

  // Iterate over the forecast data for each day
  for (const day in forecastByDay) {
    if (forecastByDay.hasOwnProperty(day)) {
      const forecastsForDay = forecastByDay[day];

      // Take the first forecast entry of the day as representative
      const forecast = forecastsForDay[0];
      const forecastDate = new Date(forecast.dt * 1000);
      const temperature = forecast.main.temp;
      const humidity = forecast.main.humidity;
      const windSpeed = forecast.wind.speed;
      const weatherIcon = forecast.weather[0].icon;

      // Create HTML elements for the forecast entry
      const forecastElement = document.createElement('div');
      forecastElement.classList.add('forecast-item');

      const dateElement = document.createElement('p');
      dateElement.textContent = forecastDate.toDateString();

      const temperatureElement = document.createElement('p');
      temperatureElement.textContent = `Temperature: ${temperature}°F`;

      const humidityElement = document.createElement('p');
      humidityElement.textContent = `Humidity: ${humidity}%`;

      const windSpeedElement = document.createElement('p');
      windSpeedElement.textContent = `Wind Speed: ${windSpeed} mph`;

      const weatherIconElement = document.createElement('img');
      weatherIconElement.src = `http://openweathermap.org/img/w/${weatherIcon}.png`;
      weatherIconElement.alt = 'Weather Icon';

      // Append elements to the container
      forecastElement.appendChild(dateElement);
      forecastElement.appendChild(temperatureElement);
      forecastElement.appendChild(humidityElement);
      forecastElement.appendChild(windSpeedElement);
      forecastElement.appendChild(weatherIconElement);

      forecastContainer.appendChild(forecastElement);
    }
  }
}

// Helper function to group forecasts by day
function groupForecastsByDay(forecasts) {
  const forecastByDay = {};
  forecasts.forEach((forecast) => {
    const forecastDate = new Date(forecast.dt * 1000);
    const day = forecastDate.toDateString();
    if (!forecastByDay[day]) {
      forecastByDay[day] = [];
    }
    forecastByDay[day].push(forecast);
  });
  return forecastByDay;
}

const searchForm = document.getElementById('searchForm');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission from refreshing the page

  const cityInput = document.getElementById('cityInput');
  const city = cityInput.value;

  // Call the fetchWeatherData function with the entered city
  fetchWeatherData(city);
});
