var express = require('express');
var router = express.Router();

var ForgedditStore = require('../models/linkStore.js');

/* GET all the links. */
router.get('/links', function(req, res) {
    ForgedditStore.getAllLinks(function (err, docs) {
        res.json(docs);
    });
});

// create a link
router.post('/links', function(req, res) {

    var time = new Date().getTime();
    var linkData = {};
    linkData.user = req.body.user;
    linkData.title = req.body.title;
    linkData.url = req.body.url;
    linkData.id = linkData.user + '_' + time;
    linkData.group = "test-group";
    linkData.rate  =0;
    linkData.time = time;
    linkData.comments = [];

    ForgedditStore.addLink(linkData, function(err, doc) {
        res.json(doc);
    });

});

// votes a link
router.put('/links/:linkId/vote', function(req, res) {
    console.log('voting received: ', linkId, req.body.value);
    var vote = req.body.value;
    var linkId = req.params.linkId;
    ForgedditStore.voteLink(linkId, vote, function(err, numReplaced) {
            res.json(numReplaced);
        });
    });

// votes a link
router.route('/links/:linkId/comments')
    .post(function(req, res) {
        console.log('comment received: ' + req.params.linkId);
        var comment = {};
        comment.text = req.body.text;
        comment.user = req.body.user;
        comment.time = new Date().getTime();
        ForgedditStore.addComment(req.params.linkId, comment, function(err, numReplaced) {
            res.json(numReplaced);
        });

    });

module.exports = router;
