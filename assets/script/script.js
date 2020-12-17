$(document).ready(function () {

  var citySearch;
  var APIkey = '14d2382c0b1c2cee7fb864ef665df929';
  var weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}';
  var forecastAPI = 'https://api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}';
  var uviAPI = 'http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}';



  $("#searchButton").on("click", function () {
    $("#forecastH3").addClass('show');

    //value of the input of user
    city = $("#searchTerm").val();
    getCurrentForecast(city);

    //to clear input 
    $("searchTerm").val("");



    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;

    $.ajax({
      url: queryURL,
      method: "GET"

    })

      .then(function (response) {

        console.log(response);
        $("#forecast").empty();

        console.log(response.name)
        console.log(response.weather[0].icon)

        let tempF = (response.main.temp = 273.15) * 1.80 + 32;
        console.log(Math.floor(tempF))

        console.log(response.main.huminity)

        console.log(response.wind.speed)

        getCurrentConditions(response);

        Makelist();

      })
  });

  function Makelist() {
    let listItem = $("<li>").addClass("list-group-item").text(city);
    $("#list").append(listItem);
  }

  function getCurrentConditions(response) {


    // get temperature   
    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    $("#city-name").empty();

    //get and set content 
    card = $("<div>").addClass("card");
    cardBody = $("<div>").addClass("card-body");
    city = $("<h4>").addClass("card-title").text(response.name);
    temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
    huminity = $("<p>").addClass("card-text current-huminity").text("huminity: " + response.main.humidity + "%");
    wind = $("<p>").addClass("card-text current-wind").text("wind speed: " + response.wind.speed + "MPH");
    currentPic = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")



    // insert to page 
    city.append(currentPic)
    cardBody.append(city, temperature, huminity, wind);
    card.append(cardBody);
    $("#currentcity").append(card);

  }



  function getCurrentForecast(city) {
    console.log("letter", city)
    var forecastAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIkey;
    $.ajax({
      url: forecastAPI,
      method: "GET"

    })

      .then(function (response) {

        console.log(response);

      });
  }




















});
