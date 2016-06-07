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

    PalestraCtrl.$inject = [
        '$scope',
        '$rootScope',
        '$state',
        '$stateParams',
        '$ionicPopup',
        '$ionicActionSheet',
        'fireService',
        'Utils',
        'ionicToast',
        'noteService'
    ];

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
    function PalestraCtrl($scope, $rootScope, $state, $stateParams, $ionicPopup, $ionicActionSheet, fireService, Utils, ionicToast, noteService) {

        $scope.key = $stateParams.key;
        $scope.palestra = fireService.getPalestra($stateParams.key);
        $scope.rate = {};
        $scope.rate.avaliacao = Utils.getLocalStorage($stateParams.key) ? Utils.getLocalStorage($stateParams.key) : 0;
        $scope.rate.max = 5;
        $scope.notas = [];
        $scope.btnComentario = false;
        $scope.comentario = {};
        $scope.comentarios = fireService.getComentarios($scope.palestra);
        $scope.showSlides = _showSlides();

        $scope.rateClick = _rateClick;
        $scope.btnVoltar = _btnVoltar;
        $scope.addClick = _addClick;
        $scope.onHoldNota = _onHoldNota;
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

        /**
         * Botão que adiciona um comentário à palestra
         * @memberof PalestraCtrl
         * @function _addClick
         */
        function _addClick () {
            var _hoje = new Date();

            if ($scope.palestra.hora <= _hoje.getTime()){

                var comPopup = $ionicPopup.show({
                    template: '<input type="text" ng-model="comentario.nome" placeholder="Seu nome..." class="com-input">' +
                    '<input type="text" ng-model="comentario.email" placeholder="Seu e-mail..." class="com-input">' +
                    '<textarea ng-model="comentario.texto" placeholder="Comentário..." class="com-text"></textarea>',
                    title: 'Faça um comentário',
                    subTitle: 'Deixe aqui sua opinião sobre esta palestra',
                    scope: $scope,
                    buttons: [
                        {
                            text: 'Cancelar'
                        },
                        {
                            text: '<b>OK</b>',
                            type: 'button-energized',
                            onTap: function(e) {
                                if (!$scope.comentario.nome || !$scope.comentario.email || !$scope.comentario.texto) {
                                    e.preventDefault();
                                    ionicToast.show('Preencha todos os espaços.', 'bottom', false, 1500);
                                } else {
                                    $scope.comentarios = fireService.addComentario($scope.palestra, $scope.comentario);
                                    $scope.comentario = {};
                                    return true;
                                }
                            }
                        }
                    ]
                });

                /*comPopup.then(function(res) {
                    $scope.comentarios = fireService.addComentario($scope.palestra, res);
                }, function (err) {
                    console.info('cancel');
                });*/

            } else {
                ionicToast.show('Você só poderá comengar após o início da palestra.', 'bottom', false, 2500);
            }
        }

        /**
         * Ação executada ao segurar em cima de uma nota
         * @memberof PalestraCtrl
         * @function _onHoldNota
         */
        function _onHoldNota (_id) {
            var hideSheet = $ionicActionSheet.show({
                destructiveText: 'Excluir',
                titleText: 'O que deseja fazer?',
                cancelText: 'Cancel',
                cssClass: 'sheets',
                cancel: function() {
                    // add cancel code..
                },
                buttonClicked: function(index) {
                    return true;
                },
                destructiveButtonClicked: function () {
                    noteService.remove(_id)
                        .then(function () {
                            $rootScope.$broadcast('notaAdded', {palestra: $scope.key});
                        });
                    return true;
                }
            });
        }

        /**
         * Verifica se o botão de slides pode ser exibido
         * @memberof PalestraCtrl
         * @function _showSlides
         * @returns {Boolean}
         */
        function _showSlides () {
            var _hoje = new Date();
            return _hoje.getTime() >= $scope.palestra.hora && $scope.palestra.slide;
        }

    }
})();
