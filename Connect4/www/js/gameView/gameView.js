; (function () {
    'use strict';

    var gameView = function ($scope, boardFactory, winConditions, gameConstants) {
        console.log("HELLO");
        //         console.log(winConditions.isThereAWinner(
        //     {
        //         x: 0,
        //         y: 1,
        //         piece: gameConstants.PIECE_1
        //     }
        // ))
    }

    angular.module('connect4')
        .config(function ($stateProvider) {
            $stateProvider
                .state('gameView', {
                    url: "/",
                    views: {
                        "gameView": {
                            controller: "gameView",
                            controllerAs: "gameView",
                            templateUrl: "js/gameView/gameView.html"
                        }
                    }
                })
        })
        .controller("gameView", gameView)
        ;


})();