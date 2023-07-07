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

const searchForm = document.getElementById('searchForm');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission from refreshing the page

  const cityInput = document.getElementById('cityInput');
  const city = cityInput.value;

  // Call the fetchWeatherData function with the entered city
  fetchWeatherData(city);
});
