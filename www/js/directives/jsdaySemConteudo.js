(function(){
    "use strict";

    /**
     * @description Directiva de Tela de fundo dos conteúdos vazios
     * @author Walter Gandarella <walter.wgbn@gmail.com>
     * @memberof jsday
     * @version 1.0.0
     */
    angular
        .module('jsday')
        .directive('jsdaySemConteudo', jsdaySemConteudo);

    /**
     * @memberof jsday
     * @ngdoc directive
     * @scope {}
     * @restrict E
     * @name jsdaySemConteudo
     * @description
     *   Exibe um fundo amigável para telas que ainda não receberam conteúdo
     *
     * @attr {String} conteudo O tipo de tela que receberá a diretiva [nota|comentario]
     *
     * @example
     *   Usage:
     *   <jsday-sem-conteudo conteudo="nota"></jsday-sem-conteudo>
     *
     *   <jsday-sem-conteudo conteudo="comentario"></jsday-sem-conteudo>
     */
    function jsdaySemConteudo () {
        var directive = {
            restrict: 'E',
            templateUrl: 'templates/jsday-sem-conteudo.html',
            scope: {
                conteudo: '@'
            },
            link: linkSemConteudo,
            controller: ctrlSemConteudo
        };

        return directive;

        /**
         * Inicializa a diretiva para manipular o DOM
         * @memberof jsdaySemConteudo
         * @param {service} scope the scope of this element
         * @param {service} el element that this direcive is assigned to
         * @param {service}   attr attribute of this element
         * @param {controller} vm map controller
         */
        function linkSemConteudo (scope, el, attr, vm) {
            var altura = $(window).height() - 55 - 140 - (scope.conteudo == 'nota' ? 75 : 0);
            $('.jsday-sem-conteudo').height(altura);
        }
    }

    ctrlSemConteudo.$inject = ['$scope'];

    /**
     * Lógica da diretiva jsdaySemConteudo
     * @memberof jsdaySemConteudo
     * @param {service} $scope  Escopo do controller
     */
    function ctrlSemConteudo ($scope) {
        if ($scope.conteudo == 'nota'){
            $scope.legenda = "Nenhuma nota adicionada";
            $scope.icone = "img/notas.png";
        } else {
            $scope.legenda = "Ninguém comentou ainda";
            $scope.icone = "img/chat.png";
        }
    }

})();
