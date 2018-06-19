var app = angular.module('myApp', ['ngRoute']);


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
    // create a message to display in our view
    console.log('main controller');
    $scope.queryResult={};
    $scope.userSearchText="";
    $scope.selectedRecordIndex=-1;

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
        console.log('calling user',id);
    }
    userService.getAllUsers().then(function(response){
        $scope.queryResult=response;
        console.log('response is',response);
    });
    $scope.message = 'Everyone come and see how good I look!';
});


