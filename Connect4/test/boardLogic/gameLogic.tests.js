'use strict';

describe('GameLogic Test', function () {
    var boardFactory;
    var gameConstants;
    var winConditions;
    var turnHandler;
    var boardHelpers;
    beforeEach(module('connect4'));

    beforeEach(inject(function (_boardFactory_, _gameConstants_, _winConditions_, _turnHandler_, _boardHelpers_) {
        boardFactory = _boardFactory_;
        gameConstants = _gameConstants_;
        winConditions = _winConditions_;
        turnHandler = _turnHandler_;
        boardHelpers = _boardHelpers_;
    }));

    describe("Board Setup", function () {
        it('number of rows', function () {
            expect(boardFactory.getBoard().length).toBe(gameConstants.NUMBER_OF_ROWS);
        });

        it('number of columns', function () {
            expect(boardFactory.getBoard()[0].length).toBe(gameConstants.NUMBER_OF_COLUMNS);
        })
    });

    describe("Win Conditions", function () {
        it('basic horizontal', function () {
            turnHandler._resetTurn();
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 2; j++) {

                    turnHandler.makeTurn(i);

                    if (i == 3) {
                        break;
                    }
                }
            }

            boardHelpers.printBoard(boardFactory.getBoard());
            expect(lastPiecePlaced.piece).toBe(gameConstants.PIECE_1);
            expect(winConditions.isThereAWinner(turnHandler._lastPiecePlaced())).toBe(true);

        });

        it('basicVertical', function () {
            turnHandler._resetTurn();

            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 2; j++) {
                    turnHandler.makeTurn(j);

                    if (i == 3) {
                        break;
                    }
                }
            }

            boardHelpers.printBoard(boardFactory.getBoard())
            expect(turnHandler._lastPiecePlaced().piece).toBe(gameConstants.PIECE_1);
            expect(winConditions.isThereAWinner(turnHandler._lastPiecePlaced())).toBe(true);
        })

        it('basicDiagonalTopRightToBottomLeft', function () {
            turnHandler._resetTurn();
            var board = [
                ['.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', 'X', 'O', '.', '.', '.'],
                ['O', 'X', 'X', 'X', '.', '.', '.'],
                ['X', 'O', 'O', 'O', '.', '.', '.']
            ];

            boardFactory._setBoard(board);
            turnHandler.makeTurn(3);
            boardHelpers.printBoard(boardFactory.getBoard())
            expect(turnHandler._lastPiecePlaced().piece).toBe(gameConstants.PIECE_1);
            expect(winConditions.isThereAWinner(turnHandler._lastPiecePlaced())).toBe(true);

        });

        it('basicDiagonalTopLeftToBottomRight', function () {
            turnHandler._resetTurn();

            var board = [
                ['.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.'],
                ['X', 'O', '.', '.', '.', '.', '.'],
                ['O', 'X', '.', '.', '.', '.', '.'],
                ['O', 'O', 'X', '.', '.', '.', '.'],
                ['O', 'O', 'O', '.', '.', '.', '.']
            ];

            boardFactory._setBoard(board);
            turnHandler.makeTurn(3);
            boardHelpers.printBoard(boardFactory.getBoard())
            expect(turnHandler._lastPiecePlaced().piece).toBe(gameConstants.PIECE_1);
            expect(winConditions.isThereAWinner(turnHandler._lastPiecePlaced())).toBe(true);
        })

        it('horizontal test 2', function () {
            turnHandler._resetTurn();

            var board = [
                ['.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.'],
                ['.', 'O', 'O', '.', 'O', '.', '.'],
                ['.', 'X', 'X', '.', 'X', '.', '.']
            ];

            boardFactory._setBoard(board);
            turnHandler.makeTurn(3);
            boardHelpers.printBoard(boardFactory.getBoard());
            expect(turnHandler._lastPiecePlaced().piece).toBe(gameConstants.PIECE_1);
            expect(winConditions.isThereAWinner(turnHandler._lastPiecePlaced())).toBe(true);
        })

        it('horziontal test 3', function () {
            turnHandler._resetTurn();

            var board = [
                ['.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.'],
                ['.', 'O', 'O', '.', 'O', '.', '.'],
                ['.', 'X', 'X', '.', 'X', '.', '.']
            ];

            boardFactory._setBoard(board);
            turnHandler.makeTurn(2);
            turnHandler.makeTurn(3);
            boardHelpers.printBoard(boardFactory.getBoard());
            expect(turnHandler._lastPiecePlaced().piece).toBe(gameConstants.PIECE_2);
            expect(winConditions.isThereAWinner(turnHandler._lastPiecePlaced())).toBe(false);

            turnHandler.makeTurn(2);
            turnHandler.makeTurn(3);
            boardHelpers.printBoard(boardFactory.getBoard());
            expect(winConditions.isThereAWinner(turnHandler._lastPiecePlaced())).toBe(true);
        })

        it("diagonal test 2", function () {
            turnHandler._resetTurn();

            var board = [
                ['.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', 'O'],
                ['.', '.', '.', '.', '.', 'O', 'X'],
                ['.', 'X', 'X', '.', '.', 'X', 'X'],
                ['.', 'X', 'X', 'O', 'X', 'X', 'X']
            ];

            boardFactory._setBoard(board);
            turnHandler.makeTurn(6);
            turnHandler.makeTurn(4);
            boardHelpers.printBoard(boardFactory.getBoard());
            expect(turnHandler._lastPiecePlaced().piece).toBe(gameConstants.PIECE_2);
            expect(winConditions.isThereAWinner(turnHandler._lastPiecePlaced())).toBe(true);
        })

        it("diagonal test 3", function () {
            turnHandler._resetTurn();

            var board = [
                ['.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', 'O'],
                ['.', '.', '.', '.', '.', '.', 'X'],
                ['.', 'X', 'X', '.', 'O', 'X', 'X'],
                ['.', 'X', 'X', 'O', 'X', 'X', 'X']
            ];

            boardFactory._setBoard(board);
            turnHandler.makeTurn(4);
            turnHandler.makeTurn(5);
            boardHelpers.printBoard(boardFactory.getBoard());
            expect(turnHandler._lastPiecePlaced().piece).toBe(gameConstants.PIECE_2);
            expect(winConditions.isThereAWinner(turnHandler._lastPiecePlaced())).toBe(true);
        })

    })


});