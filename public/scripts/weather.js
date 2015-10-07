
// ***** FOR SURE
var weatherApiKey = '42dea182f5d54734a20210806150610';
var options = {};
var query;
var weather = {};
options = {
  host: 'api.apixu.com',
  port: 80,
  path: '/v1/current.json?key=' + weatherApiKey + '&q=',
  method: 'GET'
};





// -- start
//current time
Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes();
}
// -- end


// ***** end for sure



var conditions = [{"code":1000,"day":"Sunny","night":"Clear","icon":113},{"code":1003,"day":"Partly Cloudy","night":"Partly Cloudy","icon":116},{"code":1006,"day":"Cloudy","night":"Cloudy","icon":119},{"code":1009,"day":"Overcast","night":"Overcast","icon":122},{"code":1030,"day":"Mist","night":"Mist","icon":143},{"code":1063,"day":"Patchy rain nearby","night":"Patchy rain nearby","icon":176},{"code":1066,"day":"Patchy snow nearby","night":"Patchy snow nearby","icon":179},{"code":1069,"day":"Patchy sleet nearby","night":"Patchy sleet nearby","icon":182},{"code":1072,"day":"Patchy freezing drizzle nearby","night":"Patchy freezing drizzle nearby","icon":185},{"code":1087,"day":"Thundery outbreaks in nearby","night":"Thundery outbreaks in nearby","icon":200},{"code":1114,"day":"Blowing snow","night":"Blowing snow","icon":227},{"code":1117,"day":"Blizzard","night":"Blizzard","icon":230},{"code":1135,"day":"Fog","night":"Fog","icon":248},{"code":1147,"day":"Freezing fog","night":"Freezing fog","icon":260},{"code":1150,"day":"Patchy light drizzle","night":"Patchy light drizzle","icon":263},{"code":1153,"day":"Light drizzle","night":"Light drizzle","icon":266},{"code":1168,"day":"Freezing drizzle","night":"Freezing drizzle","icon":281},{"code":1171,"day":"Heavy freezing drizzle","night":"Heavy freezing drizzle","icon":284},{"code":1180,"day":"Patchy light rain","night":"Patchy light rain","icon":293},{"code":1183,"day":"Light rain","night":"Light rain","icon":296},{"code":1186,"day":"Moderate rain at times","night":"Moderate rain at times","icon":299},{"code":1189,"day":"Moderate rain","night":"Moderate rain","icon":302},{"code":1192,"day":"Heavy rain at times","night":"Heavy rain at times","icon":305},{"code":1195,"day":"Heavy rain","night":"Heavy rain","icon":308},{"code":1198,"day":"Light freezing rain","night":"Light freezing rain","icon":311},{"code":1201,"day":"Moderate or heavy freezing rain","night":"Moderate or heavy freezing rain","icon":314},{"code":1204,"day":"Light sleet","night":"Light sleet","icon":317},{"code":1207,"day":"Moderate or heavy sleet","night":"Moderate or heavy sleet","icon":320},{"code":1210,"day":"Patchy light snow","night":"Patchy light snow","icon":323},{"code":1213,"day":"Light snow","night":"Light snow","icon":326},{"code":1216,"day":"Patchy moderate snow","night":"Patchy moderate snow","icon":329},{"code":1219,"day":"Moderate snow","night":"Moderate snow","icon":332},{"code":1222,"day":"Patchy heavy snow","night":"Patchy heavy snow","icon":335},{"code":1225,"day":"Heavy snow","night":"Heavy snow","icon":338},{"code":1237,"day":"Ice pellets","night":"Ice pellets","icon":350},{"code":1240,"day":"Light rain shower","night":"Light rain shower","icon":353},{"code":1243,"day":"Moderate or heavy rain shower","night":"Moderate or heavy rain shower","icon":356},{"code":1246,"day":"Torrential rain shower","night":"Torrential rain shower","icon":359},{"code":1249,"day":"Light sleet showers","night":"Light sleet showers","icon":362},{"code":1252,"day":"Moderate or heavy sleet showers","night":"Moderate or heavy sleet showers","icon":365},{"code":1255,"day":"Light snow showers","night":"Light snow showers","icon":368},{"code":1258,"day":"Moderate or heavy snow showers","night":"Moderate or heavy snow showers","icon":371},{"code":1261,"day":"Light showers of ice pellets","night":"Light showers of ice pellets","icon":374},{"code":1264,"day":"Moderate or heavy showers of ice pellets","night":"Moderate or heavy showers of ice pellets","icon":377},{"code":1273,"day":"Patchy light rain in area with thunder","night":"Patchy light rain in area with thunder","icon":386},{"code":1276,"day":"Moderate or heavy rain in area with thunder","night":"Moderate or heavy rain in area with thunder","icon":389},{"code":1279,"day":"Patchy light snow in area with thunder","night":"Patchy light snow in area with thunder","icon":392},{"code":1282,"day":"Moderate or heavy snow in area with thunder","night":"Moderate or heavy snow in area with thunder","icon":395}];
var nightTime = "19:20";
var morningTime = "06:20";
var day = false;
var active = [];
var tod = "day";
var currentW;


function isDay() {
  var localTime = weather.location.localtime.split(' ')[1];

  if (localTime >= nightTime) {
    $('.light').addClass('moon');
    $('.sky').addClass('night');
    return false;
  } else if (localTime <= morningTime) {
    $('.light').addClass('moon');
    $('.sky').addClass('night');
    return false;
  } else {
    $('.light').addClass('sun');
    $('.squiggle-container').show();
    $('.sky').addClass('day');
    return true;
  }
}

function cloudAmount() {
  var c = currentW.toLowerCase();
  if ((c.indexOf("overcast") > -1)) {
    $('.clouds').addClass('cloudy');
    for (var i = 1; i < 8; i++) {
      $('.clouds').append("<div class='cloud'></div>");
    }
  } else if (c.indexOf("cloudy") > -1) {
    $('.clouds').addClass('cloudy');
    for (var i = 1; i < 12; i++) {
      $('.clouds').append("<div class='cloud'></div>");
    }
  } else if (c.indexOf("partly") > -1) {
    $('.clouds').addClass('cloudy');
    for (var i = 1; i < 5; i++) {
      $('.clouds').append("<div class='cloud'></div>");
    }
  }
}

function getWeatherWithTime() {
  currentW = weather.current.condition.text;
  var currentWeatherCode = $.grep(conditions, function(e){
    return e.code == currentW;
  });

  var code = {};
  code = currentWeatherCode;

  var t = isDay();
  cloudAmount();
  if (t === true) {
    console.log('Yes, it ISDAY')
    day = true;
    return code[0].day;
  } else {
    console.log('NO, it IS NOT DAY')
    day = false;
    tod = "night";
    return code[0].night;
  }
}
// -- end

function populate() {
  $('.weather-location').text(weather.location.name);
  $('.weather-current').text(weather.current.condition.text);
  $('.weather-time-of-day').text(tod);

  getWeatherWithTime();
}
function errorHandler(){
	console.log('got some error')
}

function httpGetAsync(theUrl, callback, errorHandler)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
            console.log(callback)
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function callThis() {
  currentWeather(query, errorHandler, options);
}

function currentWeather(query, callback, options) {
  console.log(query);
	options.path = 'http://' + options.host + '/v1/current.json?key=' + weatherApiKey + '&q=' + query;
  console.log('Is the query set?' + query)
	httpGetAsync(options.path, function(weatherOb) {
    console.log(weatherOb)
    weather = JSON.parse(weatherOb);
    populate();
  }, errorHandler);
}

// -- start
// Get current user location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        console.log('Geolocating on the weather.js')
        console.log('The query is ' + query)
    } else {
        alert("Geolocation is not supported by this browser.");
        query = "Nashville";
    }
}

function showPosition(position) {
  query = position.coords.latitude + "," + position.coords.longitude;
  query = String(query);
}

getLocation();
// -- end
