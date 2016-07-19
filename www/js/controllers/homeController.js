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

    HomeCtrl.$inject = ['$scope', '$ionicSideMenuDelegate', 'fireService', 'Utils'];

    /**
     * @memberof jsday
     * @ngdoc controller
     * @name HomeCtrl
     * @param $scope {service}          Controller scope
     * @param fireService {factory}     Firebase service
     * @param Utils {factory}           Funções utilitárias
     */
    function HomeCtrl($scope, $ionicSideMenuDelegate, fireService, Utils) {
        // bindings
        $scope.parseDateToStr = _parseDateToStr;

        // ações
        $scope.abreMenuClick = _abreMenuClick;

        // init
        _carregaPalestras();

        ///////////////////////

        /**
         * Função que converte uma data
         * Esta função chama o factory Utils para formatar e converter uma data no formato timestamp para que possa
         * ser lida por humanos.
         *
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

        /**
         * Função que a gre o menu lateral
         * @memberof HomeCtrl
         * @function _abreMenuClick
         */
        function _abreMenuClick () {
            $ionicSideMenuDelegate.toggleLeft();
        }
    }
})();
