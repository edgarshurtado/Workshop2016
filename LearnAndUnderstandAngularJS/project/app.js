var firstAngularApp = angular.module("firstAngularApp", ["ngRoute", "ngResource"]);


// ------------- Services -----------------
firstAngularApp.service("dataService", function(){
    this.city = "Gandia, ES"
});

firstAngularApp.service("weatherService", ["$resource", function($resource){
    this.getWeather = function(city, days){

        var weatherAPI = $resource(
            "http://api.openweathermap.org/data/2.5/forecast/daily",
            // This 2 objects with their values avoid crossorigin issues
            {callback: "JSON_CALLBACK"},
            {get: {method: "JSONP"}}
        );

        // Get call to the openWeather API
        return weatherAPI.get({
            q: city,
            cnt: days,
            appid: "9102a05baa45e83f500ef056fa532322"
        });
    }
}]);

// --------------- Directives --------------
firstAngularApp.directive("weatherResult", function(){
    return {
        restrict: "E",
        templateUrl: "directives/weatherResult.html",
        replace: true,
        scope: {
            weatherObject : "=",
            formattedDateFunction : "&",
            convertToCelsiusFunction : "&"
        }
    }
});