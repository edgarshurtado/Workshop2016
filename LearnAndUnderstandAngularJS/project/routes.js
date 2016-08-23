/**
 * Created by Edgar S. Hurtado on 23/08/16.
 */


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
