/* global axios */
// eslint-disable-next-line import/extensions
import config from './config.js';

const input = document.querySelector('input');
const button = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const humidityDisplay = document.querySelector('.humidity');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const { API_KEY } = config;
const API_UNITS = '&units=metric';

const getWeather = () => {
    const city = input.value || 'Poznań';
    const URL = API_LINK + city + API_KEY + API_UNITS;

    axios
        .get(URL)
        .then((res) => {
            const { temp } = res.data.main;
            const { humidity } = res.data.main;
            const status = Object.assign({}, ...res.data.weather);

            cityName.textContent = res.data.name;
            temperature.textContent = `${Math.round(temp)}°C`;
            humidityDisplay.textContent = `${humidity}%`;
            weather.textContent = status.description;

            warning.textContent = '';
            input.value = '';

            if (status.id >= 200 && status.id <= 232) {
                photo.setAttribute('src', './img/thunderstorm.png');
            } else if (status.id >= 300 && status.id <= 321) {
                photo.setAttribute('src', './img/drizzle.png');
            } else if (status.id >= 500 && status.id <= 531) {
                photo.setAttribute('src', './img/rain.png');
            } else if (status.id >= 600 && status.id <= 622) {
                photo.setAttribute('src', './img/ice.png');
            } else if (status.id >= 701 && status.id <= 781) {
                photo.setAttribute('src', './img/fog.png');
            } else if (status.id === 800) {
                photo.setAttribute('src', './img/sun.png');
            } else if (status.id >= 801 && status.id <= 804) {
                photo.setAttribute('src', './img/cloud.png');
            } else {
                photo.setAttribute('src', './img/unknown.png');
            }
        })
        .catch(() => {
            warning.textContent = 'Wpisz poprawną nazwę miasta';
            input.value = '';
        });
};

getWeather();
button.addEventListener('click', getWeather);
input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') getWeather();
});
