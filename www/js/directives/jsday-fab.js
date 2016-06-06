(function(){

    /**
    * @description Float actionbutton
    * @author Walter Gandarella <walter.wgbn@gmail.com>
    * @memberof jsday
    * @version 1.0.0
    */
    angular
        .module('jsday')
        .directive('jsdayFab', jsdayFab);

    /**
    * @memberof jsday
    * @ngdoc directive
    * @scope {} (Options are true for a new inherited scope, false for shared scope, and either {} or object for isolate scope.)
    * @restrict E ([E]lement, [A]ttribute, and [C]lass, use @restrict ECA)
    * @name jsdayFab
    * @param  {Expression} acao       Função a ser executada ao clicar no botão
    * @description
    *   Botão flutuante
    * @example
    *   Usage:
    *   <jsday-fab icone="ion-plus" acao="clica"></jsday-fab>
    */
    function jsdayFab () {
        var directive = {
            restrict: 'E',
            templateUrl: 'templates/jsday-fab.html',
            scope: {
                icone: '@',
                acao: '&'
            },
            link: linkFab,
            controller: ctrlFab
        };

        return directive;

        function linkFab (scope, el) {
            $('body .jsday-fab').hide();
            
            $('body').on('click', '.tab-item', function(e){
                if (e.target.innerHTML == 'Comentários'){
                    $('body .jsday-fab').show();
                } else {
                    $('body .jsday-fab').hide();
                }
            });
        }
    }

    ctrlFab.$inject = ['$scope'];

    /**
     * The logical of jsdayFab
     * @memberof jsdayFab
     * @param {Object} $scope       Escopo da diretiva
     */
    function ctrlFab ($scope) {
        $scope.fabClick = function () {
            $scope.acao();
        };
    }

})();
