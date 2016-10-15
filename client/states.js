'use strict';

angular.module("rftApp")
    .config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        function templatePath(filePath) {
            return 'client/app/' + filePath;
        }

        $stateProvider
            .state('landing', {
                url: '/landing',
                templateUrl: templatePath('landing/landing.html'),
                controller: 'LandingCtrl'
            }).state('login', {
                url: '/login',
                templateUrl: templatePath('login/login.html'),
                controller: 'LoginCtrl'
            }).state('main', {
                url: '/main',
                templateUrl: templatePath('main/main.html'),
                controller: 'MainCtrl'
            }).state('main.info', {
                url: '/information',
                templateUrl: templatePath('main/Information/information.html'),
                controller: 'InformationCtrl'
            }).state('main.posts', {
                url: '/posts/:type',
                templateUrl: templatePath('main/Posts/posts.html'),
                controller: 'PostsCtrl'
            }).state('main.post', {
                url: '/post/:id',
                templateUrl: templatePath('main/Posts/post.html'),
                controller: 'PostCtrl'
            }).state('main.create_post', {
                url: '/create',
                templateUrl: templatePath('main/Posts/create.html'),
                controller: 'CreatePostCtrl'
            }).state('main.help', {
                url: '/help/:type',
                templateUrl: templatePath('main/Posts/help.html'),
                controller: 'HelpCtrl'
            }).state('main.qr', {
                url: '/qr/:str',
                templateUrl: templatePath('main/Posts/qr.html'),
                controller: 'QRCtrl'
            })
            .state('main.family', {
                url: '/find',
                templateUrl: templatePath('main/Posts/family.html'),
                controller: 'FamilyCtrl'
            });

        $urlRouterProvider.otherwise("/login");
    });