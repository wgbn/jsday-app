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
                //fireService.setTeste();
                $scope.dias = fireService.getDias();

                $scope.parseDateToStr = function (_data) {
                    return Utils.parseShortDateToStr(_data);
                };
            }
        ]
    )

    .controller('PalestraCtrl',
        ['$scope', 'fireService', 'Utils',
            function ($scope, fireService, Utils) {
                $scope.btnVoltar = function(){
                    alert('voltar');
                };
            }
        ]
    )

;
