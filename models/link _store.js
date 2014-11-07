/**
 * Created by martinlinggi on 30.06.14.
 */


var DataStore = require('nedb');

var db = new DataStore();

var ForgedditStore = {};

db.insert({
    "title" : "Sony streamt Spiele auf Fernseher",
    "url" : "http://www.heise.de/newsticker/meldung/E3-Sony-streamt-Spiele-auf-Fernseher-zeigt-neue-PS4-Titel-2218073.html",
    "user" : "MaLiMaster",
    "group" : "fun",
    "rate" : 432,
    "time" : 1308774240669,
    "comments": [
        {"user" : "tinMan", "time": 1308774240669, "text": "Hallo"},
        {"user" : "MaLiMaster", "time": 1308774240669, "text": "Comment"}]
}, function(err, doc){
    if (err) {
        console.dir(err);
    }
    else {
        console.dir(doc);
    }
});

db.insert({
    "title" : "Kurios gesammelt",
    "url" : "http://www.heise.de/newsticker/meldung/Messesplitter-Kurioses-und-Bemerkenswertes-von-der-Computex-2217665.html",
    "user" : "MaLiMaster",
    "group" : "fun",
    "rate" : 15,
    "time" : 1308124245826,
    "comments": []
}, function(err, doc){
    if (err) {
        console.dir(err);
    }
    else {
        console.dir(doc);
    }
});

db.insert({
    "title" : "Giraffes in love",
    "url" : "http://www.freemake.com/blog/wp-content/uploads/2013/07/animated-gifs-giraffes-51.gif",
    "user" : "MaLiMaster",
    "group" : "fun",
    "rate" : 578,
    "time" : 1309324245826,
    "comments": []
}, function(err, doc){
    if (err) {
        console.dir(err);
    }
    else {
        console.dir(doc);
    }
});

db.insert({
    "title" : "Möchtegern Hausbauer",
    "url" : "http://i.imgur.com/RJqRpbM.jpg",
    "user" : "MaLiMaster",
    "group" : "fun",
    "rate" : 22,
    "time" : 1329424245826,
    "comments": [
        {"user" : "tinMan", "time": 1308774240669, "text": "Hallo"}]
}, function(err, doc){
    if (err) {
        console.dir(err);
    }
    else {
        console.dir(doc);
    }
});

db.insert({
    "name": "admin",
    "password": "admin_secret",
    "role": "Administrator",
    "active": true,
    "registration_date": new Date(2014,08,01,15,34,0,0),
    "last_login": new Date(2014,10,20,08,21,0,0)
}, function(err, doc) {
    if (err) {
        console.dir(err);
    }
    else {
        console.dir(doc);
    }
});

db.insert({
    "name": "tinMan",
    "password": "tinMan",
    "role": "User",
    "active": true,
    "registration_date": new Date(2014,10,21,21,28,0,0),
    "last_login": new Date(2014,10,21,21,28,0,0)
}, function(err, doc) {
    if (err) {
        console.dir(err);
    }
    else {
        console.dir(doc);
    }
});

db.insert({
    "name": "MaliMaster",
    "password": "MaliMaster",
    "role": "User",
    "active": true,
    "registration_date": new Date(2014,09,3,14,47,0,0),
    "last_login": new Date(2014,11,20,13,32,56,0)
}, function(err, doc) {
    if (err) {
        console.dir(err);
    }
    else {
        console.dir(doc);
    }
});

ForgedditStore.getAllLinks = function(func) {
    console.log('forgedditStore - getAllLinks()');
    db.find({title: { $exists: true }}, func);
};

ForgedditStore.addLink = function(link, func) {
    db.insert(link, func);
    console.log('forgedditStore - addLink()');
};

ForgedditStore.voteLink = function(linkId, vote, func) {
    console.log('id ' + linkId);
    db.findOne({_id: linkId}, function (err, link) {
        var newRate = link.rate + vote;
        db.update({_id: linkId}, {$set: {rate: newRate}}, {multi: false}, func);
    });
};

ForgedditStore.addComment = function(linkId, comment, func) {
    db.update({ _id: linkId }, { $push: { comments: comment } }, {}, func);
};

// User related functions
ForgedditStore.getAllUsers = function(func) {
    console.log('forgedditStore - getAllUsers()');
    db.find({name: { $exists: true }}, func);
};

ForgedditStore.findUser = function(name, func) {
    console.log('forgedditStore - findUser() ' + name);
    db.findOne({name: name }, func);
};


module.exports = ForgedditStore;
