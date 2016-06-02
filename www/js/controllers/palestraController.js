(function(){
    "use strict";

    angular
        .module('jsday')
        .controller('PalestraCtrl', PalestraCtrl);

    PalestraCtrl.$inject = ['$scope', '$state', '$stateParams', 'fireService', 'Utils', 'ionicToast', 'noteService'];

    function PalestraCtrl($scope, $state, $stateParams, fireService, Utils, ionicToast, noteService) {

        $scope.key = $stateParams.key;
        $scope.palestra = fireService.getPalestra($stateParams.key);
        $scope.rate = {};
        $scope.rate.avaliacao = Utils.getLocalStorage($stateParams.key) ? Utils.getLocalStorage($stateParams.key) : 0;
        $scope.rate.max = 5;
        $scope.notas = [];

        getNotas();

        $scope.rateClick = function () {
            if (!Utils.getLocalStorage($stateParams.key)) {
                $scope.palestra.avaliacao += $scope.rate.avaliacao;
                fireService.updatePalestra($scope.palestra, 'avaliacao');
                Utils.setLocalStorage($stateParams.key, $scope.rate.avaliacao);
            } else {
                $scope.rate.avaliacao = Utils.getLocalStorage($stateParams.key);
                ionicToast.show('Você já avaliou esta palestra.', 'bottom', false, 2500);
            }
        };

        $scope.btnVoltar = function(){
            $state.go('home');
        };

        $scope.$on('notaAdded', function (e, data) {
            if (data.palestra == $scope.key)
                getNotas();
        });

        function getNotas() {
            noteService.getByPalestra($scope.key).then(function(results) {
                $scope.notas = results;
            });
        }

    }
})();
