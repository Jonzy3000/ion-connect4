; (function () {
    'use strict';

    var gameView = function ($scope) {

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