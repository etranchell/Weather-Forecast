const apiKey = '7463aec950d8030240c60a772ae32e7f';

// Function to fetch weather data for a city
function fetchWeatherData(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

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
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

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
