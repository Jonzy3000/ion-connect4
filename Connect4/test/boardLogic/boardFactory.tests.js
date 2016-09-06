'use strict';

describe('Board Factory Test', function () {
    beforeEach(module('connect4'));

    it('instance', inject (function (boardFactory, gameConstants) {
        expect(boardFactory.getBoard().length).toBe(gameConstants.NUMBER_OF_ROWS);
        expect(boardFactory.getBoard()[0].length).toBe(gameConstants.NUMBER_OF_COLUMNS);
    }));
});