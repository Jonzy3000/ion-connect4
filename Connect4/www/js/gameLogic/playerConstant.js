(function () {
    var playerConstant = {
        "player" : null,
        "isAi" : null
    }

    angular.module("connect4")
        .constant("playerConstant", playerConstant)
})();