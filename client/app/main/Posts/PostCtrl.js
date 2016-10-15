'use strict';

angular.module('rftApp')
    .controller('PostCtrl', ['$scope', '$state', function ($scope, $state) {
        var previousState = {
            "name": null,
            "type": null
        };

        $scope.post = {
            title: '',
            content: '',
            author: ''
        };

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $scope.post = Post.findOne({_id: toParams.id});

            Session.set('lastPost', $scope.post);

            previousState.name = fromState.name;
            previousState.type = fromParams.type;
        });

        $scope.goBack = function () {
            $state.go(previousState.name, {type: previousState.type});
        }
    }]);