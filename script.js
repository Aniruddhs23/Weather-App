document.addEventListener('DOMContentLoaded', () => {
    const inputBox = document.querySelector('.input-box');
    const searchBtn = document.getElementById('searchBtn');
    const weather_img = document.querySelector('.weather-img');
    const temperature = document.querySelector('.temperature');
    const description = document.querySelector('.description');
    const humidity = document.getElementById('humidity');
    const wind_speed = document.getElementById('wind-speed');

    const location_not_found = document.querySelector('.location-not-found');
    const weather_body = document.querySelector('.weather-body');

    async function checkWeather(city) {
        const api_key = "ac3f1dc7174c3a9a1187636fc8ba273b";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
        
        try {
            const response = await fetch(url);
            const weather_data = await response.json();
            console.log(weather_data);

            if (weather_data.cod === '404') {
                location_not_found.style.display = 'flex';
                weather_body.style.display = 'none';
                console.log("Location not found");
                return;
            }

            location_not_found.style.display = 'none';
            weather_body.style.display = 'flex';
            temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}<sup>°C</sup>`;
            description.innerHTML = weather_data.weather[0].description;
            humidity.innerHTML = `${weather_data.main.humidity}%`;
            wind_speed.innerHTML = `${weather_data.wind.speed} km/hr`;

            let imagePath;
            switch (weather_data.weather[0].main) {
                case 'Clouds':
                    imagePath = 'images/cloud.png';
                    break;
                case 'Clear':
                    imagePath = 'images/clear.png';
                    break;
                case 'Rain':
                    imagePath = 'images/rain.png';
                    break;
                case 'Mist':
                    imagePath = 'images/mist.png';
                    break;
                case 'Snow':
                    imagePath = 'images/snow.png';
                    break;
                default:
                    imagePath = 'images/clear.png';
            }

            // Set image source and handle errors
            weather_img.src = imagePath;
            weather_img.onerror = () => {
                console.log(`Error loading image: ${imagePath}`);
                weather_img.src = 'images/default.png'; // Fallback image
            };

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    searchBtn.addEventListener('click', () => {
        checkWeather(inputBox.value);
    });
});

