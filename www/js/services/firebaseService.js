(function(){
    'use strict';

    angular
        .module('jsday')
        .factory('fireService', fireService);

    fireService.$inject = ['$firebaseArray', 'Utils', '$ionicLoading', '$ionicPopup'];

    function fireService ($firebaseArray, Utils, $ionicLoading, $ionicPopup) {

        var db = new Firebase("https://jsday-app.firebaseio.com"); //.orderByChild('event_start').startAt(new Date().getTime());
        var sync = $firebaseArray(db.child('palestras'));

        var _return = {
            getPalestras:   _getPalestras,
            getPalestra:    _getPalestra,
            addPalestra:    _addPalestra,
            updatePalestra: _updatePalestra
        };

        _loading();

        return _return;

        /**
         * Escuta o carregamento inicial do array vindo do Firebase
         * exibindo um ionicLoader
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
         * @return array
         * @private
         */
        function _getPalestras () {
            return sync;
        }

        /**
         * Retorna uma palestra da lista
         * @param _key      Key índice da palestra na lista
         * @returns obj     Objeto representando uma palestra
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
         * @param _palestra     Objeto representando uma palestra
         * @private
         */
        function _addPalestra (_palestra) {
            sync.$add(_palestra);
        }

        /**
         * Atualiza um item do objeto palestra
         * @param _palestra     Objeto representando uma palestra
         * @param _item         Chave do item a ser atualizado
         * @private
         */
        function _updatePalestra (_palestra, _item) {
            db.child('palestras').child(_palestra.$id).child(_item).set(_palestra[_item]);
        }
    }
})();
