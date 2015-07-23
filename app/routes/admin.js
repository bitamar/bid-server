var express = require('express');
var config = require('app/config');
var Token = require('app/models/token');
var Auction = require('app/models/auction');

// get an instance of the router for api routes
var router = express.Router();

// Verify admin token.
router.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers['x-access-token'];
    if (!token || token != config.adminToken) {
        return res.status(403).send('Bad access token');
    }
    next();
});

// Tokens
router.post('/tokens', function(req, res) {
    if (!req.body.token) {
        return res.status(403).send('Missing token in body')
    }
    Token.set(req.body.token, req.body.balance);
    res.json(Token.get(req.body.token));
});

router.get('/tokens', function(req, res) {
    var tokens = Token.get();
    res.json(tokens);
});

// Auctions
router.post('/auctions', function(req, res) {
    console.log(req.body);
    if (!req.body.auction_id) {
        return res.status(403).send('Missing auction_id in body');
    }
    Auction.set(req.body.auction_id, req.body.price);
    res.json(Auction.get(req.body.auction_id));
});

router.get('/auctions', function(req, res) {
    var auctions = Auction.get();
    res.json(auctions);
});

module.exports = router;
