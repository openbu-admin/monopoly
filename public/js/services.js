angular.module('app.services', [])

.factory('LoginPlayer', [function(){

    var player = [];

    var addPlayer = function(newObj) {
        player.push(newObj);
    };

    var getPlayer = function(){
        return player;
    };

    return {
        addPlayer: addPlayer,
        getPlayer: getPlayer
    };
}])

.service('BlankService', [function(){

}]);

