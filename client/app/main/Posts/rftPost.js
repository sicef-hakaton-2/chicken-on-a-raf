'use strict';

angular.module('rftApp')
    .directive('rftPost', [function(){
        return {
            replace: true,
            scope: {
                post : '='
            },
            templateUrl:'client/app/main/Posts/rft-post.html',
            restrict: 'E',
            link: function(scope){

            }
        }
    }]);