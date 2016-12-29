/*
* HTTP server and client
* The HTTP interfaces in Node.js are designed to support many features of the protocol
* which have been traditionally difficult to use.
* In order to support the full spectrum of possible HTTP applications,
* Node.js's HTTP API is very low-level.
* It deals with stream handling and message parsing only.
* It parses a message into headers and body but it does not parse the actual headers or the body.
* */
var http = require("http");

/*
 * Step 1: The server object returned here is an EventEmitter
 * */
var server = http.createServer();

function requestHandler (request,response){
    response.write('<h1>Response from server for request</h1>');
}

// Step 2 : Event-Listener:requestHandler is added for Event: 'request<http.IncomingMessage>'
/*
* A persistent connection (HTTP persistent connection | connection: keep-alive) is a network communication channel
* that remains open for further HTTP requests and responses rather than closing after a single exchange.
* Persistent connections added for HTTP 1.0 used an extra header to request the client keep the connection alive;
* HTTP 1.1 assumes all connections to be persistent unless otherwise specified.
* HTTP 2.0 expands the persistent connection to enable numerous requests and returns of data to be exchanged
* simultaneously over a single connection.
* */
server.on('request',requestHandler);

// Step 3: to server for request Event  we need to call the listen method to initiate
server.listen(8080);



