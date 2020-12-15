var citySearch;
var APIkey = '4d2382c0b1c2cee7fb864ef665df929';
var weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}';
var forecastAPI = 'https://api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}';
var uviAPI = 'http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}';


var now = DateTime.local().c.hour;

$(document).ready(function() {
     

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + cityID + APIkey;

   $.ajax ({ 
     url: queryURL,
     method: "GET"

   })

  .then(function (response) {
      console.log(queryURL)

      // log the result object 
      console.log(response);
      $("#forecast").empty();

      console.log(renponse.name)
      console.log(response.weather[0].icon)


      ///Tranfer content to HTML
      $("#city").html("<h1>" + response.name + "weather Details</h1>");
      $("#wind").text("wind speed: " + response.wind.speed);
      $("#huminity").text("huminity:" + response.main.huminity);



      //convert the temp to fahrenheit
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;


      //add temp content to html

















    
   
 })
    
























































































































});
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
























