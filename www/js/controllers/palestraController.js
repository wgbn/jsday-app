(function(){
    "use strict";

    /**
     * @description Controller Palestra
     * @author Walter Gandarella <walter.wgbn@gmail.com>
     * @memberof jsday
     * @version 1.0.0
     */
    angular
        .module('jsday')
        .controller('PalestraCtrl', PalestraCtrl);

    PalestraCtrl.$inject = ['$scope', '$state', '$stateParams', 'fireService', 'Utils', 'ionicToast', 'noteService'];

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
    function PalestraCtrl($scope, $state, $stateParams, fireService, Utils, ionicToast, noteService) {

        $scope.key = $stateParams.key;
        $scope.palestra = fireService.getPalestra($stateParams.key);
        $scope.rate = {};
        $scope.rate.avaliacao = Utils.getLocalStorage($stateParams.key) ? Utils.getLocalStorage($stateParams.key) : 0;
        $scope.rate.max = 5;
        $scope.notas = [];

        $scope.rateClick = _rateClick;
        $scope.btnVoltar = _btnVoltar;
        $scope.$on('notaAdded', _notaAdded);

        _getNotas();

        ///////////////////////

        /**
         * Função que captura o clique na diretiva de avaliação e salva o voto do usuário
         * @memberof PalestraCtrl
         * @function _rateClick
         * @private
         */
        function _rateClick () {
            if (!Utils.getLocalStorage($stateParams.key)) {
                $scope.palestra.avaliacao += $scope.rate.avaliacao;
                fireService.updatePalestra($scope.palestra, 'avaliacao');
                Utils.setLocalStorage($stateParams.key, $scope.rate.avaliacao);
            } else {
                $scope.rate.avaliacao = Utils.getLocalStorage($stateParams.key);
                ionicToast.show('Você já avaliou esta palestra.', 'bottom', false, 2500);
            }
        }

        /**
         * Função que captura o botão voltar e direciona para tela Home
         * @memberof PalestraCtrl
         * @function _btnVoltar
         * @private
         */
        function _btnVoltar () {
            $state.go('home');
        }

        /**
         * Função que escuta o evento notaAdded e atualiza as notas na tela
         * @memberof PalestraCtrl
         * @function _notaAdded
         * @param {Object} e        Event object
         * @param {Object} data     Data result object
         * @private
         */
        function _notaAdded (e, data) {
            if (data.palestra == $scope.key)
                _getNotas();
        }

        /**
         * Função que consulta o service de Notas e atualiza a lista de notas
         * @memberof PalestraCtrl
         * @function getNotas
         * @private
         */
        function _getNotas() {
            noteService.getByPalestra($scope.key).then(function(results) {
                $scope.notas = results;
            });
        }

    }
})();
