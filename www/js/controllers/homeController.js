(function () {
    "use strict";

    angular
        .module('jsday')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', 'fireService', 'Utils'];

    function HomeCtrl($scope, fireService, Utils) {
        //fireService.setTestePalestra();
        $scope.palestras = fireService.getPalestras();

        $scope.parseDateToStr = function (_data) {
            return Utils.parseShortDateToStr(_data);
        };
    }
})();
