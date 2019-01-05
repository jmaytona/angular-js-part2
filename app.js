var test = angular.module('myApp', ['ngRoute']);


test.config(['$routeProvider', function($routeProvider){
    //Before the application run
    $routeProvider
    .when('/home', {
        templateUrl:'views/home.html',
        controller:'TestController'
    })
    .when('/list', {
        templateUrl:'views/list.html',
        controller:'TestController'
    })
    .otherwise({
        redirectTo: '/home'
    });
}]);

test.run(function(){
    //after the application run
})

//creating custom directives
//use camel case instead of hypen ex. random-currency = randomCurrency
test.directive('randomCurrency', [function(){
    //restric ex. E = element A = attribute like ng-
    return{
        restrict: 'E',
        scope: {
            forexes: '=',
            title:  '='
            },
        //template: '<h1>{{forexes[random].currency}}</h1>',
        templateUrl: 'views/random.html',
        controller: function($scope){//controller and function
        $scope.random = Math.floor(Math.random() * 3);    
        }
    };

}]);

test.controller('TestController', [ '$scope', '$http', function($scope, $http){
    $scope.message = "Hi Guys";

    //function to remove data from array
    $scope.removeCurrency = function(forex){
        var removedCurrency = $scope.forexes.indexOf(forex); //indexof() is a function to get the index number in an array[0]
        $scope.forexes.splice(removedCurrency, 1); //splice() function adds or removes data in array depends on the number
    }
    //function to add data to array
    $scope.addCurrency = function(){
        //push is a function to add object to array
        $scope.forexes.push({
            currency: $scope.newCurrency.currency,
            rate: $scope.newCurrency.rate,
            date: $scope.newCurrency.date,
            available: "true"
        });
        //validation to clear input fields
        $scope.newCurrency.currency = "";
        $scope.newCurrency.rate = "";
        $scope.newCurrency.date = "";
    }

    //get json file like ajax call or is it? since its http
    $http.get('data/currency.json').then(function(response){
        $scope.forexes = response.data;
    });
}]);
