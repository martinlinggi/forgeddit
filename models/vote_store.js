/**
 * @brief Database functions for the votes
 *
 * @file vote_store.js
 * @author martin linggi
 */

(function() {

    //=====================================================================
    // private variables
    //=====================================================================
    var DataStore = require('nedb');
    var path = require('path');

    var voteDb = new DataStore({filename: path.join(__dirname, '../db/vote.db')});
    voteDb.loadDatabase();

    function getVoteByLinkAndUser(linkId, userName, func) {
        voteDb.findOne({ $and: [{linkId: linkId}, {userName: userName}]}, func);
    }

    function removeVoteByLinkAndUser(linkId, userName, func) {
        voteDb.remove({ $and: [{linkId: linkId}, {}, {userName: userName}]}, func);
    }

    function insertVote(vote, func) {
        voteDb.insert(vote, func);
    }

    function doVote(linkId, userName, value) {
        var vote = {linkId: linkId, userName: userName, vote: value};
        getVoteByLinkAndUser(linkId, userName, function(err, voteDb) {
            if (voteDb) {
                if (voteDb.value !== value) {
                    removeVoteByLinkAndUser(linkId, userName, function(err, numRemoved) {
                    });
                }
            }
            else {
                insertVote(vote, function(err, voteDb) {
                });
            }
        })
    }

    function getVotesByUserName(userName, func) {
        voteDb.find({userName: userName}, func);
    }

    function deleteVotesByUserName(userName, func) {
        voteDb.find({userName: userName}, {multi: true}, func);
    }

    var VoteStore = {};
    VoteStore.doVote = doVote;
    VoteStore.getVotesByUserName = getVotesByUserName;
    VoteStore.deleteVotesByUserName = deleteVotesByUserName;

    module.exports = VoteStore;

}());

