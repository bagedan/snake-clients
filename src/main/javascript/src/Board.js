const Element = require('./Element');
const Direction = require('./Direction');
const util = require('util');


const lengthToXY = function(boardSize) {
    function inversionY(y) {
        return boardSize - 1 - y;
    }

    function inversionX(x) {
        return x;
    }

    return {
        getXY : function(length) {
            if (length == -1) {
                return null;
            }
            const x = inversionX(length % boardSize);
            const y = inversionY(Math.ceil(length / boardSize));
            return new Point(x, y);
        },

        getLength : function(x, y) {
            const xx = inversionX(x);
            const yy = inversionY(y);
            return yy*boardSize + xx;
        }
    };
};

const Point = function (x, y) {
    return {
        equals : function (o) {
            return o.getX() == x && o.getY() == y;
        },

        toString : function() {
            return '[' + x + ',' + y + ']';
        },

        isOutOf : function(boardSize) {
            return x >= boardSize || y >= boardSize || x < 0 || y < 0;
        },

        getX : function() {
            return x;
        },

        getY : function() {
            return y;
        }
    }
};

const Board = function(board){
    const contains  = function(a, obj) {
        let i = a.length;
        while (i--) {
            if (a[i].equals(obj)) {
                return true;
            }
        }
        return false;
    };

    const removeDuplicates = function(all) {
        const result = [];
        for (const index in all) {
            const point = all[index];
            if (!contains(result, point)) {
                result.push(point);
            }
        }
        return result;
    };

    const boardSize = function() {
        return Math.sqrt(board.length);
    };

    const size = boardSize();
    const xyl = new lengthToXY(size);

    const getApple = function() {
        const result = findAll(Element.GOOD_APPLE);
        return result[0];
    };

    const getSnakeDirection = function() {
        const headPoint = getHead();
        if(headPoint) {
            if (isAt(headPoint.getX(), headPoint.getY(), Element.HEAD_LEFT)) {
                return Direction.LEFT
            } else if (isAt(headPoint.getX(), headPoint.getY(), Element.HEAD_RIGHT)) {
                return Direction.RIGHT
            } else if (isAt(headPoint.getX(), headPoint.getY(), Element.HEAD_DOWN)) {
                return Direction.DOWN
            } else {
                return Direction.UP
            }
        } else {
            return null;
        }
    };

    const getHead = function() {
        return findAll(Element.HEAD_DOWN, Element.HEAD_LEFT,
            Element.HEAD_RIGHT, Element.HEAD_UP)[0];
    };

    const getStone = function() {
        return findAll(Element.BAD_APPLE)[0];
    };

    const isAt = function(x, y, elements) {
        if (new Point(x, y).isOutOf(size)) {
            return false;
        }
        if(elements instanceof Array) {
            return elements.includes(getAt(x, y));
        } else {
            return elements === getAt(x, y);
        }
    };

    const getAt = function(x, y) {
        if (new Point(x, y).isOutOf(size)) {
            return Element.BREAK;
        }
        return board.charAt(xyl.getLength(x, y));
    };

    const boardAsString = function() {
        let result = "";
        for (let i = 0; i < size; i++) {
            result += board.substring(i * size, (i + 1) * size);
            result += "\n";
        }
        return result;
    };

    const getSnake = function() {
        const headPoint = getHead();
        if(!headPoint) {
            return [];
        }

        let snakePoints = findAll(Element.TAIL_END_DOWN,
            Element.TAIL_END_LEFT,
            Element.TAIL_END_UP,
            Element.TAIL_END_RIGHT,
            Element.TAIL_HORIZONTAL,
            Element.TAIL_VERTICAL,
            Element.TAIL_LEFT_DOWN,
            Element.TAIL_LEFT_UP,
            Element.TAIL_RIGHT_DOWN,
            Element.TAIL_RIGHT_UP);
        snakePoints.unshift(headPoint);

        return snakePoints;
    };

    const toString = function() {
        return util.format("Board:\n%s\n" +
            "Apple at: %s\n" +
            "Stones at: %s\n" +
            "Head at: %s\n" +
            "Snake at: %s\n" +
            "Current direction: %s",
            boardAsString(),
            getApple(),
            getStone(),
            getHead(),
            getSnake(),
            getSnakeDirection());
    };

    const findAll = function(...elements) {
        const result = [];
        for (let i = 0; i < size*size; i++) {
            const point = xyl.getXY(i);
            if (isAt(point.getX(), point.getY(), elements)) {
                result.push(point);
            }
        }
        return result;
    };

    return {
        size : boardSize,
        getApple : getApple,
        getHead: getHead,
        isAt : isAt,
        boardAsString : boardAsString,
        toString : toString,
        findAll : findAll,
        getSnake: getSnake,
        getStone: getStone,
        getSnakeDirection: getSnakeDirection
    };
};

module.exports = Board;