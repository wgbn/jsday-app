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
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyBdYNwQollKcyF6hQaJCfsVwKA0_GMi9Yc",
            authDomain: "jsday-app.firebaseapp.com",
            databaseURL: "https://jsday-app.firebaseio.com",
            storageBucket: "jsday-app.appspot.com"
        };
        firebase.initializeApp(config);
        
        var db = firebase.database().ref();
        var sync = $firebaseArray(db.child('palestras'));

        var _return = {
            getPalestras:   _getPalestras,
            getPalestra:    _getPalestra,
            getComentarios: _getComentarios,
            addPalestra:    _addPalestra,
            addComentario:  _addComentario,
            updatePalestra: _updatePalestra
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

        /**
         * Adiciona um comentário à palestra
         * @memberof fireService
         * @function _addComentario
         * @param {Object} _palestra    A palestra a ser adicionada o comentário
         * @param {Object} _comentario  O comentário
         */
        function _addComentario (_palestra, _comentario) {
            var _dt = new Date();

            _comentario.registro = _dt.getTime();
            _palestra.comentarios = _palestra.comentarios || {};
            _palestra.comentarios[_dt.getTime().toString()] = _comentario;

            db.child('palestras').child(_palestra.$id).child("comentarios").child(_dt.getTime().toString()).set(_comentario);
            return _getComentarios(_palestra);
        }

        /**
         * Lista os comentarios de uma palestra
         * @memberof fireService
         * @function _getComentarios
         * @param {Object} palestra
         * @returns {Array} Lista de comentarios
         */
        function _getComentarios (_palestra) {
            if (!_palestra.comentarios)
                return {};

            var res = [];
            Object.keys(_palestra.comentarios).forEach(function(_key){
                res.push(_palestra.comentarios[_key]);
            });
            return res;
        }
    }
})();
