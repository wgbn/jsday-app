(function () {
    "use strict";

    /**
     * @description Controller Home
     * @author Walter Gandarella <walter.wgbn@gmail.com>
     * @memberof jsday
     * @version 1.0.0
     */
    angular
        .module('jsday')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', 'fireService', 'Utils'];

    /**
     * @memberof jsday
     * @ngdoc controller
     * @name HomeCtrl
     * @param $scope {service}          Controller scope
     * @param fireService {factory}     Firebase service
     * @param Utils {factory}           Funções utilitárias
     */
    function HomeCtrl($scope, fireService, Utils) {
        $scope.parseDateToStr = _parseDateToStr;

        _carregaPalestras();

        ///////////////////////

        /**
         * Função que converte uma data
         * @memberof HomeCtrl
         * @function _parseDateToStr
         * @param {Number} _data        Timestamp da data a ser resolvida
         * @returns {String}            Data parseada
         * @private
         */
        function _parseDateToStr (_data) {
            return Utils.parseShortDateToStr(_data);
        }

        /**
         * Função que carrega a lista de palestras a partir do service Firebase
         * @memberof HomeCtrl
         * @function _carregaPalestras
         * @returns {Promise}           Promise da lista de palestras
         */
        function _carregaPalestras () {
            $scope.palestras = fireService.getPalestras();
        }
    }
})();
