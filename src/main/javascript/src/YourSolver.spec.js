const expect = require('chai').expect;

const Direction = require('./Direction');
const Board = require('./Board');
const solver = require('./YourSolver');




describe('test solver', () => {

    function assertAI(boardSnapshot, expectedDirection) {
        const board = new Board(boardSnapshot);
        const solution = solver(board);
        expect(solution).to.be.equal(expectedDirection.toString());
    }

    test('should find the simplest solutuion', () => {
        // ☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼
        // ☼             ☼
        // ☼             ☼
        // ☼    ☻        ☼
        // ☼             ☼
        // ☼       ☺     ☼
        // ☼       ▲     ☼
        // ☼       ╙     ☼
        // ☼             ☼
        // ☼             ☼
        // ☼             ☼
        // ☼             ☼
        // ☼             ☼
        // ☼             ☼
        // ☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼
        const boardSnapshot = "☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼             ☼☼             ☼☼    ☻        ☼☼             ☼☼       ☺     ☼☼       ▲     ☼☼       ╙     ☼☼             ☼☼             ☼☼             ☼☼             ☼☼             ☼☼             ☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼";

        assertAI(boardSnapshot, Direction.UP);
    });

    test('should find the more complicated solution', () => {
        // ☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼
        // ☼             ☼
        // ☼             ☼
        // ☼    ☻        ☼
        // ☼       ☺     ☼
        // ☼             ☼
        // ☼       ▲     ☼
        // ☼       ╙     ☼
        // ☼             ☼
        // ☼             ☼
        // ☼             ☼
        // ☼             ☼
        // ☼             ☼
        // ☼             ☼
        // ☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼
        const boardSnapshot = "☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼             ☼☼             ☼☼    ☻        ☼☼       ☺     ☼☼             ☼☼       ▲     ☼☼       ╙     ☼☼             ☼☼             ☼☼             ☼☼             ☼☼             ☼☼             ☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼";

        assertAI(boardSnapshot, Direction.UP);
    });

    test('should find the much more complicated solutuion', () => {
        // ☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼
        // ☼             ☼
        // ☼             ☼
        // ☼    ☻        ☼
        // ☼             ☼
        // ☼             ☼
        // ☼       ▲     ☼
        // ☼       ╙     ☼
        // ☼             ☼
        // ☼             ☼
        // ☼             ☼
        // ☼  ☺          ☼
        // ☼             ☼
        // ☼             ☼
        // ☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼
        const boardSnapshot = "☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼             ☼☼             ☼☼    ☻        ☼☼             ☼☼             ☼☼       ▲     ☼☼       ╙     ☼☼             ☼☼             ☼☼             ☼☼  ☺          ☼☼             ☼☼             ☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼";

        assertAI(boardSnapshot, Direction.LEFT);
    });
});