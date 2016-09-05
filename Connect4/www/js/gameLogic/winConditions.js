; (function () {
    'use strict';

    var winConditions = function (gameConstants, boardFactory, boardHelpers, arrayHelpers) {
        let board = [];
        let lastPlacedPiece = {};
        function updateBoard(lastPlacedPiece_) {
            board = boardFactory.getBoard();
            lastPlacedPiece = lastPlacedPiece_;
        }

        function isThereAWinner(lastPlacedPiece) {
            updateBoard(lastPlacedPiece);
            return isThereAWinnerHorizontally() || isThereAWinnerVertically() || isThereAWinnerDiaganoally();
        }

        function isThereAWinnerHorizontally() {
            let rowNumberToCheck = lastPlacedPiece.x;
            let rowToCheck = board[rowNumberToCheck];

            return isThereNInARowInThisArray(rowToCheck, lastPlacedPiece.y);
        }

        function isThereAWinnerVertically() {
            let columnNumberToCheck = lastPlacedPiece.y;
            let columnToCheck = boardHelpers.getNthColumn(board, columnNumberToCheck);

            return isThereNInARowInThisArray(columnToCheck, lastPlacedPiece.x);
        }

        function isThereAWinnerDiaganoally() {
            let pointToCheck = { x: lastPlacedPiece.x, y: lastPlacedPiece.y };

            return isThereAWinnerTopLeftToBottomRight(pointToCheck) || isThereAWinnerTopRightToBottomLeft(pointToCheck);
        }

        function isThereAWinnerTopLeftToBottomRight(pointToCheck) {
            let diagonal = boardHelpers.getDiaganolTopLeftToBottomRight(board, pointToCheck);

            return isThereNInARowInThisArray(diagonal, lastPlacedPiece.x);
        }

        function isThereAWinnerTopRightToBottomLeft(pointToCheck) {
            let diagonal = boardHelpers.getDiaganolTopRightToBottomLeft(board, pointToCheck);

            return isThereNInARowInThisArray(diagonal, lastPlacedPiece.x);
        }

        function isThereNInARowInThisArray(arrayToCheck, lastPlacedPiecePosition) {
            var startPoint = Math.max(0, lastPlacedPiecePosition - gameConstants.NUMBER_TO_CONNECT_TO_WIN)
            var endPoint = Math.min(arrayToCheck.length, lastPlacedPiecePosition + gameConstants.NUMBER_TO_CONNECT_TO_WIN);

            var reducedArray = arrayToCheck.slice(startPoint, endPoint);

            var firstItemIsNotEmpty = reducedArray[0] !== gameConstants.EMPTY_TILE;
            var correctLength = reducedArray.length === gameConstants.NUMBER_TO_CONNECT_TO_WIN;

            return firstItemIsNotEmpty &&
                correctLength &&
                arrayHelpers.allItemsAreTheSame(reducedArray);

        }

        return {
            isThereAWinner: isThereAWinner
        }
    }

    angular.module("connect4")
        .factory("winConditions", winConditions)
        ;
})();