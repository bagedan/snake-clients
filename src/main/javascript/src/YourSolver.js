const Direction = require('./Direction');

const status = {
    EMPTY: 'empty',
    WALL: 'wall',
    APPLE: 'apple',
    STONE: 'stone',
    SNAKE: 'snake',
    CALCULATED: 'calculated'
}

let table = []
let route = []
let snake = []

module.exports = function solver(board){
    const head = board.getHead()
    const apple = board.getApple()
    let logMessage = board + "\n\n";
    if(route.length > 0) {
        return getNextDirection(head, route.pop())
    } else {
        table = initTable(board)
        addElementsToTable(board)
        let path = {}
        route = calculate([{x: head.getX(), y: head.getY()}], path, 0)
        route.unshift({x: apple.getX(), y: apple.getY()})
        return getNextDirection(head, route.pop(), board)
    }
};

function initTable(board) {
    const table = []
    for(let i = 0; i < board.size(); i++) {
        table.push([])
        for(let j = 0; j < board.size(); j++) {
            if(i === 0 || i === board.size()-1) {
                table[i].push({
                    status: status.WALL
                })
            } else if((j === 0 || j === board.size()-1)) {
                table[i].push({
                    status: status.WALL
                })
            } else {
                table[i].push({
                    status: status.EMPTY
                })
            }
        }
    }
    return table
}

function addElementsToTable(board) {
    table[board.getApple().getY()][board.getApple().getX()] = {status: status.APPLE}
    table[board.getStone().getY()][board.getStone().getX()] = {status: status.STONE}
    const snake = board.getSnake()
    for(let i = 0; i < snake.length; i++){
        table[snake[i].getY()][snake[i].getX()] = {status: status.SNAKE}
    }

}

function calculate(source, path, distance) {
    let isEnd = false
    path[distance+1] = []
    if(snake.length > 0) {
        let tail = snake.pop()
        table[tail.getY()][tail.getX()].status = status.EMPTY
    }
    for(let i = 0; i < source.length; i++) {
        if(!isEnd && setNeighbours(source[i], path, distance+1, i)) {
            isEnd = true
            path[distance] = [source[i]]
        }
    }
    if(isEnd) {
        return getRoute(path, distance)
    }

    return calculate(path[distance+1], path, distance+1)
}

function setNeighbours(cell, path, distance, index) {
    if(table[cell.y + 1][cell.x].status === status.APPLE) return true
    if(table[cell.y + 1][cell.x].status === status.EMPTY) {
        path[distance].push({
            x: cell.x,
            y: cell.y + 1,
            source: index
        })
        table[cell.y + 1][cell.x].status = status.CALCULATED
    }

    if(table[cell.y][cell.x + 1].status === status.APPLE) return true
    if(table[cell.y][cell.x + 1].status === status.EMPTY) {
        path[distance].push({
            x: cell.x + 1,
            y: cell.y,
            source: index
        })
        table[cell.y][cell.x + 1].status = status.CALCULATED
    }

    if(table[cell.y - 1][cell.x].status === status.APPLE) return true
    if(table[cell.y - 1][cell.x].status === status.EMPTY) {
        path[distance].push({
            x: cell.x,
            y: cell.y - 1,
            source: index
        })
        table[cell.y - 1][cell.x].status = status.CALCULATED
    }

    if(table[cell.y][cell.x - 1].status === status.APPLE) return true
    if(table[cell.y][cell.x - 1].status === status.EMPTY) {
        path[distance].push({
            x: cell.x - 1,
            y: cell.y,
            source: index
        })
        table[cell.y][cell.x - 1].status = status.CALCULATED
    }
    return false
}

function getRoute(path, distance) {
    const route = []
    route.push(path[distance][0])
    for(var i = distance - 1; i > 0; i--) {
        let source = route[route.length -1].source
        route.push(path[i][source])
    }
    return route
}

function getNextDirection(head, target, board) {
    if (head.getX() > target.x){
        console.log('GO LEFT')
        return Direction.LEFT.toString();
    }
    if (head.getX() < target.x){
        console.log('GO RIGHT')
        return Direction.RIGHT.toString();
    }
    if (head.getY() > target.y){
        console.log('GO DOWN')
        return Direction.DOWN.toString();
    }
    if (head.getY() < target.y){
        console.log('GO UP')
        return Direction.UP.toString();
    }
    return getBackupDirection(board)
}

function getBackupDirection(board){
    const head = board.getHead()
    const apple = board.getApple()
    table = initTable(board)
    addElementsToTable(board)
    let path = {}
    route = calculate([{x: head.getX(), y: head.getY()}], path, 0)
    route.unshift({x: apple.getX(), y: apple.getY()})
    return getNextDirection(head, route.pop(), board)
}

function setSnake(board){
    let boardSnake = board.getSnake()
    let snake = [boardSnake.shift()]
    for(let i = 0; i < 1; i++) {

    }
}
