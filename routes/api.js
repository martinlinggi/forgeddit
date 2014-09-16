var express = require('express');
var router = express.Router();

var linkStore = require('../models/linklist.js');

var version = 0;

/* GET all the links. */
router.get('/', function(req, res) {
    linkStore.getAllLinks(function (err, docs) {
        res.json(docs);
    });
});

// create a link
router.route('/links')
    .post(function(req, res) {

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

    linkStore.addLink(linkData, function(err, doc) {
        res.json(doc);
    });

    version++;

});

// votes a link
router.route('/links/:linkId')
    .get(function(req, res) {

    })
    .put(function(req, res) {
        console.log('voting received: ' + req.params.linkId);
        var vote = req.body.vote;
        linkStore.voteLink(req.params.linkId, vote, function(err, numReplaced) {
            res.json(numReplaced);
        });

        version++;

    });

// votes a link
router.route('/links/:linkId/comments')
    .post(function(req, res) {
        console.log('comment received: ' + req.params.linkId);
        var comment = {};
        comment.text = req.body.text;
        comment.user = req.body.user;
        comment.time = new Date().getTime();
        linkStore.addComment(req.params.linkId, comment, function(err, numReplaced) {
            res.json(numReplaced);
        });

        version++;

    });

router.get('/version', function(req, res) {
    res.json(version);
});



module.exports = router;
