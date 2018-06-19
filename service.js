app.factory('userService', function($http, $q) {
    // create a message to display in our view
    console.log('user service');
    function getAllUsers() {
        var deferred = $q.defer();
        $http.get('people.json')
            .then(function(response){
                deferred.resolve(response.data);
            },
                function(err) {
                deferred.reject(err);
            })
        console.log('get all users');
        return deferred.promise;
    }
    var service = {
        getAllUsers:getAllUsers
    };

    return service;
});
