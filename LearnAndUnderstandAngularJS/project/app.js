var firstAngularApp = angular.module("firstAngularApp", ["ngRoute", "ngResource"]);


// ------------- Services -----------------
firstAngularApp.service("dataService", function(){
    this.city = "Gandia, ES"
});

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