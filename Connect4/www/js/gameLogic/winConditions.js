; (function () {
    'use strict';

    var winConditions = function (gameConstants, boardFactory, boardHelpers, arrayHelpers) {
        var board = [];
        var lastPlacedPiece = {};
        var winningPositions = [];
        var indiciesOfWinningPositon = [];

        function updateBoard(lastPlacedPiece_) {
            board = boardFactory.getBoard();
            lastPlacedPiece = lastPlacedPiece_;
        }

        function isThereAWinner(lastPlacedPiece) {
            updateBoard(lastPlacedPiece);
            return isThereAWinnerHorizontally() || isThereAWinnerVertically() || isThereAWinnerDiaganoally();
        }

        function isThereAWinnerHorizontally() {
            var rowNumberToCheck = lastPlacedPiece.x;
            var rowToCheck = board[rowNumberToCheck];

            if (isThereNInARowInThisArray(rowToCheck, lastPlacedPiece.y)) {
                // calculateWinningPostionsHorizontally();
                return true;
            }

            return false;
        }

        // function calculateWinningPostionsHorizontally() {
        //     var row = lastPlacedPiece.x;
        //     var winningPosition = [];
        //     for (var i = 0; i < indiciesOfWinningPositon.length; i++) {
        //         var point = { x: startPoint + indiciesOfWinningPositon[i], y: row };
        //         winningPosition.push(point)
        //     }

        //     winningPositions.push(winningPosition);
        // }

        function isThereAWinnerVertically() {
            var columnNumberToCheck = lastPlacedPiece.y;
            var columnToCheck = boardHelpers.getNthColumn(board, columnNumberToCheck);

            if (isThereNInARowInThisArray(columnToCheck, lastPlacedPiece.x)) {
                // calculateWinningPositionsVertically();
                return true;
            }

            return false;
        }

        // function calculateWinningPositionsVertically() {
        //     var column = lastPlacedPiece.y;
        //     var winningPosition = [];
        //     for (var i = 0; i < indiciesOfWinningPositon.length; i++) {
        //         var point = { x: column, y: startPoint + indiciesOfWinningPositon[i] };
        //         winningPosition.push(point);
        //     }

        //     winningPositions.push(winningPosition);
        //     // console.log(winningPositions);
        // }

        function isThereAWinnerDiaganoally() {
            var pointToCheck = { x: lastPlacedPiece.x, y: lastPlacedPiece.y };

            var winnerDiagonal = isThereAWinnerTopLeftToBottomRight(pointToCheck);
            if (winnerDiagonal) {
                // calculateWinningDiaganoally();
            }

            if (isThereAWinnerTopRightToBottomLeft(pointToCheck)) {
                // calculateWinningDiaganoally();
                winnerDiagonal = true;
            }

            return winnerDiagonal;
        }

        // function calculateWinningDiaganoally() {
        //     // console.log(indiciesOfWinningPositon);
        //     // console.log(startPoint);
        //     // console.log(endPoint);
        //     // console.log(lastPlacedPiece);
        //     var winningPosition = [];
        //     var startY = lastPlacedPiece.y + (lastPlacedPiece.x - startPoint);
        //     for (var i = 0; i < indiciesOfWinningPositon.length; i++) {
        //         var index = indiciesOfWinningPositon[i];
        //         var point = { x: startPoint + index, y: startY - index };
        //         winningPosition.push(point);
        //     }

        //     winningPositions.push(winningPosition);
        //     // console.log(winningPositions);
        // }

        function isThereAWinnerTopLeftToBottomRight(pointToCheck) {
            var diagonal = boardHelpers.getDiaganolTopLeftToBottomRight(board, pointToCheck);

            return isThereNInARowInThisArray(diagonal, lastPlacedPiece.x);
        }

        function isThereAWinnerTopRightToBottomLeft(pointToCheck) {
            var diagonal = boardHelpers.getDiaganolTopRightToBottomLeft(board, pointToCheck);

            return isThereNInARowInThisArray(diagonal, lastPlacedPiece.x);
        }

        function isThereNInARowInThisArray(arrayToCheck, lastPlacedPiecePosition) {
            var countOfPiecesInArray = _.countBy(arrayToCheck)[lastPlacedPiece.piece] || 0;
            if (countOfPiecesInArray < gameConstants.NUMBER_TO_CONNECT_TO_WIN) {
                return false;
            }

            indiciesOfWinningPositon = boardHelpers.getIndiciesIfNInARow(arrayToCheck, gameConstants.NUMBER_TO_CONNECT_TO_WIN, lastPlacedPiece.piece);

            return indiciesOfWinningPositon.length === gameConstants.NUMBER_TO_CONNECT_TO_WIN;
        }

        function getWinningPositions() {
            return winningPositions;
        }

        return {
            isThereAWinner: isThereAWinner,
            getWinningPositions: getWinningPositions
        }
    }

    angular.module("connect4")
        .factory("winConditions", winConditions)
        ;
})();