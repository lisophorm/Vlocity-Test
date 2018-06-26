app.directive('userButton', function () {
    return {
        transclude: true,
        restrict: 'E', // Element directive
        templateUrl: 'userButton.html'
    };
});

app.directive('userWidget', function () {
    return {
        transclude: true,
        restrict: 'E', // Element directive
        scope: {userData: '=userData'},
        templateUrl: 'userWidget.html'
    };
});

app.directive('mySearchBox', function () {
    return {
        restrict: 'E',
        scope: {
            searchText: '='
        },
        controller: function ($scope) {
            $scope.isKeyPressed = false;
            $scope.pressedKey = function (event) {

                event.stopPropagation();

                if (event.charCode == 13) {
                    $scope.isKeyPressed = true;
                    $scope.searchText = $scope.localSearchText;
                    // debouncing
                    setInterval(function () {
                        $scope.isKeyPressed = false;
                    }, 1000);
                }

            }
            $scope.localSearchText = '';
            $scope.clearSearch = function () {
                if (!$scope.isKeyPressed) {
                    $scope.searchText = "";
                    $scope.localSearchText = "";
                }

                $scope.isKeyPressed = false;
            };
            $scope.doSearch = function () {
                $scope.isKeyPressed = false;
                $scope.searchText = $scope.localSearchText;
            };
        },
        replace: true,
        templateUrl: 'templateSearch.html'

    };
})

app.directive('userRecord', function () {
    return {
        restrict: 'E',
        scope: {
            userData: '=userData',
            "myUpdate": "&"
        },
        templateUrl: 'templateUrl-partial.html',
        controller: function ($scope) {
            $scope.fakeCall = function (data) {
                $scope.myUpdate();
            }
        },
        link: function ($scope) {

            $scope.$watch('userData', function (value) {
                // normalizes the likes vs dislikes for layout consistency
                var likeDiff = Math.abs($scope.userData.Likes.length - $scope.userData.Dislikes.length);
                if ($scope.userData.Likes > $scope.userData.Dislikes) {
                    for (var i = 0; i < likeDiff; i++) {
                        $scope.userData.Dislikes.push("-");
                    }
                } else if ($scope.userData.Likes < $scope.userData.Dislikes) {
                    for (var i = 0; i < likeDiff; i++) {
                        $scope.userData.Likes.push("-");
                    }
                }

            })
        }
    }
})

// directive for rendering the rating with hearths

app.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
        '<li ng-repeat="star in stars" ng-class="star" >' +
        '\u2764' +
        '</li>' +
        '</ul>',
        scope: {
            ratingValue: '=',
            max: '='
        },
        link: function (scope, elem, attrs) {

            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.$watch('ratingValue', function (oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    }
})