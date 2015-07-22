module.exports = {

    tokens: {},

    set: function(token) {
        this.tokens[token] = {
            token: token,
            balance: 123
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

