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
            console.log(lastPlacedPiece);
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

        function reduceTheArrayWithinWinningBounds(arrayToCheck, lastPlacedPiecePosition) {
            var startPoint = Math.max(0, lastPlacedPiecePosition - gameConstants.NUMBER_TO_CONNECT_TO_WIN)
            var endPoint = Math.min(arrayToCheck.length, lastPlacedPiecePosition + gameConstants.NUMBER_TO_CONNECT_TO_WIN);

            return arrayToCheck.slice(startPoint, endPoint);
        }

        function isThereNInARowInThisArray(arrayToCheck, lastPlacedPiecePosition) {
            var reducedArray = reduceTheArrayWithinWinningBounds(arrayToCheck, lastPlacedPiecePosition);

            var countOfPiecesInArray = _.countBy(reducedArray)[lastPlacedPiece.piece] || 0;
            if (countOfPiecesInArray < gameConstants.NUMBER_TO_CONNECT_TO_WIN) {
                return false;
            }

            return isThereNInARowInReducedArray(reducedArray);
        }

        function isThereNInARowInReducedArray(reducedArray) {
            var foundMatchingPiece = false;
            var nInARow = 0;
            for (var i = 0, len = reducedArray.length; i < len; i++) {
                if (reducedArray[i] === lastPlacedPiece.piece) {
                    foundMatchingPiece = true;
                    nInARow++;
                } else if (foundMatchingPiece) {
                    nInARow = 0;
                    foundMatchingPiece = 0;
                }

                if (nInARow === gameConstants.NUMBER_TO_CONNECT_TO_WIN) {
                    return true;
                }
            }

            return false;
        }

        return {
            isThereAWinner: isThereAWinner
        }
    }

    angular.module("connect4")
        .factory("winConditions", winConditions)
        ;
})();