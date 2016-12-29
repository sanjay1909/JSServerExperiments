/*
* Express is a minimal and flexible Node.js web application framework
* that provides a robust set of features for web and mobile applications
* */
var express = require("express");

var app = express();

/*
* Routing refers to the definition of application end points (URIs)
* and how they respond to client request
* */
app.get('/', function (req, res) {
    /*
     * Default Response Headers for Express
     * 1. connection: keep-alive
     * 2. Content-Length: xxx
     * 3. Date:Thu, 29 Dec 2016 06:03:52 GMT
     * 4. ETag:W/"2f-hkMaYB5nNxRiNce+hEnZQw"
     * 5. content-type:text/html; charset=utf-8
     * */
    res.send('Get Request handler');
});

app.post('/', function (req, res) {
    /*
     * Default Response Headers for Express
     * 1. connection: keep-alive
     * 2. Content-Length: xxx
     * 3. Date:Thu, 29 Dec 2016 06:03:52 GMT
     * 4. ETag:W/"2f-hkMaYB5nNxRiNce+hEnZQw"
     * 5. content-type:text/html; charset=utf-8
     * */
    res.send('Post request handler');
});

app.listen(8080, function () {
    console.log('Express server listening on port %s', 8080);
});



