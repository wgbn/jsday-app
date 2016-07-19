(function(){
    'use strict';

    /**
     * @description Módulo principal do app
     * @author Walter Gandarella <walter.wgbn@gmail.com>
     * @memberof jsday
     * @version 1.0.0
     */
    angular
        .module('jsday', ['ionic', 'firebase', 'ionic.rating', 'ionic-toast'])
        .constant('TABLE', {
            Note: 'Note'
        })
        .run(jsdayRun)
        .config(jsdayConfig);

    jsdayRun.$inject = ['$ionicPlatform', '$rootScope', 'dbService', 'fireService'];
    jsdayConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider'];

    /**
     * @memberof jsday
     * @ngdoc config
     * @name jsdayConfig
     * @param $stateProvider {provider}
     * @param $urlRouterProvider {provider}
     * @param $ionicConfigProvider {provider}
     */
    function jsdayConfig($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.tabs.position('bottom');

        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html'
            })
            .state('app.home', {
                url: '/home',
                views: {
                    'appMain': {
                        templateUrl: 'templates/home.html',
                        controller: 'HomeCtrl'
                    }
                }
            })
            .state('app.workshops', {
                url: '/workshops',
                views: {
                    'appMain': {
                        templateUrl: 'templates/workshops.html',
                        controller: 'WorkshopsCtrl'
                    }
                }
            })
            .state('app.palestra', {
                url: '/palestra/:key',
                views: {
                    'appMain': {
                        templateUrl: "templates/palestra.html",
                        controller: 'PalestraCtrl'
                    }
                }
            });
        $urlRouterProvider.otherwise('/app/home');
    }

    /**
     * @memberof jsday
     * @ngdoc run
     * @name jsdayRun
     * @param $ionicPlatform {provider}
     * @param dbService {service}
     */
    function jsdayRun($ionicPlatform, $rootScope, dbService, fireService) {
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

        $rootScope.appConfig = {
            mapa: '',
            mapaUrl: '',
            patrocinadores: [],
            apoio: [],
            flagPatrocinio: false,
            flagApoio: false,
            verMapa: _verMapa,
            showPatrocinio: _showPatrocinio,
            showApoio: _showApoio
        };
        // gerador de url do Google Static Map
        // http://staticmapmaker.com/google/

        var config = fireService.getAppConfig();
        config.$loaded(function(resolve){
            $rootScope.appConfig.mapa = resolve.mapa;
            $rootScope.appConfig.mapaUrl = resolve.mapaUrl;
            $rootScope.appConfig.patrocinadores = resolve.patrocinadores;
            $rootScope.appConfig.apoio = resolve.apoio;
        });

        /**
         * Função que captura o clique no mapa e abre no navegador
         * @memberof jsday
         * @function _verMapa
         */
        function _verMapa () {
            window.open($rootScope.appConfig.mapaUrl, '_system');
        }

        /**
         * Função que captura o toque no botão de patrocinio e exibe a lista de patrocinadores
         * @memberof jsday
         * @function _showPatrocinio
         */
        function _showPatrocinio () {
            if ($rootScope.appConfig.flagPatrocinio){
                $rootScope.appConfig.flagPatrocinio = false;
            } else {
                $rootScope.appConfig.flagApoio = false;
                $rootScope.appConfig.flagPatrocinio = true;
            }
        }

        /**
         * Função que captura o toque no botão de apoio e exibe a lista de apoiadores
         * @memberof jsday
         * @function _showApoio
         */
        function _showApoio () {
            if ($rootScope.appConfig.flagApoio){
                $rootScope.appConfig.flagApoio = false;
            } else {
                $rootScope.appConfig.flagPatrocinio = false;
                $rootScope.appConfig.flagApoio = true;
            }
        }
    }

})();
