(function () {
    "use-strict";

    var boardLogic = function (gameConstants, boardHelpers) {
        let board = createBoard(gameConstants.NUMBER_OF_ROWS, gameConstants.NUMBER_OF_COLUMNS);
        lastPiecePlaced = {};

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

        function updateLastPlacedPiece(point, piece) {
            lastPiecePlaced.x = point.x;
            lastPiecePlaced.y = point.y;
            lastPiecePlaced.piece = piece;
        }

        var dropPieceInBoard = function (column, piece) {
            for (var i = board.length - 1; i >= 0 ; i--) {
                if (board[i][column] === gameConstants.EMPTY_TILE) {
                    board[i][column] = piece;

                    var pointUpdated = { x: i, y: column };
                    updateLastPlacedPiece(pointUpdated, piece);

                    return true;
                }
            }

            return false;
        }

        return {
            getBoard: getBoard,
            dropPieceInBoard: dropPieceInBoard,
            getLastPiecePlaced: getLastPiecePlaced
        }

    }

    angular.module("connect4")
        .factory("boardFactory", boardLogic);
})();