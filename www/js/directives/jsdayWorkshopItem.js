(function(){
    "use strict";

    /**
     * @description Directiva que exibe um item da lista de workshops
     * @author Walter Gandarella <walter.wgbn@gmail.com>
     * @memberof jsday
     * @version 1.0.0
     */
    angular
        .module('jsday')
        .directive('jsdayWorkshopItem', jsdayWorkshopItem);

    /**
     * @memberof jsday
     * @ngdoc directive
     * @scope {}
     * @restrict E
     * @name jsdayWorkshopItem
     * @description
     *   Exibe uma palestra na timeline do evento
     *
     * @attr {Object} palestra O objeto que representa a palestra a ser exibida
     *
     * @example
     *   Usage:
     *   <jsday-workshop-item workshop="workshop"></jsday-workshop-item>
     */
    function jsdayWorkshopItem () {
        var directive = {
            restrict: 'E',
            templateUrl: 'templates/jsday-workshop-item.html',
            scope: {
                workshop: '='
            },
            replace: true,
            controller: ctrlWorkshopItem
        };

        return directive;
    }

    ctrlWorkshopItem.$inject = ['$scope'];

    /**
     * Lógica da diretiva jsdayWorkshopItem
     * @memberof jsdayWorkshopItem
     * @param {service} $scope  Escopo do controller
     */
    function ctrlWorkshopItem ($scope) {
        // bindings

        // ações
        $scope.getHora = _getHora;

        // init
        _init();

        /////////////////////////////

        /**
         * Função que inicializa o controller
         * @memberof jsdayWorkshopItem
         * @function _init
         */
        function _init () {
            //
        }

        /**
         * Função que faz o parse do timestamp para hora
         * @memberof jsdayWorkshopItem
         * @function _getHora
         * @param {Number} _timestamp
         * @returns {String}
         */
        function _getHora (_timestamp) {
            return moment(_timestamp).format('HH:mm');
        }
    }

})();
