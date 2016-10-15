'use strict';

angular.module('rftApp')
    .controller('CreatePostCtrl', ['$scope', '$state', function ($scope, $state) {

        $scope.postInfo = {
            title: '',
            text: ''
        };

        var previousState = {
            "name": null,
            "type": null
        };

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            previousState.name = fromState.name;
            previousState.type = fromParams.type;
        });

        $scope.$on('createPost', function () {
            Meteor.call('addPostWithoutCoordinates', (Session.get('locationName') ? Session.get('locationName') : 'nis'), Session.get('localeType'), Session.get('localeType'), $scope.postInfo.title, $scope.postInfo.text);
            $scope.goBack();
        });

        $scope.goBack = function () {
            $state.go(previousState.name, {type: previousState.type});
        }
    }]);