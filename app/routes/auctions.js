var express = require('express');
var Token = require('app/models/token');
var Auction = require('app/models/auction');

var router = express.Router();

// Verify user token.
router.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers['x-access-token'];
    if (!token || !Token.get(token)) {
        return res.status(403).send('Bad access token');
    }
    next();
});

router.get('/', function(req, res) {
    res.json(Auction.get());
});

router.get('/:id', function(req, res) {
    var auction = Auction.get(req.params.id);
    if (!auction) {
        return res.status(404).send('No such auction');
    }
    res.json(auction);
});

router.post('/:id/bid/:amount', function(req, res) {
    var auction = Auction.get(req.params.id);
    if (!auction) {
        return res.status(404).send('No such auction');
    }

    var bid = Auction.bid(req.headers['x-access-token'], auction.id, req.params.amount);
    res.json(bid);
});

module.exports = router;
