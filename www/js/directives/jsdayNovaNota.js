(function(){
    "use strict";

    /**
     * @description Directiva que cria novas notas
     * @author Walter Gandarella <walter.wgbn@gmail.com>
     * @memberof jsday
     * @version 1.0.0
     */
    angular
        .module('jsday')
        .directive('jsdayNovaNota', jsdayNovaNota);

    /**
     * @memberof jsdayNovaNota
     * @ngdoc directive
     * @scope {}
     * @restrict E
     * @name jsdaySemConteudo
     * @description
     *   Exibe uma caixa onde o usuário pode criar uma nova nota
     *
     * @attr {String} palestra A chave (key) da palestra a que a nota pertence
     *
     * @example
     *   Usage:
     *   <jsday-nova-nota palestra="key"></jsday-nova-nota>
     */
    function jsdayNovaNota () {
        var directive = {
            restrict: 'E',
            templateUrl: 'templates/jsday-nova-nota.html',
            scope: {
                palestra: '='
            },
            controller: ctrlNovaNota
        };

        return directive;
    }

    ctrlNovaNota.$inject = ['$scope', '$rootScope', 'noteService'];

    /**
     * Lógica da diretiva jsdayNovaNota
     * @memberof jsdayNovaNota
     * @param {service} $scope  Escopo do controller
     */
    function ctrlNovaNota ($scope, $rootScope, noteService) {
        $scope.texto = "";
        $scope.salvarClick = _salvarClick;

        //////////////////////

        /**
         * Função que captura o clique da caixa e salva a nota no banco local
         * @memberof jsdayNovaNota
         * @function _salvarClick
         */
        function _salvarClick () {
            noteService.add($scope.palestra, $scope.texto)
                .then(function () {
                    $rootScope.$broadcast('notaAdded', {palestra: $scope.palestra});
                    $scope.texto = "";
                });
        }
    }

})();
