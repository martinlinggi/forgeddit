(function() {

    function apiRouter(app, io) {
        var express = require('express');
        var router = express.Router();

        var secret = require('./secret.js');
        var ForgedditStore = require('../models/link_store.js');
        var VoteStore = require('../models/vote_store.js');

        /* GET all the links. */
        router.get('/links', function (req, res) {
            ForgedditStore.getAllLinks(function (err, links) {
                res.json(links);
            });
        });

        /* GET one link. */
        router.get('/links/:linkId', function (req, res) {
            var linkId = req.params.linkId;
            ForgedditStore.getLink(linkId, function (err, link) {
                res.json(link);
            });
        });

        // create a link
        router.post('/links', secret.secured(), function (req, res) {
            var time = new Date().getTime();
            var linkData = {};
            linkData.user = req.body.user;
            linkData.title = req.body.title;
            linkData.url = req.body.url;
            linkData.id = linkData.user + '_' + time;
            linkData.group = "test-group";
            linkData.rate = 0;
            linkData.time = time;
            linkData.comments = [];

            ForgedditStore.addLink(linkData, function (err, doc) {
                res.json(doc);
                res.io.route('addLink');
            });
        });

        // votes a link
        router.put('/links/:linkId/vote/', secret.secured(), function (req, res) {
            var vote = req.body.value;
            var userName = req.body.userName;
            var linkId = req.params.linkId;
            ForgedditStore.voteLink(linkId, vote, function (err, numReplaced) {
                VoteStore.doVote(linkId, userName, vote);
                res.json(numReplaced);
                io.emit('updateLink', linkId);
            });
        });

        // add a comment
        router.post('/links/:linkId/comments', secret.secured(), function (req, res) {
            console.log('comment received: ' + req.params.linkId);
            var comment = {};
            comment.text = req.body.text;
            comment.user = req.body.user;
            comment.time = new Date().getTime();
            ForgedditStore.addComment(req.params.linkId, comment, function (err, numReplaced) {
                res.json(numReplaced);
            });
        });
    }

    module.exports = apiRouter;

}());