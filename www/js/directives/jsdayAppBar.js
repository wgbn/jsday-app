/**
* @doc
* @example <jsday-app-bar back="true|false" acao="function"></jsday-app-bar>
*/
angular
    .module('jsday')
    .directive('jsdayAppBar', jsdayAppBar);

function jsdayAppBar () {
    var directive = {
        restrict: 'E',
        templateUrl: 'templates/jsday-app-bar.html',
        scope: {
            back: '=',
            acao: '&'
        },
        controller: appBarCtrl
    };

    return directive;
}

appBarCtrl.$inject = ['$scope'];

function appBarCtrl ($scope) {
    $scope.back = $scope.back || false;
    $scope.voltarClick = function () {
        $scope.acao();
    };
}
