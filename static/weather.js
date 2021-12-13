const testUrl = "http://api.openweathermap.org/data/2.5/weather?q=Boston&appid=5fc3c02339d5c6799f67a62e8c412b51&units=metric&lang=zh_cn;"
const baseURL = "http://api.openweathermap.org/data/2.5/weather?appid=5fc3c02339d5c6799f67a62e8c412b51&units=metric"
var fah
$(function () {
    initPage();
})


class APIURL{
    constructor(city){
        this.city = city;
    }
    getURL(){
        return baseURL + "&q=" + this.city;
    }
}

var initPage = () => {
    let city = "Boston";
    var geturl = new APIURL(city)
    let url =geturl.getURL();

    fetch(url)
    .then(response => response.json())
    .then(data => initWeather(data))
    .catch(err => {
        console.error(err);
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
    fetch(url)
    .then(response => response.json())
    .then(data => initWeather(data))
    .catch(err => {
        console.error(err);

    });


}
// when user type something in the input,location will also change
function changeLoc(){
    var location = document.getElementById("searchCity").value;
    document.getElementById("showCity").innerHTML=location;
}
//when user focus on the input element, the background of the input will change
function changeBack(a){
    a.style.background="cyan";
}

//if page can't load the data, it will gey alert message
function errAlert(){
    alert("Some errors happened. Please reload the page.")
}

//when user click on the Date element, the color of content will change
function turnYellow(a){
    a.style.color="yellow"
}
function turnWhite(a){
    a.style.color="white"
}

//when the value of select element change,the color will change.
function changeColor(){
    var x = document.getElementById("backcolor").value;
    document.getElementById("showCity").style.color=x;
    document.getElementById("temp").style.color=x;

}

var initWeather = (res) => {


    $("#showCity").text(res.name);
    $("#desc").text(res.weather[0].description);
    $('#lon').text("longitude: " + res.coord.lon);
    $("#lat").text("latitude: " + res.coord.lat);


    let now = new Date();
    let nowStr = "";
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var h = now.getHours();
    var mm = now.getMinutes();
    var ss = now.getSeconds();
    nowStr = y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + ss;
    $("#wDate").text(nowStr);
    $("#temp").text(res.main.temp + "℃");
    fah=(res.main.temp * 1.8) + 32
    $("#desc1").text(res.weather[0].main);
    $("#wind").text("Wind Speed " + res.wind.speed);

    $(".feels_like").text("Feels Like: " + res.main.feels_like);
    $(".temp_min").text("Temp Min: " + res.main.temp_min);
    $(".temp_max").text("Temp Max: " + res.main.temp_max);
    $(".pressure").text("Pressure: " + res.main.pressure);
    $(".humidity").text("Humidity: " + res.main.humidity);

}
//change Celsius degree to Hahrenheit drgree
function toFahren(){
    $('#temp').text(fah + "℉")
}