(function(){
    'use strict';

    angular
        .module('jsday', ['ionic', 'firebase', 'ionic.rating', 'ionic-toast'])
        .constant('TABLE', {
            Note: 'Note'
        })
        .run(jsdayRun)
        .config(jsdayConfig);

    jsdayRun.$inject = ['$ionicPlatform', 'dbService'];
    jsdayConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider'];

    function jsdayConfig($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.tabs.position('bottom');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            })
            .state('palestra', {
                url: '/palestra/:key',
                templateUrl: "templates/palestra.html",
                controller: 'PalestraCtrl'
            })
        $urlRouterProvider.otherwise('/')
    }

    function jsdayRun($ionicPlatform, dbService) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });

        dbService.initDatabase();
    }

})();
