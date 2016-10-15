'use strict';

angular.module('rftApp')
    .controller('FamilyCtrl', ['$scope', function($scope){
        $scope.checkedIn = false;

        $scope.checkIn = function(){
            $scope.checkedIn = true;
        }
    }]);