var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('app/config');
var User = require('app/models/user');
var admin = require('app/routes/admin.js');

mongoose.connect(config.database);

// Use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// basic route
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + config.port + '/api');
});

app.use('/admin', admin);

// Start the server.
app.listen(config.port);
