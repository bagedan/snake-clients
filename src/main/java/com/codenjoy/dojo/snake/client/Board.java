package com.codenjoy.dojo.snake.client;

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


import com.codenjoy.dojo.client.AbstractBoard;
import com.codenjoy.dojo.client.Direction;
import com.codenjoy.dojo.services.Point;
import com.codenjoy.dojo.services.PointImpl;
import com.codenjoy.dojo.snake.model.Elements;

import java.util.Arrays;
import java.util.List;

/**
 * User: oleksandr.baglai
 * Date: 10/2/12
 * Time: 12:07 AM
 */
public class Board extends AbstractBoard<Elements> {

    @Override
    public Elements valueOf(char ch) {
        return Elements.valueOf(ch);
    }

    public List<Point> getApples() {
        return get(Elements.GOOD_APPLE);
    }

    public Direction getSnakeDirection() {
        Point head = getHead();
        if (head == null) {
            return null;
        }
        if (isAt(head.getX(), head.getY(), Elements.HEAD_LEFT)) {
            return Direction.LEFT;
        } else if (isAt(head.getX(), head.getY(), Elements.HEAD_RIGHT)) {
            return Direction.RIGHT;
        } else if (isAt(head.getX(), head.getY(), Elements.HEAD_UP)) {
            return Direction.UP;
        } else {
            return Direction.DOWN;
        }
    }

    public Point getHead() {
        List<Point> result = get(
                Elements.HEAD_UP,
                Elements.HEAD_DOWN,
                Elements.HEAD_LEFT,
                Elements.HEAD_RIGHT);
        if (result.isEmpty()) {
            return null;
        } else {
            return result.get(0);
        }
    }

    public List<Point> getBarriers() {
        List<Point> result = getSnake();
        result.addAll(getStones());
        result.addAll(getWalls());
        return result;
    }

    public List<Point> getSnake() {
        Point head = getHead();
        if (head == null) {
            return Arrays.asList();
        }
        List<Point> result = get(
                Elements.TAIL_END_DOWN,
                Elements.TAIL_END_LEFT,
                Elements.TAIL_END_UP,
                Elements.TAIL_END_RIGHT,
                Elements.TAIL_HORIZONTAL,
                Elements.TAIL_VERTICAL,
                Elements.TAIL_LEFT_DOWN,
                Elements.TAIL_LEFT_UP,
                Elements.TAIL_RIGHT_DOWN,
                Elements.TAIL_RIGHT_UP);
        result.add(0, head);
        return result;
    }

    public boolean isGameOver() {
        return getHead() == null;
    }

    @Override
    public String toString() {
        return String.format("Board:\n%s\n" +
            "Apple at: %s\n" +
            "Stones at: %s\n" +
            "Head at: %s\n" +
            "Snake at: %s\n" +
            "Current direction: %s",
                boardAsString(),
                getApples(),
                getStones(),
                getHead(),
                getSnake(),
                getSnakeDirection());
    }

    public List<Point> getStones() {
        return get(Elements.BAD_APPLE);
    }

    public List<Point> getWalls() {
        return get(Elements.BREAK);
    }

    public Board getNextBoardWithTurn(Direction nextTurn) {
        Board nextBoard = (Board) new Board().forString(this.boardAsString());

        Point currentHeadPosition = this.getHead();
        Point nextHeadPosition = null;
        Elements nextHeadElement = null;
        switch(nextTurn){
            case UP:
                nextHeadPosition = new PointImpl(currentHeadPosition.getX(), currentHeadPosition.getY() - 1);
                nextHeadElement = Elements.HEAD_UP;
                break;
            case LEFT:
                nextHeadPosition = new PointImpl(currentHeadPosition.getX() - 1, currentHeadPosition.getY());
                nextHeadElement = Elements.HEAD_LEFT;
                break;
            case RIGHT:
                nextHeadPosition = new PointImpl(currentHeadPosition.getX() + 1, currentHeadPosition.getY());
                nextHeadElement = Elements.HEAD_RIGHT;
                break;
            case DOWN:
                nextHeadPosition = new PointImpl(currentHeadPosition.getX(), currentHeadPosition.getY() + 1);
                nextHeadElement = Elements.HEAD_DOWN;
                break;
        }

        if(!isObstacleOnNextTurn(nextHeadPosition)) {
            nextBoard.set(nextHeadPosition, nextHeadElement);
        }
        List<Point> snakeBody = this.getSnake();
        for(int i=1;i<snakeBody.size();i++){
            nextBoard.set(snakeBody.get(i-1), this.getAt(snakeBody.get(i).getX(), snakeBody.get(i).getY()));
        }

        Point currentTailPoint = snakeBody.get(snakeBody.size()-1);
        if(isElementHead(nextBoard.getAt(currentTailPoint.getX(), currentTailPoint.getY()))){
            // we allow head to get on place of the tail
        } else {
            nextBoard.set(currentTailPoint, Elements.NONE);
        }

        return nextBoard;
    }

    private boolean isObstacleOnNextTurn(Point point) {
        List<Point> currentBarriers = this.getBarriers();
        //on next turn the current tail is not going to be obstacle
        List<Point> snake = this.getSnake();
        if(snake.get(snake.size()-1).equals(point)){
            return false;
        }

        return currentBarriers.contains(point);
    }

    private boolean isElementHead(Elements element){
        return element.equals(Elements.HEAD_DOWN) ||
                element.equals(Elements.HEAD_LEFT) ||
                element.equals(Elements.HEAD_RIGHT) ||
                element.equals(Elements.HEAD_UP);
    }
    public void set(Point point, Elements element){
        this.set(point.getX(), point.getY(), element.ch());
    }

    @Override
    public boolean equals(Object obj) {
        if(obj instanceof Board){
            Board other = (Board) obj;
            //board are the same if head at the same position (?)
            return this.getSnake().get(0).equals(other.getSnake().get(0));
        }
        return false;
    }
}
