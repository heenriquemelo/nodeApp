// Good tutorial: https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications

// Note: heroku runs 'npm start' on your node app automatically and also installs the modules
// list on the package.json file. 
// I wasn't being able to get the app running bc I was trying to connect to a DB running in my localhost.
// Obvously, the app crashed. 

var mongoose = require('mongoose'); // loads module.
var db = mongoose.connection; // ??

// Establishes connection to db. If run locally, u must create a new terminal window, and run the db from there.
// The command "mongod --port <port number>" takes care of the work.
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:12345');

// Once the connection is made, execute the callback.
db.once('open', function() {
  console.log("Connected to database");
});

// Creates a set of properties that a certain use may or MAY NOT have.
// Since MongoDB is a NoSQL (not only SQL) database, I'm not restricted to the properties that I specify 
// in the schema. I can add more stuff.
var userSchema = new mongoose.Schema({
  name: String // set type of each property. Ex: String, Number, Boolean, etc.
  // I can also set if the property is unique, etc. Read their API.
});

// Based on the schema, create a certain model.
// Many models can share the same schema. 'Client' could be another model in this case.
var User = mongoose.model('User', userSchema);

// Create a unique instance of the User model. Set its properties.
var henrique = new User({name: 'Henrique'});

// Save the instance of the model to the db. 

henrique.save(function(err, henrique) {
  if (err) {
    console.error(err);
  } else {
    console.log(henrique.name + ' has been added to the database!');
  }

});

// Read data. In this case, display all db items that are instances of the User model.

User.find({}, function(err, allUsers) {
  if (err) {
    console.error(err);
  } else {
    console.log('These are all users:\n' + allUsers);
  }
});

// Assigns the value of require('users.js') in the main file to User.
module.exports = User;