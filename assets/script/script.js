$(document).ready(function() {  


  var APIkey = '14d2382c0b1c2cee7fb864ef665df929';
  var weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?';
  var forecastAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=';
  var citySearch;
  var CurrentForecast;
  var searchHistory;
  


  $("#searchButton").on("click", function () {
    $("#currentcity").empty();
    $("#forecastH3").addClass('show');

    //value of the input of user
    city = $("#searchTerm").val();
    // getCurrentForecast(city);
    getFiveDayForecast(city);
    //to clear input 
    $("searchTerm").val("");


  $(document).on("click" , "historyEntry", function(){   
       console.log("clicked histoty item")
       let thisElement = $(this);
       getWeather(thisElement.text());
  })

  function SearchHistory(city) {
    console.log(searchHistory)
      searchHistoryEl.empty();
      let searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory"));
      for (let i = 0; i < searchHistoryArr.length; i++) {
         //loop new ListItem 
        let newListItem = $("<li>").attr("class" , "historyEntry");
        newListItem.text(searchHistoryArr[i]);
        searchHistoryEl.prepend(newListItem);


      }
  }

  

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

        let tempF = (response.main.temp - 273.15) * 1.80 + 32;
        console.log(Math.floor(tempF))

        console.log(response.main.huminity)

        console.log(response.wind.speed)

        getCurrentConditions(response);
        getUv(response.coord.lat , response.coord.lon)
        
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
    var card = $("<div>").addClass("card");
    var cardBody = $("<div>").addClass("card-body");
    var city = $("<h4>").addClass("card-title").text(response.name);
    // var date = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
    var temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
    var huminity = $("<p>").addClass("card-text current-huminity").text("humidity: " + response.main.humidity + "%");
    var wind = $("<p>").addClass("card-text current-wind").text("wind speed: " + response.wind.speed + "MPH");
    var currentPic = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

    // insert to page 
    city.append(currentPic)
    cardBody.append(city, temperature, huminity, wind);
    card.append(cardBody);
    $("#currentcity").append(card);

  }

  function getCurrentForecast(city) {
  
    var forecastAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIkey;
    $.ajax({
      url: forecastAPI,
      method: "GET"
    })

      .then(function (response) {
        console.log(response);
      });
  }

    
  
     function getUv(lat , lon) {
      var uviAPI = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon +'&appid=' + APIkey;
      $.ajax({ 
      url: uviAPI,
       method: "GET"
      }).then(function (uvresponse) { 
        console.log(uvresponse)
        var uvindex = uvresponse.value;
         var bgcolor;
        if (uvindex <= 3) {
            bgcolor = "green";
        }
        else if (uvindex >= 3 || uvindex <= 6) {
             bgcolor = "yellow";
        }
        else if (uvindex >= 6 || uvindex <= 8) {
            bgcolor = "orange";
        }
        else {
            bgcolor = "red";
        }
          var uvdisp = $("<p>").attr("class", "card-text").text("UV Index:");
          uvdisp.append($("<span>").attr("class" , "uvindex").attr("style" , ("background-color:" + bgcolor)).text(uvindex));
          $(".card-body").append(uvdisp);
          $("#uv-index").text("uvindex" + uvindex)
       });
     }

     
      function getFiveDayForecast(city) {
        $(".card-row").empty();
        var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIkey;
        $.ajax({  
        url: queryURL,  
        method: "GET"
         
        })
          .then(function(fiveDayResponse) {  
            console.log(fiveDayResponse)
             for (let i = 0; i < fiveDayResponse.list.length; i+=8 ) {
                let city = {
                date: fiveDayResponse.list[i].dt_txt,
                icon: fiveDayResponse.list[i].weather[0].icon,
                temp: fiveDayResponse.list[i].main.temp,
              }
                let dateStr = city.date;
                let trimmedDate = dateStr.substring(0, 10);
                let weatherIco = 'https://openweathermap.org/img/w/+ city.icon + png'
                createForecastCard(trimmedDate, weatherIco , city)
          }
    
          })

      }
     
    
function createForecastCard(trimmedDate, weatherIco , city,  dateStr) {
  console.log(trimmedDate, weatherIco , city,  dateStr)

 
  var card = $("<div>");
  var temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + city.temp + " °F");
  var date = $("<p>").addClass("card-text current-temp").text(trimmedDate);
  var currentPic = $("<img>").attr("src", "https://openweathermap.org/img/w/" + city.icon + ".png")

  card.append(date ,currentPic , temperature)
  $(".card-row").append(card)

}

















});
