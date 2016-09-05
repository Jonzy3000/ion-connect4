(function () {
    "use-strict";

    var boardLogic = function (gameConstants, boardHelpers) {
        let board = createBoard(gameConstants.NUMBER_OF_ROWS, gameConstants.NUMBER_OF_COLUMNS);

        board[0][1] = gameConstants.PIECE_1;
        board[1][2] = gameConstants.PIECE_1;
        board[2][3] = gameConstants.PIECE_1;
        board[3][4] = gameConstants.PIECE_1;

        boardHelpers.printBoard(board);

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

        var getLastPiecePlaced = function () {
            return lastPiecePlaced;
        }

        return {
            getBoard: getBoard
        }

    }

    angular.module("connect4")
        .factory("boardFactory", boardLogic);
})();