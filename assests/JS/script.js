// variables
const apiKey = '44dc8a0e81bdaed2225d3b963b07a67b';
const cities = [];
const cityInputEl = document.querySelector("#city")
const citySubmitEl = document.querySelector("#city-submit");
const weatherContainerEl = document.querySelector("#current-weather-container");
const forecastContainerEl = document.querySelector("#fiveday-container");
const pastSearchButtonEl = document.querySelector("#past-search-buttons");
const citySearchInputEl = document.querySelector("#searched-city");
const forecastTitle = document.querySelector("#forecast");


const formSumbitHandler = function(event) {
    event.preventDefault();



}





citySubmitEl.addEventListener("submit", formSumbitHandler);
pastSearchButtonEl.addEventListener("click", pastSearchHandler);