(function(){
    "use strict";

    /**
     * @description Directiva que exibe a lista de palestras
     * @author Walter Gandarella <walter.wgbn@gmail.com>
     * @memberof jsday
     * @version 1.0.0
     */
    angular
        .module('jsday')
        .directive('jsdayPalestras', jsdayPalestras);

    /**
     * @memberof jsday
     * @ngdoc directive
     * @scope {}
     * @restrict E
     * @name jsdayPalestras
     * @description
     *   Exibe uma palestra na timeline do evento
     *
     * @attr {Object} palestra O objeto que representa a palestra a ser exibida
     *
     * @example
     *   Usage:
     *   <jsday-palestras palestra="palestra"></jsday-palestras>
     */
    function jsdayPalestras () {
        var directive = {
            restrict: 'E',
            templateUrl: 'templates/jsday-palestras.html',
            scope: {
                palestra: '='
            },
            controller: ctrlPalestras
        };

        return directive;
    }

    ctrlPalestras.$inject = ['$scope', '$state', 'Utils'];

    /**
     * Lógica da diretiva jsdayPalestras
     * @memberof jsdayPalestras
     * @param {service} $scope  Escopo do controller
     */
    function ctrlPalestras ($scope, $state, Utils) {
        $scope.palestra.hora = Utils.parseTimeToStr($scope.palestra.hora);
        $scope.palestraClick = _palestraClick;

        /////////////////////////////

        /**
         * Função que captura o clique na palestra e exibe a página de detalhes da mesma
         * @memberof jsdayPalestras
         * @function _palestraClick
         */
        function _palestraClick () {
            if (!$scope.palestra.servico)
                $state.go('palestra', {key: $scope.palestra.$id});
        }
    }

})();
