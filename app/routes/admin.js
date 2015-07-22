var express = require('express');
var config = require('app/config');
var Token = require('app/models/token');

// get an instance of the router for api routes
var router = express.Router();


// Verify router token.
router.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers['x-access-token'];
    if (!token || token != config.adminToken) {
        return res.status(403).send('Bad access token');
    }
    next();
});

// Set a new token.
router.post('/tokens', function(req, res) {
    if (!req.body.token) {
        return res.status(403).send('Missing token in body');
    }
    Token.set(req.body.token);
    res.json(Token.get(req.body.token));
});

// Get all tokens.
router.get('/tokens', function(req, res) {
    var tokens = Token.get();
    res.json(tokens);
});

module.exports = router;
