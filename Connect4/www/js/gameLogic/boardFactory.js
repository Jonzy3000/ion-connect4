(function () {
    "use-strict";

    var boardLogic = function (gameConstants, boardHelpers) {
        var board = createBoard(gameConstants.NUMBER_OF_ROWS, gameConstants.NUMBER_OF_COLUMNS);
        lastPiecePlaced = {};

        function createBoard(numberOfRows, numberOfColumns) {
            var board = new Array(numberOfRows);

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

        function isEmptyTile(x, y) {
            return board[x][y] === gameConstants.EMPTY_TILE;
        }

        var dropPieceInBoard = function (column, piece) {
            for (var i = board.length - 1; i >= 0; i--) {
                if (isEmptyTile(i, column)) {
                    board[i][column] = piece;

                    var pointUpdated = { x: i, y: column };
                    updateLastPlacedPiece(pointUpdated, piece);

                    return pointUpdated;
                }
            }

            throw new Error("invalid move");
        }

        var removeItemFromBoard = function (lastEntry) {
            board[lastEntry.x][lastEntry.y] = gameConstants.EMPTY_TILE;
        }

        return {
            getBoard: getBoard,
            dropPieceInBoard: dropPieceInBoard,
            getLastPiecePlaced: getLastPiecePlaced,
            removeItemFromBoard: removeItemFromBoard,
            _setBoard: function(b) {
                board = b;
            }
        }

    }

    angular.module("connect4")
        .factory("boardFactory", boardLogic);
})();