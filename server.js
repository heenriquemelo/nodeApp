// Separate routers that directs the http requests to different urls from server config and deployment.
// The server.js file takes care of the server settings.
// require('serve-favicon') if I want o serve a favicon.
// The variables below get assigned to whatever got assigned to module.exports in the module file.

var express = require('express'), // loads the module express, stored in the node_modules folder.
    server = express(), // executes the function inside the express module. I can create create many of these.
    routes = require('./routers'), // automatically looks for index.js under the routers folder.
    path = require('path'), // Requires node module 'path' so I can make path operations such as path.join(path1, path2).
    mongoose = require('mongoose'), // library for MongoDB, works well with Node.JS
    morgan = require('morgan'), // logger module. Logs HTTP requests to the console when in dev mode.
    User = require('./models/users.js'); // load the User model from the db configuration file.

// server.set takes care of settings.
// I can get these settings back by writing server.get(). To get the port number I'd use server.get('port').
// If the port is specified by the server, use that port, or else use port 8888.
server.set('port', process.env.PORT || 8888);
// Set the views folder to '/views' (name of the folder I created).
// __dirname is a variable that returns the directory I'm currently in.
// In this case, '/'
server.set('views', path.join(__dirname, 'views'));
// Use ejs as a template engine for the front-end.
server.set('view engine', 'ejs');
// Grab evrything in the '/public' folder and store it statically under the '/public' path.
// In this case, I stored it in the path '/public', so that's what I use when trying to 
// have access to its contents from another file.
// express.static is a middleware already included with express.
server.use('/public', express.static(__dirname + '/public'));

server.use(morgan('dev')); // dev mode

// Use the routes that you created in the other document that are instatiated in the 'routes' variable.
// Can be used after any sub-path, for example, '/test'
// "mount the router on the app".
server.use('/', routes);

// Listens for connections in the specified host and port.
// You can pass all callback function that'll you be executed after server.listen is executed.
server.listen(server.get('port'), function() {
  console.log('Listening on port: ' + server.get('port'));
});



// If ur stuck, go to the JS office hours

// Steps: 
// Display HTML (done)
// Serve CSS file and link to html file (done)
// Use POST method (done)
// Set up ejs (done)
// Use ejs to modularize views - write foorter/header separate from main page
// Learn to deploy on Heroku (~)
// Host it for free on heroku
// Set up mongodb mongoose (done)
// Use mongoose to persist user data remotely - heroku
// Pull that user data from the db and display it on the page
// Implement socket.io 
// Integrate Stripe API calls
// AJAX calls (pure JS and JQuery)
// Delete past AJAX calls and use BackBone.JS now
// Cookies (express middleware)
// Consider switching from EJS to Handlebars
// Node file system (fs) module
// write down doubts - talk to Ian Sibner