// DEPENDENCIES
var submitBTN = document.querySelector("#submitBTN");
const formData = document.querySelector('#city')
const searchResultsEl = document.querySelector('#search-results')
const previousCitiesEl = document.querySelector('#previous-cities')
// DATA

let cities = []

// FUNCTIONS
function searchCity(event) {
    event.preventDefault();
    const requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${formData.value}&limit=1&appid=e8a2ccd88f0098a03af0cb2cd2922118`
    const newCity = formData.value.trim()
    cities.push(newCity)
    localStorage.setItem('cities', JSON.stringify(cities))

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            const lat = data[0].lat
            const lon = data[0].lon
            console.log(lat)
            console.log(lon)
            getweatherAPI(lat, lon)
        })
console.log(formData.value)
}

function renderPreviousCities() {
    previousCitiesEl.innerHTML = ""
    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];
        var button = document.createElement("button");
        button.textContent = city;
        previousCitiesEl.appendChild(button)
    }

}

function init() {
    const previousCities = JSON.parse(localStorage.getItem('cities'))

    if (previousCities !== null) {
        cities = previousCities
    }
    renderPreviousCities()
}

function renderSearchResults(data) {
    var html = `
    <div class="card">
        <div class="card-body">
          <h5 class="card-title">${data.city.name} ${data.list[0].dt_txt}</h5>
          <p class="card-text">
            Temp: ${data.list[0].main.temp}<br>
            Humidity: ${data.list[0].main.humidity}<br>
            Wind: ${data.list[0].wind.speed}<br>
          </p>
        </div>
    </div>
    <div class="row">
        <p>5 Day Forcast</p>
    <div class="card col-2">
        <div class="card-body">
          <h5 class="card-title">${data.list[8].dt_txt}</h5>
          <p class="card-text">
            Temp: ${data.list[8].main.temp}<br>
            Humidity: ${data.list[8].main.humidity}<br>
            Wind: ${data.list[8].wind.speed}<br>
          </p>
        </div>
    </div>
    <div class="card col-2">
        <!-- <img class="card-img-top" src="..." alt="Card image cap"> -->
        <div class="card-body">
          <h5 class="card-title">${data.list[16].dt_txt}</h5>
          <p class="card-text">
            Temp: ${data.list[16].main.temp}<br>
            Humidity: ${data.list[16].main.humidity}<br>
            Wind: ${data.list[16].wind.speed}<br>
          </p>
        </div>
    </div>
    <div class="card col-2">
        <!-- <img class="card-img-top" src="..." alt="Card image cap"> -->
        <div class="card-body">
          <h5 class="card-title">${data.list[24].dt_txt}</h5>
          <p class="card-text">
            Temp: ${data.list[24].main.temp}<br>
            Humidity: ${data.list[24].main.humidity}<br>
            Wind: ${data.list[24].wind.speed}<br>
          </p>
        </div>
    </div>
    <div class="card col-2">
        <!-- <img class="card-img-top" src="..." alt="Card image cap"> -->
        <div class="card-body">
          <h5 class="card-title">${data.list[32].dt_txt}</h5>
          <p class="card-text">
            Temp: ${data.list[32].main.temp}<br>
            Humidity: ${data.list[32].main.humidity}<br>
            Wind: ${data.list[32].wind.speed}<br>
          </p>
        </div>
    </div>
    <div class="card col-2">
        <!-- <img class="card-img-top" src="..." alt="Card image cap"> -->
        <div class="card-body">
          <h5 class="card-title">${data.list[39].dt_txt}</h5>
          <p class="card-text">
            Temp: ${data.list[39].main.temp}<br>
            Humidity: ${data.list[39].main.humidity}<br>
            Wind: ${data.list[39].wind.speed}<br>
          </p>
        </div>
    </div>
    </div>

  `;

  var searchResults = document.createElement("div");
  searchResults.innerHTML = html;
  searchResultsEl.appendChild(searchResults);

}

function getweatherAPI(lat, lon) {
    const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e8a2ccd88f0098a03af0cb2cd2922118&units=imperial`


    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            renderSearchResults(data)
        })
}
// USER iNTERACTIONS
submitBTN.addEventListener("click", searchCity);

previousCitiesEl.addEventListener("click", function(event) {
    var element = event.target;
    if (element.matches("button") === true) {
      // Get its data-index value and remove the todo element from the list
      const city = element.textContent
      const requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=e8a2ccd88f0098a03af0cb2cd2922118`
      fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            const lat = data[0].lat
            const lon = data[0].lon
            console.log(lat)
            console.log(lon)
            getweatherAPI(lat, lon)
        })
  

    }
  });
// INITIALIZATION
init();
// getweatherAPI();