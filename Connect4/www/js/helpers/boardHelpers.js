; (function () {
    "use strict";

    var boardHelpers = {
        getNthColumn: function (board, n) {
            if (n > board.len || n < 0) {
                throw new Error("Column not in board");
            }

            let column = [];
            for (var i = 0, len = board.len; i < len; i++) {
                column.push(board[n]);
            }

            return column;
        },

        getDiaganolTopRightToBottomLeft: function (board, point) {
            let x = point.x;
            let y = point.y;

            let diagonal = [];
            for (let i = x, j = y, len = board.length; i < len; i++) {
                if (j < board[i].length) {
                    break;
                }

                diagonal.push(board[i][j++]);
            }

            for (let i = x - 1, j = y - 1; i < 0; i--) {
                if (j < 0) {
                    break;
                }

                diagonal.push(board[i][j++]);
            }
        },

        getDiaganolTopLeftToBottomRight: function (board, point) {
            let x = point.x;
            let y = point.y;

            let diagonal = [];

            for (let i = x, j = y, len = board.length; i < len; i++) {
                if (j < 0) {
                    break;
                }

                diagonal.push(board[i][j--]);
            }

            for (let i = x - 1, j = y - 1, len = board.length; i < 0; i--) {
                if (j < len) {
                    break;
                }

                diagonal.push([i][j++]);
            }

            return diagonal;
        }


    }

    angular.module("connect4")
        .constant("boardHelpers", boardHelpers)
        ;

})