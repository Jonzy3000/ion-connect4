(function () {
    "use strict";

    var gameOverView = function (gameOver, $ionicPopover) {
        return {
            scope: {

            },
            templateUrl: 'js/gameOverView/gameOverView.html',
            link: function (scope, element, attrs) {
                var winner = {};
                scope.$watch(function () {
                    console.log(gameOver.getWinner())
                    return gameOver.getWinner();
                }, function (winner1, oldVal) {
                    if (winner1 !== oldVal) {
                        console.log("WINNER");
                        winner = winner1;
                        calculatePopUpMessage();
                        scope.openPopover();
                    }
                });

                function calculatePopUpMessage() {
                    if (winner.isAi) {
                        scope.message = "CPU (" + winner.player +") Wins"
                    } else {
                        //get some thing that tells on what the game type isAi
                        scope.message = "Player " + winner.player + "Wins!";
                    }
                }

                $ionicPopover.fromTemplateUrl('my-popover.html', {
                    scope: scope
                }).then(function (popover) {
                    scope.popover = popover;
                })

                scope.openPopover = function () {
                    scope.popover.show(element);
                };
                scope.closePopover = function () {
                    scope.popover.hide();
                };
                //Cleanup the popover when we're done with it!
                scope.$on('$destroy', function () {
                    scope.popover.remove();
                });
                // Execute action on hide popover
                scope.$on('popover.hidden', function () {
                    // Execute action
                });
                // Execute action on remove popover
                scope.$on('popover.removed', function () {
                    // Execute action
                });
            }
        }
    }

    angular.module("connect4")
        .directive('gameOverView', gameOverView);
})();