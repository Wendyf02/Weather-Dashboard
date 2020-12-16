var citySearch;
var APIkey = '4d2382c0b1c2cee7fb864ef665df929';
var weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}';
var forecastAPI = 'https://api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}';
var uviAPI = 'http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}';


var now = DateTime.local().c.hour;

function search() {

   $("#searchBtn").on("click" , function() {

      citySearch = $("#")





   });



}





// $("seachTerm").keypress(functional() {
  

// });

$("#searchBtn").on("click", function() { 
 $("#forecastH3").addClass('show');   

   //value of the input of user
   city = $("#searchTerm").val();

    //to clear input 
   $("$searchTerm").val("");

         // $(document).ready(function() {
          
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + city + APIkey;

   $.ajax ({ 
     url: queryURL,
     method: "GET"

   })

    .then(function (response) {
      
      console.log(response);
      $("#forecast").empty();

      console.log(renponse.name)
      console.log(response.weather[0].icon)

      let tempF=(response.main.temp = 273.15) * 1.80 + 32;
      console.log(Math.floor(tempF))

      console.log(response.main.huminity)

      conseloe.log(response.wind.speed)

      getCurrentConditions(response);
      getCurrentForecast(response);
      Makelist();

    })
});

    function makelist() { 
     let listItem = $("<li>").addClass(list-group-item).text(city);
     $("#list").append(listItem);
    }
   
     function getCurrentCondictions (response) { 


         // get temperature   
        let tempF = (response.main.temp - 273.15) * 1.80 + 32;
        tempF = Math.floor(tempF);

          $("#city-name").empty();

        //get and set content 
           card = $("<div>").addClas("card");
           cardBody = $("<div>").addClass("card-body");
           city = $("<h4>").addClass("card-title").text(response.name);
           cityDate = $("<h4>").addClass("card-title").text(date.tolocalDateString('en-us'));
           tempurature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
           huminity = $("<p>").addClass("card-text current-huminity").text("huminity: " + response.main.huminity + "%");
           wind = $("<p>").addClass("card-text current-wind").text("wind speed: " + response.wind.speed +  "MPH");
           current-pic = $("<img>").attr("src" , "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")



           // insert to page 
           city.append(cityDate, image)
           cardBody.append(city, temperature, huminity, wind);
           card.append(cardBody);
           $("#currentcity").append(card);

          }
   

      ///Tranfer content to HTML
      $("#city").html("<h1>" + response.name + "weather Details</h1>");
      $("#wind").text("wind speed: " + response.wind.speed);
      $("#huminity").text("huminity:" + response.main.huminity);



      //convert the temp to fahrenheit
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;


      //add temp content to html
 
   
 
    

























































































































    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
























