/**
 * Created by Edgar S. Hurtado on 23/08/16.
 */

firstAngularApp.controller("indexController", ["$scope", "$location" ,"dataService", function($scope, $location, dataService){
    $scope.city = dataService.city;

    // This function is necesary for updating the value of the dataService whenever the `$scope.city` changes
    $scope.$watch("city", function(){
        dataService.city = $scope.city;
    })

    $scope.submit = function(){
        $location.path("/forecast");
    }
}]);

firstAngularApp.controller("forecastController", ["$scope", "dataService", "$routeParams", "weatherService",
    function($scope, dataService, $routeParams, weatherService){

        $scope.city = dataService.city;

        // Get the days from a url param. if there's no days by default is set to 2
        $scope.days = $routeParams.days || 2;

        // Get call to the openWeather API
        $scope.weatherResult = weatherService.getWeather($scope.city, $scope.days);

        $scope.convertToCelsius = function(degK){
            console.log(degK);
            return Math.round(degK - 273.15);
        };

        $scope.convertToDate = function(dt){
            console.log(dt);
            return new Date(
                dt * 1000 // Multiplied by 1000 because the api returns the date in seconds and we need miliseconds
            );
        };
    }]);
