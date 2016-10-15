'use strict';

angular.module('rftApp')
    .directive('rftHexSmall', [function(){
        return {
            templateUrl: 'client/app/components/hex-small/rft-hex-small.html',
            replace: true,
            scope: {},
            transclude: true,
            link: function (scope, element){

            }
        }
    }]);