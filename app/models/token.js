module.exports = {

    tokens: {},

    set: function(token, balance) {
        this.tokens[token] = {
            token: token,
            balance: balance
        };
    },

    get: function(token) {
        if (token) {
            return this.tokens[token];
        }
        else {
            return this.tokens;
        }
    }
};

