'use strict';

angular.module('rftApp')
    .controller('LandingCtrl', ['$scope', function ($scope) {
        $scope.location = Session.get('locationName');

        $scope.locationChanged = function () {
            Session.set('locationName', $scope.location);
        };
    }]);