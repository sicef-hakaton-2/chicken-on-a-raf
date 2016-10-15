'use strict';

angular.module('rftApp')
    .controller('MainCtrl', ['$scope', '$state', function ($scope, $state) {
        $scope.hasFooter = false;
        $scope.isPosts = false;
        $scope.params = null;

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams) {
            if (_.contains(toState.name, 'post') || _.contains(toState.name, 'help')) {
                $scope.hasFooter = true;
                $scope.isPosts = _.contains(toState.name, 'posts');
                $scope.params = toParams;
            } else {
                $scope.hasFooter = false;
            }
        });

        $scope.createPost = function () {
            $scope.$broadcast('createPost');
        };

        $scope.$state = $state;

        $scope.generateQR = function () {
            $state.go('main.qr', {str: JSON.stringify(Session.get('lastPost'))});
        };
    }]);