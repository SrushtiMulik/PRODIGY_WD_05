const apiKey = 'd0f0766efa4142ef238f2a14d3a99200'


function getWeatherByLocation() {
    const location = document.getElementById('locationInput').value;
    if (location === '') {
        alert('Please enter a location');
        return;
    }
    fetchWeatherData(location);
}


function getWeatherByGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherDataByCoords(lat, lon);
        });
    } else {
        alert('Geolocation is not supported by your browser');
    }
}


function fetchWeatherDataByCoords(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));
}


function fetchWeatherData(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));
}


function displayWeatherData(data) {
    const weatherDataDiv = document.getElementById('weatherData');
    if (data.cod === '404') {
        weatherDataDiv.innerHTML = '<p>Location not found. Please try again.</p>';
        return;
    }

    const { name, main, weather } = data;
    weatherDataDiv.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp} °C</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}
