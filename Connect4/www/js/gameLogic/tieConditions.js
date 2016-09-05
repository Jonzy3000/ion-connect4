(function () {
    "use strict";

    var tieConditions = function (boardFactory, gameConstants) {
        let board = [];
        function updateBoard() {
            board = boardFactory.getBoard();
        }

        function isThereATie() {
            updateBoard();
            return board[0].indexOf(".") == -1;
        }

        return {
            isThereATie: isThereATie
        }
    }

    angular.module("connect4")
        .factory("tieConditions", tieConditions)
        ;
})();