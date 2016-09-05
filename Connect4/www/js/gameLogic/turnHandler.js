(function () {
    "use-strict"

    var turnHandler = function (playerConstant, gameConstants, winConditions, tieConditions, boardFactory) {
        let player1 = {
            player: 1,
            isAi: false
        };

        let player2 = {
            player: 2,
            isAi: false
        }

        let whoseGoIsIt = player1;
        let gameOver = false;

        function nextPlayersGo() {
            if (whoseGoIsIt.player === 1) {
                whoseGoIsIt = player2;
            } else if (whoseGoIsIt.player === 2) {
                whoseGoIsIt = player1;
            }
        }

        function getPieceFromPlayer(player) {
            return player === 1 ? gameConstants.PIECE_1 : gameConstants.PIECE_2;
        }

        function endTurn() {
            if (winConditions.isThereAWinner(boardFactory.getLastPiecePlaced())) {
                // dealWithPlayerWinning();
                console.log("WE HAVE A WINNER");
                gameOver = true;
            }
            else if (tieConditions.isThereATie()) {
                dealWithATie();
                gameOver = true;
            } else {
                nextPlayersGo();
            }
        }

        function makeTurn(columnOfChoice) {
            if (gameOver) {
                return;
            }
            let validMove = boardFactory.dropPieceInBoard(columnOfChoice, getPieceFromPlayer(whoseGoIsIt.player));

            if (validMove) {
                endTurn();
            }
        }

        return {
            makeTurn: makeTurn
        }
    }

    angular.module("connect4")
        .factory("turnHandler", turnHandler);
})();