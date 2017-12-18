const D = function(index, dx, dy, name){

    const changeX = function(x) {
        return x + dx;
    };

    const changeY = function(y) {
        return y - dy;
    };

    const inverted = function() {
        switch (this) {
            case Direction.UP : return Direction.DOWN;
            case Direction.DOWN : return Direction.UP;
            case Direction.LEFT : return Direction.RIGHT;
            case Direction.RIGHT : return Direction.LEFT;
            default : return Direction.STOP;
        }
    };

    const toString = function() {
        return name;
    };

    return {
        changeX : changeX,

        changeY : changeY,

        inverted : inverted,

        toString : toString,

        getIndex : function() {
            return index;
        }
    };
};

values = function() {
    return [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT, Direction.ACT, Direction.STOP];
};

valueOf = function(index) {
    const directions = Direction.values();
    for (const i in directions) {
        const direction = directions[i];
        if (direction.getIndex() == index) {
            return direction;
        }
    }
    return Direction.STOP;
};

module.exports = {
    UP : D(2, 0, 1, 'up'),
    DOWN : D(3, 0, -1, 'down'),
    LEFT : D(0, -1, 0, 'left'),
    RIGHT : D(1, 1, 0, 'right'),
    values,
    valueOf
};

