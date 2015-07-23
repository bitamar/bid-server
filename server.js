var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var mongoose = require('mongoose');

var config = require('app/config');
//var User = require('app/models/user');

var adminRoutes = require('app/routes/admin');
var auctionsRoutes = require('app/routes/auctions');

//mongoose.connect(config.database);

// Parse request body.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
app.use('/admin', adminRoutes);
app.use('/auctions', auctionsRoutes);

// Start the server.
app.listen(config.port);

// Dummy content.
var Token = require('app/models/token');
var Auction = require('app/models/auction');
Token.set('user1', 200);
Token.set('user2', 600);
Auction.set(1, 100);
Auction.set(2, 50);