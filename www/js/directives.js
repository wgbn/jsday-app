angular.module('jsday')
    .directive('jsdayAppBar', function(){
        return {
            restrict: 'E',
            templateUrl: 'templates/jsday-app-bar.html',
            scope: {
                back: '=',
                acao: '&'
            },
            controller: ['$scope', function($scope){
                $scope.back = $scope.back || false;
                $scope.voltarClick = function () {
                    $scope.acao();
                };
            }]
        };
    })

    .directive('jsdayPalestras', function(){
        return {
            restrict: 'E',
            templateUrl: 'templates/jsday-palestras.html',
            scope: {
                palestra: '='
            },
            controller: ['$scope', '$state', 'Utils', function($scope, $state, Utils){
                $scope.palestra.hora = Utils.parseTimeToStr($scope.palestra.hora);

                $scope.palestraClick = function () {
                    if (!$scope.palestra.servico)
                        $state.go('palestra', {key: $scope.palestra.$id});
                };
            }]
        };
    })
;
