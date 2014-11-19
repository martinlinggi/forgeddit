/**
 * Created by martinlinggi on 30.06.14.
 */

(function() {

    var DataStore = require('nedb');

    var db = new DataStore({filename: path.join(__dirname, '../db/link.db'), autoload: true});


    function insertInitialLinks() {
        db.insert({
            "title": "Sony streamt Spiele auf Fernseher",
            "url": "http://www.heise.de/newsticker/meldung/E3-Sony-streamt-Spiele-auf-Fernseher-zeigt-neue-PS4-Titel-2218073.html",
            "user": "MaLiMaster",
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

        db.insert({
            "title": "Kurios gesammelt",
            "url": "http://www.heise.de/newsticker/meldung/Messesplitter-Kurioses-und-Bemerkenswertes-von-der-Computex-2217665.html",
            "user": "MaLiMaster",
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

        db.insert({
            "title": "Giraffes in love",
            "url": "http://www.freemake.com/blog/wp-content/uploads/2013/07/animated-gifs-giraffes-51.gif",
            "user": "MaLiMaster",
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

        db.insert({
            "title": "Möchtegern Hausbauer",
            "url": "http://i.imgur.com/RJqRpbM.jpg",
            "user": "MaLiMaster",
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
        db.find({}, function(err, links) {
            if (!err && links.length == 0) {
                insertInitialLinks();
            }
        })
    }

    function getAllLinks(func) {
        console.log('forgedditStore - getAllLinks()');
        db.find({title: { $exists: true }}, func);
    }

    function addLink(link, func) {
        db.insert(link, func);
        console.log('forgedditStore - addLink()');
    }

    function voteLink(linkId, vote, func) {
        console.log('id ' + linkId);
        db.findOne({_id: linkId}, function (err, link) {
            var newRate = link.rate + vote;
            db.update({_id: linkId}, {$set: {rate: newRate}}, {multi: false}, func);
        });
    }

    function addComment(linkId, comment, func) {
        db.update({ _id: linkId }, { $push: { comments: comment } }, {}, func);
    }

    // public API
    var ForgedditStore = {};
    ForgedditStore.getAllLinks = getAllLinks;
    ForgedditStore.addLink = addLink;
    ForgedditStore.voteLink = voteLink;
    ForgedditStore.addComment = addComment;

    module.exports = ForgedditStore;

}());