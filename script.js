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
let otherDayForcast = '';
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            document.getElementsByClassName("weather")[0].innerHTML = `
            <h2 class="city">Weather in ${city}</h2>
        <h1 class="temp">${day.temp.day}°C</h1>
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