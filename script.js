/*
 *  Weather Report
 *
 *  This program uses the OpenWeatherMap API to retrieve
 *  and display current weather information for a city/state
 *  or a ZIP code.
 * 
 *  Author: Robert Walsh
 *  Date:   October 7, 2024
 * 
 */

const API_KEY = "a0f9f64f8436aa3d33e94c2cdeacf157";
const GEOCODING_ZIP_CODE_URL = "https://api.openweathermap.org/geo/1.0/zip?zip={zip_code},{country_code}&appid={API_key}";
const GEOCODING_CITY_STATE_URL = "https://api.openweathermap.org/geo/1.0/direct?q={city_name},{state_code},{country_code}&appid={API_key}";
const CURRENT_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=imperial&appid={API_key}";

function setSubmitButtonState() {
    let button = document.getElementById("submit_button");
    let field = document.getElementById("location_field");
    if (field.value !== "") {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}

function submitForm(event) {
    event.preventDefault();

    let locationField = document.getElementById("location_field");
    console.log("The user entered: " + locationField.value);

    doGeoCodeRequest(locationField.value);
}

function doGeoCodeRequest(location) {
    let url = createGeocodeUrlForZipCode(location);
    url = url.replace("{country_code}", "US");
    url = url.replace("{API_key}", API_KEY);
    console.log("URL: " + url);

    let geocodeRequest = new XMLHttpRequest();
        geocodeRequest.open("GET", url);
        geocodeRequest.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            console.log(this.responseText);
            
            let data = JSON.parse(this.responseText);
            console.log(data);
            data = data.length ? data[0] : data;
            let locationName = data.name + " (" + data.country + ")";
            console.log("Location: " + locationName);
            doCurrentWeatherRequest(locationName, data.lat, data.lon);
        } else {
            console.warn("Received an error response: status=" + this.status);
        }
    };
    geocodeRequest.send();
}

function createGeocodeUrlForZipCode(zipCode) {
    return GEOCODING_ZIP_CODE_URL.replace("{zip_code}", zipCode);
}

function doCurrentWeatherRequest(locationName, lat, lon) {
    let url = CURRENT_WEATHER_URL;

    url = url.replace("{lat}", lat);
    url = url.replace("{lon}", lon);
    url = url.replace("{API_key}", API_KEY);
    console.log("URL: " + url);

    let currentWeatherRequest = new XMLHttpRequest();
    currentWeatherRequest.open("GET", url);
    currentWeatherRequest.onload = function() {
        if (this.status >= 200 && this.status <= 400) {
            console.log(this.responseText);
            let data = JSON.parse(this.responseText);
            console.log(data);
            displayCurrentWeather(locationName, data);
        } else {
            console.warn("Received an error response: " + this.status);
        }
    }
    currentWeatherRequest.send();
}

function displayCurrentWeather(locationName, data) {
    document.getElementById("weather_location").textContent = locationName;
    document.getElementById("weather_description").textContent = data.weather[0].description;
    document.getElementById("weather_temperature").textContent = data.main.temp;
    document.getElementById("weather_feels_like").textContent = data.main.feels_like;
    document.getElementById("weather_barometric_pressure").textContent = data.main.pressure;
    document.getElementById("weather_humidity").textContent = data.main.humidity;
    document.getElementById("weather_clouds").textContent = data.clouds.all;
    document.getElementById("weather_wind_speed").textContent = data.wind.speed;
    document.getElementById("weather_wind_direction").textContent = data.wind.deg;
    document.getElementById("weather_wind_gusts").textContent = data.wind.gust;

    if (data.rain) {
        document.getElementById("weather_rain_last_hour").textContent = data.rain["1h"];
        document.getElementById("weather_rain_last_three_hours").textContent = data.rain["3h"] || 0;
    } else {
        document.getElementById("weather_rain_last_hour").textContent = "None";
        document.getElementById("weather_rain_last_three_hours").textContent = "None";
    }      

    if (data.snow) {
        document.getElementById("weather_snow_last_hour").textContent = data.snow["1h"];
        document.getElementById("weather_snow_last_three_hours").textContent = data.snow["3h"] || 0;
    } else {
        document.getElementById("weather_snow_last_hour").textContent = "None";
        document.getElementById("weather_snow_last_three_hours").textContent = "None";
    }   
    document.getElementById("results").style.display = "";   
}
