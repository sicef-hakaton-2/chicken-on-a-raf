'use strict';

angular.module('rftApp')
    .controller('HelpCtrl', ['$scope', '$state', '$meteor', function ($scope, $state, $meteor) {
        //$scope.posts = $meteor.collection(Post).subscribe('Post');

        $scope.posts = [];

        $scope.title = 'Posts';

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams) {
            if (toParams.type) {
                $scope.title = toParams.type;

                Session.set('localeType', toParams.type);
                $scope.posts = $meteor.collection(function () {
                    return Post.find({
                        localeType: toParams.type,
                        locationName: (Session.get('locationName') ? Session.get('locationName') : 'nis')
                    }, {sort: {score: -1}});
                });
            }
        });
    }]);