module.exports = {

    auctions: {},

    set: function(auctionId, price) {
        this.auctions[auctionId] = {
            id: auctionId,
            price: price,
            bids: []
        };
    },

    get: function(auctionId) {
        if (auctionId) {
            return this.auctions[auctionId];
        }
        else {
            return this.auctions;
        }
    },

    bid: function(userToken, auctionId, amount) {
        var auction = this.get(auctionId);
        if (!auction) {
            throw new Error('Auction not found');
        }

        if (amount <= auction.price) {
            throw new Error('Amount too low. Current price is ' + auction.price);
        }

        // Push the new bid.
        var bid = {token: userToken, amount: amount};
        auction.bids.push(bid);
        // Update the auction price.
        auction.price = amount

        return bid;
    }
};

