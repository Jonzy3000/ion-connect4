(function () {
    "use strict";

    var tieConditions = function (boardFactory, gameConstants) {
        var board = [];
        function updateBoard() {
            board = boardFactory.getBoard();
        }

        function isThereATie() {
            //could make this 0(1) just by checking the size of turn handler turnHistory
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