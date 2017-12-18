Registration:
- on page http://server/codenjoy-contest/help
    + you can read game instructions
        * server = server_host_ip:8080 server ip inside your LAN
- register your hero on server http://server/codenjoy-contest/register
- change variable at Runner.js
    + const server = server_host_ip:port;
- change your email at Runner.js
    + const userName = 'user@gmail.com';
- write your own bot in YourSolver.js


For JavaScript with node.js:
- install Node.js from http://nodejs.org/
- update Path System variable - add node.js root folder
- setup new node.js library - run
    + npm install ws
- write bot
- run run-client.bat