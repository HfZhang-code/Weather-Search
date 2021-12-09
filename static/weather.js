const testUrl = "http://api.openweathermap.org/data/2.5/weather?q=Boston&appid=5fc3c02339d5c6799f67a62e8c412b51&units=metric&lang=zh_cn;"
const baseURL = "http://api.openweathermap.org/data/2.5/weather?appid=5fc3c02339d5c6799f67a62e8c412b51&units=metric"

$(function () {
    initPage();
})

var initPage = () => {
    let city = "Boston";
    let url = baseURL + "&q=" + city;
    $.ajax({
        url: url,
        method: "get",
        dataType: 'jsonp',
        contentType: 'application/json',
        timeout: 2000,
        success: function (res) {
            initWeather(res);
        },
        // jsonpCallback: "initWeather",
        error: (jqXHR, textStatus) => {
            // console.log(textStatus)
        }
    })

}

function doSearch() {
    console.log("do search weather...");
    // validate the input is valid
    var city = document.getElementById("searchCity").value;
    if (city === undefined || city === '') {
        alert("city can not be null or empty!");
        return;
    }

    let url = baseURL + "&q=" + city;
    $.ajax({
        url: url,
        method: "get",
        dataType: 'jsonp',
        contentType: 'application/json',
        jsonpCallback: "initWeather"
    })

}

var initWeather = (res) => {
    // console.log(res);

    // document.getElementById("showCity").innerText = res.name;
    // document.getElementById("desc").innerText = res.weather[0].description;
    // document.getElementById("wDate").innerText = now;
    // document.getElementById("temp").innerText = res.main.temp + "°";
    // document.getElementById("desc1").innerText = res.weather[0].main;
    // document.getElementById("wind").innerText = " | Wind Speed " + res.wind.speed

    $("#showCity").text(res.name);
    $("#desc").text(res.weather[0].description);
    $('#lon').text("longitude: " + res.coord.lon);
    $("#lat").text("latitude: " + res.coord.lat);


    let now = new Date();
    $("#wDate").text(now);
    $("#temp").text(res.main.temp + "°");
    $("#desc1").text(res.weather[0].main);
    $("#wind").text(" | Wind Speed " + res.wind.speed);

    $(".feels_like").text("Feels Like: " + res.main.feels_like);
    $(".temp_min").text(" | Temp Min: " + res.main.temp_min);
    $(".temp_max").text(" | Temp Max: " + res.main.temp_max);
    $(".pressure").text(" | Pressure: " + res.main.pressure);
    $(".humidity").text(" | Humidity: " + res.main.humidity);

}