(function () {
    "use strict";

    var gameOver = function () {
        var winner = {
            isAi: false,
            player: -1,
        };
        var isATie = false;

        var setWinner = function (w) {
            winner = w;
        }

        var setIsATie = function (isATie_) {
            isATie = isATie_;
        }

        return {
            setWinner: setWinner,
            getWinner: function () {
                return winner;
            },
            setIsATie: setIsATie,
            getIsATie: function () {
                return isATie;
            }
        }
    }

    angular.module("connect4")
        .factory("gameOver", gameOver)
        ;
})();