var express = require('express');
var ParseDashboard = require('parse-dashboard');
var Parse = require('parse/node');

var dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": "http://localhost:1337/api",
      "appId": "final",
      "masterKey": "master",
      "appName": "Hashflow Workflow System"
    }
  ]
});

var app = express();

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

// Initialize Parse Server
Parse.initialize('final', 'jspass');
Parse.serverURL = 'http://localhost:1337/api';

// Create a new user
var user = new Parse.User();
user.set('username', 'hashfloww@gmail.com');
user.set('password', 'wkx5iab81lzu');
user.set('role', 'moderator');
user.set('name', 'Hashflow');
user.set('address', '123 Elm St Metro Manila Quezon City, 1800')
user.set('contact', '09123456789');

user.save()
  .then((savedUser) => {
    console.log('New user created:', savedUser.id);
  })
  .catch(() => {
  });


var httpServer = require('http').createServer(app);
httpServer.listen(4040);
console.log("Parse Dashboard is now running at http://localhost:4040/dashboard");

module.exports = {app, }