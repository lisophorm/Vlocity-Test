app.factory('userService', function($http, $q) {

    function getAllUsers() {
        var deferred = $q.defer();
        $http.get('people.json')
            .then(function(response){
                deferred.resolve(response.data);
            },
                function(err) {
                deferred.reject(err);
            })
        return deferred.promise;
    }
    var service = {
        getAllUsers:getAllUsers
    };

    return service;
});
