/*-
 * #%L
 * Codenjoy - it's a dojo-like platform from developers to developers.
 * %%
 * Copyright (C) 2016 Codenjoy
 * %%
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public
 * License along with this program.  If not, see
 * <http://www.gnu.org/licenses/gpl-3.0.html>.
 * #L%
 */
const solver = require('./YourSolver');
const Board = require('./Board');

const log = function(string) {
    console.log(string);
};

// to use for local server
const server = '127.0.0.1:8080';

const userName = 'js@gmail.com';

const processBoard = function(boardString) {
    log(boardString);
    const board = new Board(boardString);

    let logMessage = board + "\n\n";
    const answer = solver(board);
	logMessage += "Answer: " + answer + "\n";
    logMessage += "-----------------------------------\n";
	
	log(logMessage);

    return answer;
};

function run() {
//starting client

    const serverWs = `ws://${server}/codenjoy-contest/ws`;
    const WSocket = require('ws');
    const ws = new WSocket(serverWs + '?user=' + userName);

    ws.on('open', function () {
        log('Opened');
    });

    ws.on('close', function () {
        log('Closed');
    });

    ws.on('message', function (message) {
        const pattern = new RegExp(/^board=(.*)$/);
        const parameters = message.match(pattern);
        const boardString = parameters[1];
        const answer = processBoard(boardString);
        ws.send(answer);
    });

    log('Web socket client running at ' + server);

}

run();




