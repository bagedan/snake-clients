const expect = require('chai').expect;

const Board = require('./Board');
const Direction = require('./Direction');

describe('test board', () => {
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
    const boardSnapshot = '☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼             ☼☼             ☼☼    ☻        ☼☼             ☼☼             ☼☼       ▲     ☼☼       ╙     ☼☼             ☼☼             ☼☼             ☼☼  ☺          ☼☼             ☼☼             ☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼';

    test('should find the board size', () => {
        const board = new Board(boardSnapshot);
        expect(board.size()).to.be.equal(15);
    });

    test('should find the apple', () => {
        const board = new Board(boardSnapshot);
        expect(board.getApple().getX()).to.be.equal(3);
        expect(board.getApple().getY()).to.be.equal(3);
    });

    test('should find the stone', () => {
        const board = new Board(boardSnapshot);
        expect(board.getStone().getX()).to.be.equal(5);
        expect(board.getStone().getY()).to.be.equal(11);
    });

    test('should find the head', () => {
        const board = new Board(boardSnapshot);
        expect(board.getHead().getX()).to.be.equal(8);
        expect(board.getHead().getY()).to.be.equal(8);
    });

    test('should find the shake', () => {
        const board = new Board(boardSnapshot);
        expect(board.getSnake().length).to.be.equal(2);
    });

    test('should find the shake direction', () => {
        const board = new Board(boardSnapshot);
        expect(board.getSnakeDirection()).to.be.equal(Direction.UP);
    })
});