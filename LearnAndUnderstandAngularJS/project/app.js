var firstAngularApp = angular.module("firstAngularApp", ["ngRoute", "ngResource"]);

firstAngularApp.config(function($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl: "pages/index.html",
            controller: "indexController"
        })
        .when("/forecast", {
            templateUrl: "pages/forecast.html",
            controller: "forecastController"
        })
        .when("/forecast/:days", {
            templateUrl: "pages/forecast.html",
            controller: "forecastController"
        });
});

firstAngularApp.controller("indexController", ["$scope", "dataService", function($scope, dataService){
    $scope.city = dataService.city;

    // This function is necesary for updating the value of the dataService whenever the `$scope.city` changes
    $scope.$watch("city", function(){
        dataService.city = $scope.city;
    })
}]);

firstAngularApp.controller("forecastController", ["$scope", "dataService", "$resource", "$routeParams",
    function($scope, dataService, $resource, $routeParams){
        $scope.city = dataService.city;

        // Get the days from a url param. if there's no days by default is set to 2
        $scope.days = $routeParams.days || 2;

        $scope.weatherAPI = $resource(
            "http://api.openweathermap.org/data/2.5/forecast/daily",
            // This 2 objects with their values avoid crossorigin issues
            {callback: "JSON_CALLBACK"},
            {get: {method: "JSONP"}}
        );

        // Get call to the openWeather API
        $scope.weatherResult = $scope.weatherAPI.get({
            q: $scope.city,
            cnt: $scope.days,
            appid: "9102a05baa45e83f500ef056fa532322"
        });

        $scope.convertToCelsius = function(degK){
            return Math.round(degK - 273.15);
        };

        $scope.convertToDate = function(dt){
            return new Date(
                dt * 1000 // Multiplied by 1000 because the api returns the date in seconds and we need miliseconds
            );
        };
}]);


// ------------- Services -----------------
firstAngularApp.service("dataService", function(){
    this.city = "Gandia, ES"
});
