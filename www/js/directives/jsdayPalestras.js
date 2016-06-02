/**
* @doc
* @example <jsday-palestras palestra="palestraObject"></jsday-palestras>
*/
angular
    .module('jsday')
    .directive('jsdayPalestras', jsdayPalestras);

function jsdayPalestras () {
    var directive = {
        restrict: 'E',
        templateUrl: 'templates/jsday-palestras.html',
        scope: {
            palestra: '='
        },
        controller: ctrlPalestras
    };

    return directive;
}

ctrlPalestras.$inject = ['$scope', '$state', 'Utils'];

function ctrlPalestras ($scope, $state, Utils) {
    $scope.palestra.hora = Utils.parseTimeToStr($scope.palestra.hora);

    $scope.palestraClick = function () {
        if (!$scope.palestra.servico)
            $state.go('palestra', {key: $scope.palestra.$id});
    };
}
