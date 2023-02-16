// Day, date and time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let today = document.querySelector(".today");
today.innerHTML = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];
let year = now.getFullYear();
let date = now.getDate();

let currentDate = document.querySelector(".what");
currentDate.innerHTML = `${date} ${month} ${year}`;

let currentTime = document.querySelector(".time");
currentTime.innerHTML = now.toLocaleTimeString();

//Code for city and temp calls

let form = document.querySelector(".d-flex");
form.addEventListener("submit", handleSearch);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  console.log(response);
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".todayTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
}
function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

//Search Engine

function handleSearch(event) {
  event.preventDefault();
  let searchResult = document.querySelector("#search-input");
  searchCity(searchResult.value);
}

function search(event) {
  event.preventDefault();
  let currentCity = document.querySelector(".city");
  let searchResult = document.querySelector("#search-input");

  currentCity.innerHTML = searchResult.value;
}
//Location button
function retrievePosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function locationTemperature(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentlocation = document.querySelector(".currentLocation");
currentlocation.addEventListener("click", locationTemperature);

navigator.geolocation.getCurrentPosition(retrievePosition);
