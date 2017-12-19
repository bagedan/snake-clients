To setup the client:
- Install Java 8
- Install Maven3
- Open this project in Intellij
- Register on the local server
- in .\src\main\java\com\codenjoy\dojo\<game_package>\client\YourSolver.java class
    = change variable USERNAME and SERVER
    =  implement your logic in
        public String get(Board board) {
    = run  YourSolver with main method
- after client is started - open the server page and see your snake moving
http://localhost:8080/codenjoy-contest/board/game/snake
- Codenjoy!