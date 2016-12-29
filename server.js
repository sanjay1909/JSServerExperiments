/*
* Express is a minimal and flexible Node.js web application framework
* that provides a robust set of features for web and mobile applications
* */
var express = require("express");
var path = require("path");
/*
* Parse incoming request bodies in a middleware before our handlers,
* Available under the req.body property.
* */
var bodyParser = require("body-parser");

var app = express();

/*
* To serve static files such as images, CSS files, and JavaScript files,
* use the express.static built-in middleware function in Express.
*
* failing to initiate the static path middleware, will treat html or any file as
* end points and render only those that are passed in res.send("i got renderered")
* */
app.use(express.static(path.join(__dirname, './')));

//Returns middleware that only parses json
app.use(bodyParser.json());
//Returns middleware that only parses urlencoded bodies
app.use(bodyParser.urlencoded({
    /*
    * A new body object containing the parsed data is populated on the request object after the middleware
    * (i.e. req.body).
    * This object will contain key-value pairs,
    * where the value can be a string or array (when extended is false), or
    * any type (when extended is true).*/
    extended: true
}));

/*
* Routing refers to the definition of application end points (URIs)
* and how they respond to client request
* */
app.get('/index.html', function (req, res) {
    /*
     * Default Response Headers for Express
     * 1. connection: keep-alive
     * 2. Content-Length: xxx
     * 3. Date:Thu, 29 Dec 2016 06:03:52 GMT
     * 4. ETag:W/"2f-hkMaYB5nNxRiNce+hEnZQw"
     * 5. content-type:text/html; charset=utf-8
     * */
    res.send("Static Resource served from ./ dir");
});

app.post('/index.html', function (req, res) {
    console.log(req.body);
    if(req.body.type === 'Form post'){
        res.send('Form response will refresh the page content being me');
    } else {
        res.send('AJAX Post will not refresh the page');
    }

});

app.listen(8080, function () {
    console.log('Express server listening on port %s', 8080);
});



