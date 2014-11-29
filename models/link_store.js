/**
 * @brief Database functions for the links
 *
 * @file link_store.js
 * @author martin linggi
 */

(function() {

    //=====================================================================
    // private variables
    //=====================================================================
    var DataStore = require('nedb');
    var path = require('path');

    var linkDb = new DataStore({filename: path.join(__dirname, '../db/link.db')});
    linkDb.loadDatabase();

    //=====================================================================
    // private functions
    //=====================================================================
    function insertInitialLinks() {
        linkDb.insert({
            "title": "Sony streamt Spiele auf Fernseher",
            "url": "http://www.heise.de/newsticker/meldung/E3-Sony-streamt-Spiele-auf-Fernseher-zeigt-neue-PS4-Titel-2218073.html",
            "isImage": false,
            "user": "admin",
            "group": "fun",
            "rate": 432,
            "time": 1308774240669,
            "comments": [
                {"user": "tinMan", "time": 1308774240669, "text": "Hallo"},
                {"user": "MaLiMaster", "time": 1308774240669, "text": "Comment"}
            ]
        }, function (err, doc) {
            if (err) {
                console.dir(err);
            }
            else {
                console.log('Link: "' + doc.title + '" added');
            }
        });

        linkDb.insert({
            "title": "Kurios gesammelt",
            "url": "http://www.heise.de/newsticker/meldung/Messesplitter-Kurioses-und-Bemerkenswertes-von-der-Computex-2217665.html",
            "isImage": false,
            "user": "admin",
            "group": "fun",
            "rate": 15,
            "time": 1308124245826,
            "comments": []
        }, function (err, doc) {
            if (err) {
                console.dir(err);
            }
            else {
                console.log('Link: "' + doc.title + '" added');
            }
        });

        linkDb.insert({
            "title": "Giraffes in love",
            "url": "http://www.freemake.com/blog/wp-content/uploads/2013/07/animated-gifs-giraffes-51.gif",
            "isImage": true,
            "user": "user",
            "group": "fun",
            "rate": 578,
            "time": 1309324245826,
            "comments": []
        }, function (err, doc) {
            if (err) {
                console.dir(err);
            }
            else {
                console.log('Link: "' + doc.title + '" added');
            }
        });

        linkDb.insert({
            "title": "Möchtegern Hausbauer",
            "url": "http://i.imgur.com/RJqRpbM.jpg",
            "isImage": true,
            "user": "user",
            "group": "fun",
            "rate": 22,
            "time": 1329424245826,
            "comments": [
                {"user": "tinMan", "time": 1308774240669, "text": "Hallo"}
            ]
        }, function (err, doc) {
            if (err) {
                console.dir(err);
            }
            else {
                console.log('Link: "' + doc.title + '" added');
            }
        });
    }

    function initDb()
    {
        linkDb.find({}, function(err, links) {
            if (!err && links.length == 0) {
                insertInitialLinks();
            }
        })
    }

    function getAllLinks(func) {
        console.log('forgedditStore - getAllLinks()');
        linkDb.find({}, func);
    }

    function getLink(id, func) {
        console.log('forgedditStore - getLink()');
        linkDb.findOne({_id: id}, func);
    }

    function addLink(link, func) {
        linkDb.insert(link, func);
        console.log('forgedditStore - addLink()');
    }

    function updateLink(linkId, linkData, func) {
        linkDb.update({_id: linkId}, {$set: linkData}, {multi:false}, func);
        console.log('forgedditStore - updateLink()');
    }

    function deleteLink(linkId, func) {
        linkDb.remove({_id: linkId}, {}, func);
    }

    function voteLink(linkId, vote, func) {
        console.log('id ' + linkId);
        linkDb.findOne({_id: linkId}, function (err, link) {
            var newRate = link.rate + vote;
            linkDb.update({_id: linkId}, {$set: {rate: newRate}}, {multi: false}, func);
        });
    }

    function addComment(linkId, comment, func) {
		console.log('forgedditStore: add comment to ' + linkId + ' comment:' + comment);
        linkDb.update({ _id: linkId }, { $push: { comments: comment } }, {multi: false}, func);
    }

    initDb();

    //=====================================================================
    // public API
    //=====================================================================
    var ForgedditStore = {};
    ForgedditStore.getAllLinks = getAllLinks;
    ForgedditStore.getLink = getLink;
    ForgedditStore.addLink = addLink;
    ForgedditStore.updateLink = updateLink;
    ForgedditStore.deleteLink = deleteLink;
    ForgedditStore.voteLink = voteLink;
    ForgedditStore.addComment = addComment;

    module.exports = ForgedditStore;

}());