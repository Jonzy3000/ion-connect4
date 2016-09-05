(function () {
    "use-strict";

    var directive = function (boardFactory) {
        return {
            scope: {

            },
            templateUrl: 'js/boardView/boardDirective.html',
            link: function (scope, element, attrs) {
                console.log("HELLO");

                scope.board = boardFactory.getBoard();

                scope.$watch(function () {
                    return boardFactory.getBoard();
                }, onBoardChange);

                var onBoardChange = function (board) {
                    scope.board = board;
                }
            }
        }
    }

    angular.module("connect4")
        .directive('boardView', directive);
})();