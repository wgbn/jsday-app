(function(){
    'use strict';

    /**
    * @description Factory de teste para criar objetos
    * @author Walter Gandarella <walter.wgbn@gmail.com>
    * @memberof jsday
    * @version 1.0.0
    */
    angular
        .module('jsday')
        .factory('objectsFactory', objectsFactory);

    objectsFactory.$inject = ['fireService'];

    /**
    * @memberof jsday
    * @ngdoc factory
    * @name objectsFactory
    * @param {}
    * @description
    *   Cria objetos do tipo Palestra
    */
    function objectsFactory (fireService) {
        var _return = {
            newAutor:       _newAutor,
            newPalestra:    _newPalestra
        };

        return _return;

        /**
        * Cria uma nova instancia do objeto Palestra
        * @memberof objectsFactory
        * @param {Object} _palestra    Objeto com os valores de criação
        * @returns {Object} Palestra
        * @private
        */
        function _newPalestra (_palestra) {
            return new Palestra();
        }

        /**
        * Cria uma nova instancia do objeto Autor
        * @memberof objectsFactory
        * @param {Object} _autor    Objeto com os valores de criação
        * @returns {Object} Autor
        * @private
        */
        function _newAutor (_autor) {
            return new Autor();
        }
    }

    /**
     * Objeto Palestra
     * @memberof objectsFactory
     * @function Palestra
     * @param {Object} _params  Objeto de criação
     * @returns {Objetct} Palestra
     */
    var Palestra = (function (fireService) {
        function Palestra(_nome, _hora, _autor) {
            this.nome = '';
            this.hora = '';
            this.autor = '';
        }
        Palestra.prototype.toString = function () {
            return this.nome;
        };
        Palestra.prototype.toJsonObject = function () {
            return {
                nome: this.nome,
                hora: this.hora
            };
        };
        Palestra.prototype.save = function () {
            fireService.testeObject(this.toJsonObject());
        };
        return Palestra;
    }(fireService));

    /**
     * Objeto Autor
     * @memberof objectsFactory
     * @function Autor
     * @param {Object} _params  Objeto de criação
     * @returns {Objetct} Autor
     */
    var Autor = (function () {
        function Autor(_nome) {
            this.nome = _nome;
        }
        Autor.prototype.toString = function () {
            return this.nome;
        };
        return Autor;
    }());

})();
