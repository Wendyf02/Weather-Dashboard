$(document).ready(function() {  


  var APIkey = '14d2382c0b1c2cee7fb864ef665df929';
  var weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?';
  var forecastAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=';
 
  var citySearch;
  var CurrentForecast;
  var currentLoc;
  


  $("#searchButton").on("click", function () {
    $("#currentcity").empty();
    $("#forecastH3").addClass('show');

    //value of the input of user
    city = $("#searchTerm").val();
    // getCurrentForecast(city);
    getFiveDayForecast(city);
    //to clear input 
    $("searchTerm").val("");


  //  function citySearch() {
  //      localStorage.setItem("inputcontent" + searchInput.value, searchInput.value);
  //      localStorage.setItem("lastresult" , searchInput.value);
  //  }
    
  //  for (var i = 0; i < localStorage.length; i++){
  //       $(".output").append("<p class='cityresult'>"  + localStorage.key(i)  + "</p>")
  //  }

   
  //  //get Month/day/year
  //   let currentDay = document.getElementById('currentDay');
  //   let DateTime = luxon.DateTime;
  //   let today = DateTime.local()
  //   let f = { month: 'long' , day :'2-digit'};
  //   let m = today.get('month');
  //   let tz = today.zoneName;
  //   currentDay.textContent = tz;
  //   let newDt = today.set({month: 12});
  //   currentDay.textContent = today.toLocaleString(DateTime.DATETIME_FULL);
  //   console.log(today.toISO());

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
          var uvdisp = $("<p>").attr("class", "card-text").text("V Index:");
          uvdisp.append($("<span>").attr("class" , "uvindex").attr("style" , ("background-color:" + bgcolor)).text(uvindex));
          $(".card-body").append(uvdisp);
          $("#uv-index").text("uvindex" + uvindex)
       });
     }
  //   function getCurrentLocation(position) {  
  //   var lon = position.coords.longitude;
  //   var lat = position.coords.latitude;
  //   var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=14d2382c0b1c2cee7fb864ef665df929"; 
  //   $.ajax({ 
  //        url: queryURL, 
  //        method: "GET"
  //   }).then(function (response) {
  //     currentLoc = response.name;
  //     saveLoc(esponse.name);
  //     getCurrent(currentLoc);
  //   });

  //  } 











     
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

 
  card = $("<div>");
  temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + city.temp + " °F");
  date = $("<p>").addClass("card-text current-temp").text(trimmedDate);
  currentPic = $("<img>").attr("src", "https://openweathermap.org/img/w/" + city.icon + ".png")
  // huminity = $("<p>").addClass("card-text current-huminity").text("huminity: " + response.main.humidity + "%");
  // wind = $("<p>").addClass("card-text current-wind").text("wind speed: " + response.wind.speed + "MPH");
  // currentPic = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

  card.append(date ,currentPic , temperature)
  $(".card-row").append(card)

}






});
