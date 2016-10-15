'use strict';

angular.module('rftApp')
    .controller('LoginCtrl', ['$scope', '$state', function ($scope, $state) {
        if (Meteor.user()) {
            $state.go('landing');
            return;
        }

        $scope.userInfo = {
            email: '',
            password: ''
        };

        $scope.login = function () {
            event.stopPropagation();
            Meteor.loginWithPassword({email: $scope.userInfo.email}, $scope.userInfo.password, (error) => {
                if (!error) {
                    $state.go('landing');
                }
                else {
                    Accounts.createUser($scope.userInfo);
                }

                $state.go('landing');
            });
        };
    }]);