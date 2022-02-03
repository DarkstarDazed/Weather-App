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

// function to input value into form
const formSumbitHandler = function(event) {
    event.preventDefault();
    let city = cityInputEl.value.trim();
    if (city) {
        getWeatherForecast(city);
        get5DayForecast(city);
        cities.unshift({ city });
        cityInputEl.value = "";
    } else {
        alert("Please enter a City!");
    }
saveCity();

}

// save city to local storage 
const saveCity = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
};


// function to fetch city weather 
const getWeatherForecast = function(city) { //
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(api)
        .then(function(response) {
            response.json()
                .then(function(data) {
                    showWeather(data, city);
                });
        });
};

// function that shows city's current weather
const showWeather = function(weather, searchCity) { //
    //clear old content
    weatherContainerEl.textContent = ""; //
    citySearchInputEl.textContent = searchCity; //

    //Date with moment
    let currentDate = document.createElement("span") //
    currentDate.textContent = " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") "; //
    citySearchInputEl.appendChild(currentDate); //

    //Icon images
    let weatherIcon = document.createElement("img") //
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`); //
    citySearchInputEl.appendChild(weatherIcon); //

    //Temperature data
    let temperatureEl = document.createElement("span");
    temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
    temperatureEl.classList = "list-group-item"

    //Humidity data
    let humidityEl = document.createElement("span");
    humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
    humidityEl.classList = "list-group-item"

    //Wind data
    let windEl = document.createElement("span");
    windEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
    windEl.classList = "list-group-item"

    //Appending all to the containers
    weatherContainerEl.appendChild(temperatureEl);
    weatherContainerEl.appendChild(humidityEl);
    weatherContainerEl.appendChild(windEl);

    let lat = weather.coord.lat;
    let lon = weather.coord.lon;
    getUvIndex(lat, lon)
}

//function to fetch the UV index
const getUvIndex = function(lat, lon) {
    let apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`

    fetch(apiURL)
        .then(function(response) {
            response.json()
                .then(function(data) {
                    showUvIndex(data)
                });
        });
}

//function that shows the UV index
const showUvIndex = function(index) {
    let uvIndexEl = document.createElement("div");
    uvIndexEl.textContent = "UV Index: "
    uvIndexEl.classList = "list-group-item"

    uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value

    if (index.value <= 2) {
        uvIndexValue.classList = "favorable"
    } else if (index.value > 2 && index.value <= 8) {
        uvIndexValue.classList = "moderate "
    } else if (index.value > 8) {
        uvIndexValue.classList = "severe"
    };

    uvIndexEl.appendChild(uvIndexValue);
    weatherContainerEl.appendChild(uvIndexEl);
}






citySubmitEl.addEventListener("submit", formSumbitHandler);
pastSearchButtonEl.addEventListener("click", searchedCityHandler);