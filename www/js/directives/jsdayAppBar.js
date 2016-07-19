(function(){
    "use strict";

    /**
     * @description Directiva para a barra de titulo do app
     * @author Walter Gandarella <walter.wgbn@gmail.com>
     * @memberof jsday
     * @version 1.0.0
     */
    angular
        .module('jsday')
        .directive('jsdayAppBar', jsdayAppBar);

    /**
     * @memberof jsday
     * @ngdoc directive
     * @scope {}
     * @restrict E
     * @name jsdayAppBar
     * @description
     *   Exibe uma barra comum que pode ou não contar um botão voltar
     *
     * @attr {Boolean} back Flag que ativa ou não o botão voltar [true|false]
     * @attr {Expression} acao Função que será executada ao clicar no botão voltar
     *
     * @example
     *   Usage:
     *   <jsday-app-bar back="false"></jsday-app-bar>
     *
     *   <jsday-app-bar back="true" acao="func()"></jsday-app-bar>
     */
    function jsdayAppBar () {
        var directive = {
            restrict: 'E',
            templateUrl: 'templates/jsday-app-bar.html',
            scope: {
                back: '=',
                acao: '&'
            },
            controller: appBarCtrl
        };

        return directive;
    }

    appBarCtrl.$inject = ['$scope'];

    /**
     * Lógica da diretiva jsdayAppBar
     * @memberof jsdayAppBar
     * @param {service} $scope  Escopo do controller
     */
    function appBarCtrl ($scope) {
        $scope.back = $scope.back || false;
        $scope.voltarClick = _voltarClick;
        $scope.abreMenuClick = _abreMenuClick;

        /**
         * Função que captura o clique no botão voltar e delega para a função passada no escopo
         * @memberof jsdayAppBar
         * @function _voltarClick
         */
        function _voltarClick () {
            $scope.acao();
        }

        /**
         * Abre o menu lateral
         * @memberof jsdayAppBar
         * @function _abreMenuClick
         */
        function _abreMenuClick () {
            $scope.acao();
        }
    }
})();
