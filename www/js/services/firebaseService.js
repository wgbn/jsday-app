(function(){
    'use strict';

    /**
     * @description Serviçoa de abstração do Firebase
     * @author Walter Gandarella <walter.wgbn@gmail.com>
     * @memberof jsday
     * @version 1.0.0
     */
    angular
        .module('jsday')
        .factory('fireService', fireService);

    fireService.$inject = ['$firebaseArray', 'Utils', '$ionicLoading', '$ionicPopup'];

    /**
     * @memberof jsday
     * @ngdoc factory
     * @name fireService
     * @param {provider} $firebaseArray Abstração do Firebase Array
     * @param {factory} Utils Conjunto de funções de utilidade
     * @param {provider} $ionicLoading Provider para loader directive
     * @param {provider} $ionicPopup provider para popup directive
     * @description
     *   Manipula os dados e faz o acesso á base do Firebase
     */
    function fireService ($firebaseArray, Utils, $ionicLoading, $ionicPopup) {

        var db = new Firebase("https://jsday-app.firebaseio.com"); //.orderByChild('event_start').startAt(new Date().getTime());
        var sync = $firebaseArray(db.child('palestras'));

        var _return = {
            getPalestras:   _getPalestras,
            getPalestra:    _getPalestra,
            addPalestra:    _addPalestra,
            updatePalestra: _updatePalestra,
            testeObject:    _testeObject
        };

        _loading();

        return _return;

        /**
         * Escuta o carregamento inicial do array vindo do Firebase exibindo um ionicLoader
         * @memberof fireService
         * @function _loading
         * @private
         */
        function _loading () {
            $ionicLoading.show({template: 'Carregando...'});
            sync.$loaded(function (ok) {
                $ionicLoading.hide();
            }, function (erro) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Ops!',
                    template: '<div style="text-align: center;">Não foi possível carregar os dados.<br>Verifique sua conexão.</div>',
                    okType: 'button-energized'
                });
            });
        }

        /**
         * Retorna a lista de palestras vinda do firebase
         * @memberof fireService
         * @function _loading
         * @returns {Array}         Lista de palestras
         * @private
         */
        function _getPalestras () {
            return sync;
        }

        /**
         * Retorna uma palestra da lista
         * @memberof fireService
         * @function _getPalestra
         * @param {String} _key     A key da palestra no array
         * @returns {Object}        A palestra encontrada
         * @private
         */
        function _getPalestra (_key) {
            var result = null;

            sync.forEach(function (_val) {
                if (_val.$id == _key)
                    result = _val;
            });

            return result;
        }

        /**
         * Adiciona um objeto palestra à lista
         * @memberof fireService
         * @function _addPalestra
         * @param {Object} _palestra    Objeto representando uma palestra
         * @private
         */
        function _addPalestra (_palestra) {
            sync.$add(_palestra);
        }

        /**
         * Atualiza um item do objeto palestra
         * @memberof fireService
         * @function _updatePalestra
         * @param {Object} _palestra    Objeto representando uma palestra
         * @param {String} _item        Chave do item a ser atualizado
         * @private
         */
        function _updatePalestra (_palestra, _item) {
            db.child('palestras').child(_palestra.$id).child(_item).set(_palestra[_item]);
        }

        function _testeObject(_obj) {
            console.info(_obj);
        }
    }
})();
