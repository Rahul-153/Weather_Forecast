//   let weather = {
//     apiKey: "8b528b99273fc7895a938db1b8590125",
//     fetchWeather: function (city) {
//       fetch(
//         "https://api.openweathermap.org/data/2.5/weather?q=" +
//           city +
//           "&units=metric&appid=" +
//           this.apiKey
//       )
// .then((response) => {
//     if (!response.ok) {
//       alert("No weather found.");
//       throw new Error("No weather found.");
//     }
//     return response.json();
//   })
//   .then((data) => this.displayWeather(data),this.console.log(data));
// },
// displayWeather: function (data) {
// const { name } = data;
// const { icon, description } = data.weather[0];
// const { temp, humidity } = data.main;
// const { speed } = data.wind;
// document.querySelector(".city").innerText = "Weather in " + name;
// document.querySelector(".icon").src =
//   "https://openweathermap.org/img/wn/" + icon + ".png";
// document.querySelector(".description").innerText = description;
// document.querySelector(".temp").innerText = temp + "°C";
// document.querySelector(".humidity").innerText =
//   "Humidity: " + humidity + "%";
// document.querySelector(".wind").innerText =
// "Wind speed: " + speed + " km/h";
// document.querySelector(".weather").classList.remove("loading");
// document.body.style.backgroundImage =
//   "url('https://source.unsplash.com/1600x900/?" + name + "')";
// },
// search: function () {
// this.fetchWeather(document.querySelector(".search-bar").value);
// },
// cards:function(data){
//     const{lat,lon}=data.coord;   
// }
// };

// document.querySelector(".search button").addEventListener("click", function () {
// weather.search();
// });

// let weather2={
//     fetchWeather2:function (lan,lon) {
//         fetch(
//             "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude="+daily+"&appid="+
//             this.apiKey
//         )
//   .then((response) => {
//       if (!response.ok) {
//         alert("No weather found.");
//         throw new Error("No weather found.");
//       }
//       return response.json();
//     })
//     .then((data2) => this.console.log(data2));
//   }
// };
// weather2.fetchWeather2(data.lat,data.lon);
const API_key="8b528b99273fc7895a938db1b8590125";
let city=document.querySelector(".search-bar").value;
document.querySelector(".search button").addEventListener("click", function () {cityData(city);})
document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        cityData(city);
    }
    city=event.target.value
});
function cityData(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        getWeatherdata(data);
    })
};
function getWeatherdata(data){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly&units=metric&appid=${API_key}`)
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        showWeatherData(data);
        // dailyWeatherdata(data);
    })
};
showWeatherData=(data)=>{
// let { icon, description } = data.current.weather[0];
//  document.querySelector(".city").innerHTML = "Weather in ";
// document.querySelector(".icon").src =
//    "https://openweathermap.org/img/wn/" + icon+ ".png";
//  document.querySelector(".description").innerText = description;
//  document.querySelector(".temp").innerText = data.current.temp + "°C";
//  document.querySelector(".humidity").innerText =
//    "Humidity: " + data.current.humidity + "%";
//  document.querySelector(".wind").innerText =
//  "Wind speed: " + data.current.wind_speed + " km/h";
//  document.querySelector(".weather").classList.remove("loading");
//  document.body.style.backgroundImage =
// "url('https://source.unsplash.com/1600x900/?" + "denver" + "')";

let otherDayForcast = '';
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            document.getElementsByClassName("weather")[0].innerHTML = `
            <h2 class="city">Weather in ${city}</h2>
        <h1 class="temp">51°C</h1>
        <div class="flex">
          <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="" class="icon" />
          <div class="description">${day.weather[0].description}</div>
        </div>
        <div class="humidity">Humidity:${day.humidity}</div>
        <div class="wind">Wind speed: ${day.wind_speed} km/h</div>
            </div>
            `
        }else{
            otherDayForcast += `
            <div class="card">
        <div class="card-body">
            <div class="top">
            <div class="day">
                <div style="font-weight:bold; margin-bottom:.1em;">${window.moment(day.dt*1000).format('ddd').toUpperCase()}</div>
                <div class="wea-des">${day.weather[0].description.toUpperCase()}</div>
              </div>
            <div class="daily-icon"><img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon"></div>
        </div>
        <div class="reading"> 
            <div class="win-speed">${day.wind_speed} Km/h</div>
            <div class="daily-humid">Humidity: ${day.humidity}%</div>
        </div>
            <div class="daily-temp">${day.temp.day}°C</div>
        </div>
      </div>
            
            `}
        })
        document.querySelector(".col-main").innerHTML = otherDayForcast;
};
present=()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=denver&appid=${API_key}`)
    .then(res=>res.json())
    .then(data=>{
        city="Denver";
        console.log(data);
        getWeatherdata(data);
    })
};