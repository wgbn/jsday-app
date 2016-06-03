(function(){
    'use strict';

    /**
     * @description Biblioteca de funções utilitárias
     * @author Walter Gandarella <walter.wgbn@gmail.com>
     * @memberof jsday
     * @version 1.0.0
     */
    angular
        .module('jsday')
        .factory('Utils', Utils);

    /**
     * @memberof jsday
     * @ngdoc factory
     * @name Utils
     * @description
     *   Provê funções utilitárias para uso da aplicação
     */
    function Utils () {
        var _return = {
            parseStrToDate:         _parseStrToDate,
            parseDateToStr:         _parseDateToStr,
            parseTimeToStr:         _parseTimeToStr,
            parseShortDateToStr:    _parseShortDateToStr,
            setLocalStorage:        _setLocalStorage,
            getLocalStorage:        _getLocalStorage
        };

        return _return;

        /**
         * Transforma uma string formatada como dd/mm/yyyy para um objeto Date
         * @memberof Utils
         * @function _parseStrToDate
         * @param {String} _date        Data no formato dd/mm/yyyy
         * @param {Boolean} _time       Booleano se deve ser considerado a hora
         * @returns {number}            Timestamp da data
         * @private
         */
        function _parseStrToDate (_date, _time) {
            _time = _time || false;
            var _date = _date.split(' ');
            var result = new Date(
                _date[0].split('/')[2],
                parseInt(_date[0].split('/')[1]) - 1,
                _date[0].split('/')[0],
                _time ? _date[1].split(':')[0] : 0,
                _time ? _date[1].split(':')[1] : 0,
                0,
                0
            );
            return result.getTime();
        }

        /**
         * Transforma um timestamp para data no formato dd/mm/yyyy [hh:mm]
         * @memberof Utils
         * @function _parseDateToStr
         * @param {Number} _date        Timestamp da data
         * @param {Boolean} _time       Booleano se deve ser considerado a hora
         * @returns {string}            A data no formato dd/mm/yyyy [hh:mm]
         * @private
         */
        function _parseDateToStr (_date, _time){
            _time = _time || false;
            var result = new Date(_date);
            return (result.getDate() < 10 ? "0"+result.getDate() : result.getDate())
                +"/"
                +(result.getMonth()+1 < 10 ? "0"+(result.getMonth()+1) : result.getMonth()+1)
                +"/"+result.getFullYear().toString()
                +(_time ? " "+result.getHours().toString()
                +":"
                +result.getMinutes().toString() : "");
        }

        /**
         * Transforma um timestamp em hora no formato hh:mm
         * @memberof Utils
         * @function _parseTimeToStr
         * @param {Number} _date        Timestamp da data
         * @returns {string}            A hora no formato hh:mm
         * @private
         */
        function _parseTimeToStr (_date) {
            var result = new Date(_date);
            return (result.getHours() < 10 ? '0' + result.getHours() : result.getHours())
                +":"
                +(result.getMinutes() < 10 ? '0' + result.getMinutes() : result.getMinutes());
        }

        /**
         * Transforma um timestamp numa data curta no formato dd/mm
         * @memberof Utils
         * @function _parseShortDateToStr
         * @param {Number} _date        Timestamp da data
         * @returns {string}            A data no formato dd/mm
         * @private
         */
        function _parseShortDateToStr (_date){
            var result = new Date(_date);
            return (result.getDate() < 10 ? "0"+result.getDate() : result.getDate())
                +"/"
                +(result.getMonth()+1 < 10 ? "0"+(result.getMonth()+1) : result.getMonth()+1);
        }

        /**
         * Salva um item no localStorage do dispositivo
         * @memberof Utils
         * @function _setLocalStorage
         * @param {String} _item     Chave de identificação do item no localStorage
         * @param {Object} _valor    Valor do item
         * @private
         */
        function _setLocalStorage (_item, _valor) {
            localStorage.setItem(_item, JSON.stringify(_valor));
        }

        /**
         * Resgata um item salvo no localStorage
         * @memberof Utils
         * @function _getLocalStorage
         * @param {String} _item     Chave de identificação do item no localStorage
         * @returns {Object}         Item do localStorage
         * @private
         */
        function _getLocalStorage (_item) {
            return JSON.parse(localStorage.getItem(_item));
        }
    }
})();
