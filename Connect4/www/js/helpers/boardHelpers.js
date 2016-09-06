; (function () {
    "use strict";


    var getIndiciesIfNInARow = function (array, numberToWin, pieceToCheck) {
        var foundMatchingPiece = false;
        var nInARow = 0;
        var indicies = [];
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i] === pieceToCheck) {
                foundMatchingPiece = true;
                nInARow++;
                indicies.push(i);
            } else if (foundMatchingPiece) {
                nInARow = 0;
                foundMatchingPiece = 0;
                indicies = [];
            }

            if (nInARow === numberToWin) {
                return indicies;
            }
        }

        return [];
    }

    var boardHelpers = {
        "getNthColumn": function (board, n) {
            if (n > board[0].length || n < 0) {
                throw new Error("Column not in board");
            }

            var column = [];
            for (var i = 0, len = board.length; i < len; i++) {
                column.push(board[i][n]);
            }

            return column;
        },

        "getDiaganolTopRightToBottomLeft": function (board, point) {
            var x = point.x;
            var y = point.y;

            var diagonal = [];
            for (var i = x, j = y, len = board.length; i < len; i++) {
                if (j >= board[i].length) {
                    break;
                }

                diagonal.push(board[i][j++]);
            }

            for (var i = x - 1, j = y - 1; i > 0; i--) {
                if (j < 0) {
                    break;
                }

                diagonal.push(board[i][j++]);
            }

            return diagonal;
        },

        "getDiaganolTopLeftToBottomRight": function (board, point) {
            var x = point.x;
            var y = point.y;

            var diagonal = [];

            for (var i = x, j = y, len = board.length; i < len; i++) {
                if (j < 0) {
                    break;
                }

                diagonal.push(board[i][j--]);
            }

            for (var i = x - 1, j = y - 1, len = board.length; i > 0; i--) {
                if (j >= len) {
                    break;
                }

                diagonal.push([i][j++]);
            }

            return diagonal;
        },
        "printBoard": function (board) {
            for (var i = 0; i < board.length; i++) {
                var row = "";
                for (var j = 0; j < board[i].length; j++) {
                    row += board[i][j] + ' ';
                }
                console.log(row);
            }
        },
        "getIndiciesIfNInARow": getIndiciesIfNInARow,
        "isThereNInARow": function (reducedArray, numberToWin, pieceToCheck) {
            return getIndiciesIfNInARow(reducedArray, numberToWin, reducedArray).length === numberToWin;
        }
    }

    angular.module("connect4")
        .constant("boardHelpers", boardHelpers)
        ;

})();