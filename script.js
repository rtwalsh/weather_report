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

function submitForm(event) {
    event.preventDefault();

    let locationField = document.getElementById("location_field");
    console.log("The user entered: " + locationField.value);
}

function setSubmitButtonState() {
    let button = document.getElementById("submit_button");
    let field = document.getElementById("location_field");
    if (field.value !== "") {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  }