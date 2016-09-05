(function () {
    "use-strict"

    var turnHandler = function (playerConstant) {
        let player1 = playerConstant;
        let player2 = playerConstant;

        function setUpPlayers() {
            player1.player = 1;
            player1.isAi = false;

            player2.player = 2;
            player2.isAi = false;
        }

        setUpPlayers();

        let whoseGoIsIt = player1;

        function nextPlayersGo() {
            if (whoseGoIsIt.player === 1) {
                whoseGoIsIt = player2;
            } else if (whoseGoIsIt.player === 2) {
                whoseGoIsIt = player1;
            }
        }

        function endTurn() {
            if (isTherAWinner()) {
                dealWithPlayerWinning()
            }
            else if (isThereATie()) {
                dealWithATie();
            } else {
                nextPlayersGo();
            }
        }
    }
})();