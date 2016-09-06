(function () {
    "use-strict"

    var turnHandler = function (playerConstant, gameConstants, winConditions, tieConditions, boardFactory, gameOver) {
        var turnHistory = [];
        var player1 = {
            player: 1,
            isAi: false
        };

        var player2 = {
            player: 2,
            isAi: false
        }

        var whoseGoIsIt = player1;
        var isGameOver = false;

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
                dealWithPlayerWinning();
                console.log("WE HAVE A WINNER");
                isGameOver = true;
            }
            else if (tieConditions.isThereATie()) {
                dealWithATie();
                isGameOver = true;
            } else {
                nextPlayersGo();
            }
        }

        function tryToDropPieceInBoard(columnOfChoice) {
            try {
                var pointUpdated = boardFactory.dropPieceInBoard(columnOfChoice, getPieceFromPlayer(whoseGoIsIt.player));
                pointUpdated.piece = getPieceFromPlayer(whoseGoIsIt.player);
                turnHistory.push(pointUpdated);
            }
            catch (e) {
                console.log(e);
                return false;
            }

            return true;
        }

        function makeTurn(columnOfChoice) {
            if (isGameOver) {
                return;
            }

            var validMove = tryToDropPieceInBoard(columnOfChoice);

            if (validMove) {
                endTurn();
            }
        }

        function undoTurn() {
            if (turnHistory.length > 0) {
                var lastMove = turnHistory.pop();
                boardFactory.removeItemFromBoard(lastMove);
                nextPlayersGo();
            }
        }

        function dealWithPlayerWinning() {
            gameOver.setWinner(whoseGoIsIt);
        }

        function dealWithTie() {
            gameOver.setIsATie(true);
        }

        function newGame() {
            isGameOver = false;
            while (turnHistory.length > 0) {
                undoTurn();
            }
        }

        return {
            makeTurn: makeTurn,
            undoTurn: undoTurn,
            _lastPiecePlaced: function () {
                return turnHistory[turnHistory.length - 1];
            },
            _resetTurn: newGame,
            newGame: newGame
        }
    }

    angular.module("connect4")
        .factory("turnHandler", turnHandler);
})();