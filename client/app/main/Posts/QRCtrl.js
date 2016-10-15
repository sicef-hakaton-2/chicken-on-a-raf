'use strict';

angular.module('rftApp')
    .controller('QRCtrl', ['$scope', function($scope){
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams){
            $('#qrcode').qrcode({width: 256,height: 256,text: toParams.str})
        });
    }]);