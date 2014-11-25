(function() {

    var express = require('express');
    var router = express.Router();
    var secret = require('./secret.js');

    var VoteStore = require('../models/vote_store.js');

    /* GET all the votes from a user. */
    router.get('/', function (req, res) {
        res.json([]);
    });

    /* GET all the votes from a user. */
    router.get('/:userName', secret.secured(), function (req, res) {
        var userName = req.params.userName;
        console.log('Votes for ' + userName);
        VoteStore.getVotesByUserName(userName, function (err, votes) {
            res.json(votes);
        });
    });

    // DELETE all the votes of a user
    router.delete('/:userName', secret.secured(), function (req, res) {
        var userName = req.params.userName;
        VoteStore.deleteVotesByUserName(userName, function (err, votes) {
            res.json(votes);
        });
    });

    module.exports = router;

}());