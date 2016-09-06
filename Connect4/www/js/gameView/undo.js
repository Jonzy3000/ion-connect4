(function () {
    "use strict";

    var undo = function (turnHandler) {
        return {
            scope: {

            },
            templateUrl: 'js/gameView/undo.html',
            link: function (scope, element, attrs) {
                console.log("HELLO WORLD");
                scope.undoTurn = function () {
                    turnHandler.undoTurn();
                }
            }
        }
    }

    angular.module("connect4")
        .directive('undo', undo);
})();