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
    /*
    * Default Response Headers
    * 1. connection: keep-alive
    * 2. Date: xxxxxxx
    * 3. Transfer-Encoding:chunked
    *       When an HTTP client is reading a response message from a server it needs to know when it has reached the end of the message.'
    *       This is particularly important with persistent (keep alive) connections,
    *       because a connection can only be re-used by another HTTP transaction after the response message has been fully received.
    *       There are four ways in which an HTTP server can indicate the end of the response message:
    * */
    response.write('<h1>Response from server for request</h1>');
    response.write('<div>Default Headers</div>');
    response.write('<ul><li>connection: keep-alive</li>');
    response.write('<li>Date: xxxxxxx</li>');
    response.write('<li>Transfer-Encoding:chunked</li></ul>');
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



