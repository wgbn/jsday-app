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
;
