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

firstAngularApp.controller("forecastController", ["$scope", "dataService",function($scope, dataService){
    $scope.city = dataService.city;
}]);


// ------------- Services -----------------
firstAngularApp.service("dataService", function(){
    this.city = "Gandia"
});
