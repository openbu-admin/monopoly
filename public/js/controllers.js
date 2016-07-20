angular.module('app.controllers', [])
.controller('welcomeToMonopolyCtrl', ['$scope', '$http', 'LoginPlayer' , '$state', function($scope, $http, LoginPlayer, $state) {

        $scope.data = {};
        $scope.data.auth = true;
        $scope.data.error = true;
        $scope.click = function (login) {
            $http.post('/api/player/login/' + login).then(function (data) {
                $scope.data.error = true;
                if (LoginPlayer.getPlayer() != false){
                    $state.go('tabsController.welcomeMari');
                    $scope.data.error = true;
                } else {
                    if (data.data.Player[0] == null){
                        console.log('Error: Login');
                        $scope.data.error = false;
                    } else {
                    console.log(data.data.Player[0]);
                    LoginPlayer.addPlayer(data.data.Player[0]._id);
                        $scope.data.auth = false;
                    $state.go('tabsController.welcomeMari');
                        $scope.data.error = true;
                    }

                }
            }, function () {
                console.log("Service don't anavaible");
            });
        }

}])
   
.controller('bankCtrl',['$scope', '$state', function($scope, $state) {
    $scope.data = {};
    $scope.data.auth = true; // Локальная авторазация
    $scope.data.error = true; // Ошибка логирования tabsController.bank2

    $scope.login = function (login, password) {
        if ((login == 'Anfisa') && (password == '38393839')){
            $scope.data.auth = false;
            $scope.data.error = true;
            $state.go('tabsController.bank2');
        } else {
            $scope.data.error = false;
        }
    }


}])
   
.controller('ratingCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('/api/player').then(function (data) {
        //$scope.data = data.data;
    }, function () {
        console.log('Bad get player');
    });
    $scope.loadPlayer = function () {
        $http.get('/api/player').then(function (data) {
            $scope.data = data.data;
            //console.log($scope.data);
        }, function () {
            console.log('Bad get player');
        });
    }
}])
      
.controller('aboutCtrl', function($scope) {

})
   
.controller('welcomeMariCtrl', ['$scope', '$http', 'LoginPlayer' , function($scope, $http, LoginPlayer) {
        $scope.data = {};
        $scope.sum = null;
        id = LoginPlayer.getPlayer();
        console.log(id);
        $http.post('/api/player/' + id).then(function (data) {
        $scope.player = data.data.player;
            }, function () {
        console.log('Bad get player!');
        });

    $http.get('/api/player').then(function (data) {
            $scope.data = data.data;
            $scope.data.sum = null;
            $scope.data.err = true;

        }, function () {
            console.log('Bad get player');
        });

    $scope.trans = function (player_data) {
        $scope.nameToTransfer = player_data.name;
        $scope.idToTransfer = player_data._id;
        $scope.playerToTransfer = player_data;
    };
    // Тут изменяет сразу два
    $scope.increaseToTransfer = function (increase, idFromTransfer , idToTransfer) {
        $scope.data.err = true;
        if ($scope.playerToTransfer) {
            var sumBeforeThird = $scope.playerToTransfer.deposit;
            $scope.playerToTransfer.deposit = sumBeforeThird + parseInt(increase);
            console.log($scope.playerToTransfer);
            $http.put('/api/player/' + idToTransfer, $scope.playerToTransfer).then(function () {
                console.log('Change is +ok!');

                $scope.data.err = true;
            }, function () {
                console.log('Bad get player');
            });
            var sumBeforeFirst = $scope.player.deposit;
            $scope.player.deposit = sumBeforeFirst - parseInt(increase);
            $http.put('/api/player/' + idFromTransfer, $scope.player).then(function () {
                console.log('Change is +ok!');
                $scope.data.err = true;
            }, function () {
                console.log('Bad get player');
            });
        } else {
            console.log('User not selected');
            $scope.data.sum = null;
            $scope.data.err = false;



        }

        $scope.update = function () {
            $http.post('/api/player/' + id).then(function (data) {
                $scope.player = data.data.player;
            }, function () {
                console.log('Bad get player!');
            });
            $http.get('/api/player').then(function (data) {
                $scope.data = data.data;
                $scope.data.sum = null;
                $scope.data.err = true;
                console.log('Update!');
            }, function () {
                console.log('Bad get player');
            });
        }




}}])
   
.controller('bank2Ctrl',['$scope', '$http', function($scope, $http) {
    $scope.player = {};

    $http.get('/api/player').then(function (data) {
        console.log($scope.player);
        $scope.data = data.data;
        $scope.data.sum = null;
        $scope.data.err = true;
        console.log($scope.data);
    }, function () {
        console.log('Bad get player');
    });
    $scope.loadPlayer = function () {
        $http.get('/api/player').then(function (data) {
            console.log($scope.player);
            $scope.data = data.data;
            $scope.data.sum = null;
            $scope.data.err = true;
            console.log($scope.data);
        }, function () {
            console.log('Bad get player');
        });
    };
    $scope.trans = function (player_data) {
        $scope.nameToTransfer = player_data.name;
        $scope.idToTransfer = player_data._id;
        $scope.playerToTransfer = player_data;
    };
    $scope.increaseToTransfer = function (increase, idToTransfer) {
        if ($scope.playerToTransfer) {
            var sumBefore = $scope.playerToTransfer.deposit;
            $scope.playerToTransfer.deposit = sumBefore + parseInt(increase);
            console.log($scope.playerToTransfer);
            $http.put('/api/player/' + idToTransfer, $scope.playerToTransfer).then(function () {
                console.log('Change is +ok!');
                $scope.data.sum = null;
                $scope.data.err = true;
            }, function () {
                console.log('Bad get player');
            });} else {
                console.log('User not selected');
                $scope.data.sum = null;
                $scope.data.err = false;

        }

    };
    $scope.decreaseToTransfer = function (decrease, idToTransfer) {
        if ($scope.playerToTransfer){
            var sumBefore = $scope.playerToTransfer.deposit;
            $scope.playerToTransfer.deposit = sumBefore - parseInt(decrease);
            console.log($scope.playerToTransfer);
            $http.put('/api/player/' + idToTransfer, $scope.playerToTransfer).then(function () {
                console.log('Change is -ok!');
                $scope.data.sum = null;
                $scope.data.err = true;
            }, function () {
                console.log('Bad get player');
            });
        } else {
            console.log('User not selected');
            $scope.data.sum = null;
            $scope.data.err = false;
        }



    };

}])
   
.controller('bankNewPlayersCtrl',['$scope', '$http', function($scope, $http) {
    $scope.player = {};
        $http.get('/api/player').then(function (data) {
        $scope.data = data.data;
        console.log($scope.data);
    }, function () {
        console.log('Bad');
    });
    $scope.addNewPlayers = function () {
        $http.post('/api/player/create', $scope.player).then(function () {

            $http.get('/api/player').then(function (data) {
                console.log($scope.player);
                $scope.data = data.data;
                $scope.player = {};
            }, function () {
                console.log('Bad');
            });

        }, function () {
            console.log('Bad');
        });}

    $scope.deletePlayer = function (id) {
        $http.post('/api/player/delete/' +  id).then(function () {
            console.log('Player with id ' + id + ' delete');
            $http.get('/api/player').then(function (data) {
                console.log($scope.player);
                $scope.data = data.data;
                $scope.player = {};
            }, function () {
                console.log('Bad');
            });

        }, function () {
            console.log('Player with id ' + id + ' not delete!');
        });
    }

}]);
 