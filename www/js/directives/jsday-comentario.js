(function(){

    /**
    * @description Exibe comentários
    * @author Walter Gandarella <walter.wgbn@gmail.com>
    * @memberof jsday
    * @version 1.0.0
    */
    angular
        .module('jsday')
        .directive('jsdayComentario', jsdayComentario);

    /**
    * @memberof jsday
    * @ngdoc directive
    * @scope {} (Options are true for a new inherited scope, false for shared scope, and either {} or object for isolate scope.)
    * @restrict E ([E]lement, [A]ttribute, and [C]lass, use @restrict ECA)
    * @name jsdayComentario
    * @param  {Object} comentario       O comentario a ser exibido
    * @description
    *   Exibe um comentário em forma de card
    * @example
    *   Usage:
    *   <jsday-comentario comentario="comentarioObject"></jsday-comentario>
    */
    function jsdayComentario () {
        var directive = {
            restrict: 'E',
            templateUrl: 'templates/jsday-comentario.html',
            scope: {
                comentario: '='
            },
            controller: ctrlComentario
        };

        return directive;
    }

    ctrlComentario.$inject = ['$scope', 'Utils'];

    /**
     * The logical of jsdayComentario
     * @memberof jsdayComentario
     * @param {Object} $scope       Escopo da diretiva
     */
    function ctrlComentario ($scope, Utils) {
        $scope.comentario.registro = Utils.parseDateToStr($scope.comentario.registro, true);
    }

})();
