(function () {
    "use strict";

    var directive = function (boardFactory, gameConstants, turnHandler, boardHelpers) {
        return {
            scope: {

            },
            templateUrl: 'js/boardView/boardDirective.html',
            link: function (scope, element, attrs) {
                //so dom has access to this variable
                scope.NUMBER_OF_COLUMNS = gameConstants.NUMBER_OF_COLUMNS;

                scope.getNthColumn = boardHelpers.getNthColumn;

                scope.range = function(start, end) {
                    console.log(start);
                    console.log(end);
                    var rangedArray = [];
                    for (var i = start; i < end; i++) {
                        rangedArray.push(i);
                    }

                    return rangedArray;
                }

                scope.get

                scope.board = boardFactory.getBoard();

                scope.$watch(function () {
                    return boardFactory.getBoard();
                }, onBoardChange);

                var onBoardChange = function (board) {
                    scope.board = board;
                }

                scope.getCircleClass = function (item) {
                    if (item === gameConstants.PIECE_1) {
                        return "piece1";
                    }
                    else if (item === gameConstants.PIECE_2) {
                        return "piece2";
                    }
                    else if (item === gameConstants.EMPTY_TILE) {
                        return "empty";
                    }
                }

                scope.makeTurn = function (column) {
                    turnHandler.makeTurn(column);
                }
            }
        }
    }

    angular.module("connect4")
        .directive('boardView', directive);
})();