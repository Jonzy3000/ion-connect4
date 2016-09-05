(function () {
    "use strict";

    var constants =  {
        "EMPTY_TILE" : ".",
        "NUMBER_OF_ROWS" : 6,
        "NUMBER_OF_COLUMNS" : 7,
        "PIECE_1" : "X",
        "PIECE_2" : "O",
        "NUMBER_TO_CONNECT_TO_WIN" : 4
    }

    angular.module("connect4")
        .constant("gameConstants", constants)
        ;
})();