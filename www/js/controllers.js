angular.module('jsday')

    .controller('MainCtrl',
        ['$scope', 'fireService', 'Utils',
            function ($scope, fireService, Utils) {

            }
        ]
    )

    .controller('HomeCtrl',
        ['$scope', 'fireService', 'Utils',
            function ($scope, fireService, Utils) {
                //fireService.setTestePalestra();
                $scope.palestras = fireService.getPalestras();

                $scope.parseDateToStr = function (_data) {
                    return Utils.parseShortDateToStr(_data);
                };
            }
        ]
    )

    .controller('PalestraCtrl',
        ['$scope', '$state', '$stateParams', 'fireService', 'Utils',
            function ($scope, $state, $stateParams, fireService, Utils) {
                console.log($stateParams.key);
                $scope.btnVoltar = function(){
                    $state.go('home');
                };
            }
        ]
    )

;
