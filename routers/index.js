// Middleware functions are functions that have access to the request object (req), 
// the response object (res), and the next middleware function in the application’s request-response cycle. 
// The next middleware function is commonly denoted by a variable named next.
// Parse = to separate into parts. Parsing JSON means speratinh the huge single JSON string into 
// o javascript object.

// Can I use modules that were required in server.js

// Most middlewares don't come with express and you have to load them separately.
// Like 'body-parser'.
var router = require('express').Router();
// Requires node module 'path' so I can use path transformations such as path.join(path1, path2).
var path = require('path');
// Middleware used for POST requests.
var bodyParser = require('body-parser');

// Passing bodyParser methods .json() and .urlencoded in to ALL requests.
// Now parsing for JSON strings is turned on.
// (format: application/json). Ex: {"Name":"John Smith","Age":"23"}
router.use(bodyParser.json()); 
// Now parsing for URL URL encoded string. Used in forms. 
// (format: x-www-form-urlencoded). Ex: Name=John+Smith&Age=23
router.use(bodyParser.urlencoded({ extended: true }));

// Here, we see a middleware function with no mount path.
// That gets executed for all requests.
// router.use() binds a middleware to a mount path. Ex: '/', '/user', etc.
// I don't have to use it anymore bc I'm now using the morgan middleware, which does all the logging.
/*router.use(function(req, res, next) {
    console.log('\nMethod: ' + req.method + '\nPath: ' + req.path);
    // Execute next function in line.
    // Don't forget 'next' is just an alias. I could pass in any other word.
    next();
}); */

// since __dirname points to the '/routers' folder, I have to use a '../' before getting to the views folder.
router.get('/', function(req, res) {
    // pass in the path to the file.
    res.sendFile(path.join(__dirname, '../views', 'index.html')); // If you want to use a template engine (jade, ejs), use res.render
    // path.join returns '/views/index.html'
});

router.get('/users/:name', function(req, res) {
    // Render automatically looks for the file under the views folder (no need to specify directory).
    // Also no need to specify the extension 'ejs' since the view engine is already set to that in server.js
    // I can pass in object properties to be rendered in the page. I can modify those with CSS.
    res.render('user', { name: req.name }, function(err, html) {
        res.send(html);
    });

    console.log('Welcome ' + req.name + '!'); // changed req.params.name to req.name in router.param
    // log the body object with all its properties listed.
    // console.log(req.body);
});

// For POST, the response will be given in the form of data to whoever made the request. Usually JSON data.
// The parameters that were passed in the request will be accessible through req.body.
// There are 3 ways of passing paremeters to a Node app: 
// Custom url: '/:name'. '/henrique' -> Access it: req.params.name => 'henrique'
// Send it as JSON in a POST request: { name: 'Henrique' }. req.body.name => 'Henrique'
// Use query string in the url: '?name=henrique' -> Access it: req.query.name => 'henrique'
router.post('/users/:name', function(req, res) {

    // req.body stores values submited in a POST request (POST).
    // to get query string parameters, use req.query (GET).
    // Need to require('body-parser') for it to work.
    var pwd = req.body.password;

    if (res.statusCode === 200) {
        res.send('The request has been succesfully received!\n'); // or res.json();
    } else {
        res.send('There seems to have been an error!');
    }

    console.log('You just got a POST request with the following param: \'' + pwd + '\' for the user ' + req.name + '!'); 
});

// router.param used to handle requests for a specific param. Ex: :name, :user, :id, etc
router.param('name', function(req, res, next, name) { 
    var capitalized = name.charAt(0).toUpperCase() + name.slice(1); // capitalize
    req.name = capitalized;
    next();
});

module.exports = router;

