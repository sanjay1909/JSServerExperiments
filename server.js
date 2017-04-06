/*
* Express is a minimal and flexible Node.js web application framework
* that provides a robust set of features for web and mobile applications
* */
var express = require("express");
var path = require("path");
var sessions = require("client-sessions");
var cookieParser = require('cookie-parser');
var index = require('./index');
console.log(index);
/*
* Parse incoming request bodies in a middleware before our handlers,
* Available under the req.body property.
* */
var bodyParser = require("body-parser");

var app = express();

app.use(sessions({
    cookieName: 'sanjaySession', // cookie name dictates the key name added to the request object
    secret: 'sanjay', // should be a large unguessable string
    duration: 109600000, // how long the session will stay valid in ms
    activeDuration: 109600000, // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
    cookie: {
        path: '/',
        ephemeral: true, // when true, cookie expires when the browser closes
        httpOnly: false, // when true, cookie is not accessible from javascript
        secure: false // when true, cookie will only be sent over SSL. use key 'secureProxy' instead if you handle SSL not in your node process
    }
}));

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
* GET Method initiated other than front end, code will not reach here
* for example, refresh a page is GET method,
* redirect from another page is GET request
* Those calls will not come to this routing
* */
app.get('/index.html', function (req, res) {
    console.log("Static Resource served from ./ dir");
    res.send("Static Resource served from ./ dir");
});

app.get('/RedirectedPage.html', function (req, res) {
    console.log("Static Resource served from ./ dir");
    res.send("Static Resource served from ./ dir");
});

app.post('/launch',
    function (req, res,next) {
        // adding property to cookie name 'sanjaySession' is important
        // else Set-Cookie wont be added as header res
        // client-session library adds writeHead function to res
        // which updates the cookie and add header only if there is a property in session
        // After that all the request headers comes with cookie header
        req.sanjaySession.launch = true;
        next();
    }, function (req, res) {
    console.log(req.body);
    if(req.body.type === 'Form post'){
        /*
        * redirect is GET request to that url
        * You can't POST using a redirect.s
        * By definition a redirect means the server sending a 302 redirect HTTP status code
        * to the client with the new location
        * so that the client issues a GET request to this new location
        * */
        res.redirect(302,'./RedirectedPage.html');
    } else {
        res.redirect(302,'./AJAXRedirect.html?key=value');
    }

});

//app.set('port', process.env.PORT || 8078);

app.listen(8078, function () {
    console.log('Express server listening on port %s', 8078);
});



