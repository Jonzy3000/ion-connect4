(function () {
    "use-strict";

    var boardLogic = function (gameConstants) {
        let board = createBoard(gameConstants.NUMBER_OF_ROWS, gameConstants.NUMBER_OF_COLUMNS);
        console.log(board);

        function createBoard(numberOfRows, numberOfColumns) {
            let board = new Array(numberOfRows);

            for (var i = 0; i < numberOfRows; i++) {
                board[i] = createEmptyRow(numberOfColumns);
            }

            return board;
        }

        function createEmptyRow(numberOfColumns) {
            return Array.apply(null, Array(numberOfColumns)).map(String.prototype.valueOf, gameConstants.EMPTY_TILE);
        }

        var getBoard = function () {
            return board;
        }

        return {
            getBoard: getBoard
        }

    }

    angular.module("connect4")
        .factory("boardFactory", boardLogic);
})();