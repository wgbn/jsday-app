(function(){
    "use strict";

    /**
     * @description Controller Workshops
     * @author Walter Gandarella <walter.wgbn@gmail.com>
     * @memberof jsday
     * @version 1.0.0
     */
    angular
        .module('jsday')
        .controller('WorkshopsCtrl', WorkshopsCtrl);

    WorkshopsCtrl.$inject = ['$scope', '$state','fireService'];

    /**
     * @memberof jsday
     * @ngdoc controller
     * @name PalestraCtrl
     * @param $scope {service}          Controller scope
     * @param $state {provider}         State provider
     * @param $stateParams {provider}   State params
     * @param fireService {factory}     Firebase service
     * @param Utils {factory}           Funções utilitárias
     * @param ionicToast {provider}     Toast provider
     * @param noteService {service}     Serviço de persistencia de notas
     */
    function WorkshopsCtrl($scope, $state, fireService) {

        // expondo os bindings para a view
        $scope.workshops = [];

        // expondo as funções para a view
        $scope.btnVoltar = _btnVoltar;

        // init
        _init();

        ///////////////////////

        /**
         * Função que captura o botão voltar e direciona para tela Home
         * @memberof WorkshopsCtrl
         * @function _btnVoltar
         * @private
         */
        function _btnVoltar () {
            $state.go('app.home');
        }

        /**
         * Função que inicializa o controller
         * @memberof WorkshopsCtrl
         * @function _init
         */
        function _init () {
            fireService.getWorkshops().$loaded(function (resolve) {
                $scope.workshops = resolve;
            });
        }
    }
})();
