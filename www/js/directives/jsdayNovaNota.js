/**
* @doc
* @example <jsday-nova-nota palestra="stringKey"></jsday-nova-nota>
*/
angular
    .module('jsday')
    .directive('jsdayNovaNota', jsdayNovaNota);

function jsdayNovaNota () {
    var directive = {
        restrict: 'E',
        templateUrl: 'templates/jsday-nova-nota.html',
        scope: {
            palestra: '='
        },
        controller: ctrlNovaNota
    };

    return directive;
}

ctrlNovaNota.$inject = ['$scope', '$rootScope', 'noteService'];

function ctrlNovaNota ($scope, $rootScope, noteService) {
    $scope.texto = "";
    $scope.salvarClick = function () {
        noteService.add($scope.palestra, $scope.texto)
            .then(function () {
                $rootScope.$broadcast('notaAdded', {palestra: $scope.palestra});
                $scope.texto = "";
            });
    };
}
