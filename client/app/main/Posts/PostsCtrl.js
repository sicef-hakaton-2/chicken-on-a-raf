'use strict';

angular.module('rftApp')
    .controller('PostsCtrl', ['$scope', '$state', '$meteor', function ($scope, $state, $meteor) {
        $scope.posts = $meteor.collection(Post).subscribe('Post');

        $scope.posts = [];

        $scope.title = 'Posts';
        $scope.titleClass = null;
        var titleClassMap = {
            "general": "home",
            "transport": "transport",
            "police": "police",
            "hospital": "aid",
            "exchange": "exchange",
            "hotels": "hotel",
            "shelter": "shelter",
            "food": "food",
            "give": "give",
            "request": "request"
        };

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams) {
            if (toParams.type) {
                $scope.title = toParams.type;
                Session.set('localeType', titleClassMap[toParams.type]);
                $scope.posts = $meteor.collection(function () {
                    return Post.find({
                        localeType: titleClassMap[toParams.type],
                        locationName: (Session.get('locationName') ? Session.get('locationName') : 'nis')
                    }, {sort: {score: -1}});
                });
                $scope.titleClass = titleClassMap[toParams.type];
            }
        });
    }]);

angular.module('rftApp').
filter('capitalize', function () {
    return function (input, all) {
        var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
        return (!!input) ? input.replace(reg, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }) : '';
    }
});