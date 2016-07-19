(function(){
    "use strict";

    /**
     * @description Directiva que exibe a lista de palestras em forma de timeline
     * @author Walter Gandarella <walter.wgbn@gmail.com>
     * @memberof jsday
     * @version 1.0.0
     */
    angular
        .module('jsday')
        .directive('jsdayTimeline', jsdayTimeline);

    /**
     * @memberof jsday
     * @ngdoc directive
     * @scope {}
     * @restrict E
     * @name jsdayTimeline
     * @description
     *   Exibe uma palestra na timeline do evento
     *
     * @attr {Object} palestra O objeto que representa a palestra a ser exibida
     *
     * @example
     *   Usage:
     *   <jsday-timeline palestras="palestras"></jsday-timeline>
     */
    function jsdayTimeline () {
        var directive = {
            restrict: 'E',
            templateUrl: 'templates/jsday-timeline.html',
            scope: {
                palestras: '='
            },
            replace: true,
            controller: ctrlTimeline
        };

        return directive;
    }

    ctrlTimeline.$inject = ['$scope', '$state', 'Utils', 'fireService'];

    /**
     * Lógica da diretiva jsdayPalestras
     * @memberof jsdayTimeline
     * @param {service} $scope  Escopo do controller
     */
    function ctrlTimeline ($scope, $state, Utils, fireService) {
        // bindings
        $scope.lista = $scope.palestras;

        // ações
        $scope.getTrilhaNome = _getTrilhaNome;
        $scope.getHora = _getHora;

        // init
        _init();

        /////////////////////////////

        /**
         * Função que captura o clique na palestra e exibe a página de detalhes da mesma
         * @memberof jsdayTimeline
         * @function _palestraClick
         */
        function _palestraClick () {
            /*if (!$scope.palestra.servico)
                $state.go('palestra', {key: $scope.palestra.$id});*/
        }

        /**
         * Função que péga o nome da trilha
         * @memberof jsdayTimeline
         * @function _getTrilhaNome
         * @param {String} _trilha
         * @returns {Object} Trilha
         */
        function _getTrilhaNome (_trilha) {
            return fireService.getTrilha(_trilha);
        }

        /**
         * Retorna a hora formatada
         * @memberof jsdayTimeline
         * @function _getHora
         * @param {Number} _timestamp
         * @returns {String} hora
         */
        function _getHora (_timestamp) {
            return moment(_timestamp).format('HH:mm');
        }

        /**
         * Função que inicializa o controller
         * @memberof jsdayTimeline
         * @function _init
         */
        function _init () {
            //
        }
    }

})();
