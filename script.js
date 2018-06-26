var app = angular.module('myApp', ['ngRoute','ui.bootstrap']);


app.config(function($locationProvider,$routeProvider) {

    $locationProvider.hashPrefix('!');
    $routeProvider

    // route for the home page
        .when('/', {
            templateUrl: 'main.html',
            controller: 'mainController'
        }).otherwise({ redirectTo: '/' });
});

// create the controller and inject Angular's $scope
app.controller('mainController', function($scope,userService) {

    $scope.queryResult={};
    $scope.userSearchText="";
    $scope.selectedRecordIndex=-1;

    $scope.fakeCallFromController=function(userData) {
        alert('calling user'+userData.name);
    }

    $scope.filterFunction = function(element) {
        var result=element.name.match(new RegExp($scope.userSearchText,'i'));
        if($scope.userSearchText==="") {
            return true;
        } else {
            return result;
        }
    };

    $scope.callUser=function(id) {
        $scope.selectedRecordIndex=id;
    }

    userService.getAllUsers().then(function(response){
        $scope.queryResult=response;
    });

});


