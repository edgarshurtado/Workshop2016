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
        });
});

firstAngularApp.controller("indexController", ["$scope", "dataService", function($scope, dataService){
    $scope.city = dataService.city;

    $scope.$watch("city", function(){
        dataService.name = $scope.name;
    })
}]);

firstAngularApp.controller("forecastController", ["$scope", "dataService", "$resource" ,function($scope, dataService, $resource){
    $scope.city = dataService.city;

    $scope.weatherAPI = $resource(
        "http://api.openweathermap.org/data/2.5/forecast/daily",
        // This 2 objects with their values avoid crossorigin issues
        {callback: "JSON_CALLBACK"},
        {get: {method: "JSONP"}}
    );

    $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: 2, appid: "9102a05baa45e83f500ef056fa532322"});


    console.log($scope)
}]);


// ------------- Services -----------------
firstAngularApp.service("dataService", function(){
    this.city = "Gandia, ES"
});
