var express = require('express');
var router = express.Router();

var data =
    [{  "id" : 1,
        "title" : "Sony streamt Spiele auf Fernseher",
        "url" : "http://www.heise.de/newsticker/meldung/E3-Sony-streamt-Spiele-auf-Fernseher-zeigt-neue-PS4-Titel-2218073.html",
        "user" : "MaLiMaster",
        "group" : "fun",
        "rate" : 432,
        "time" : 1308774240669,
        "comments": [
            {"user" : "tinMan", "time": 1308774240669, "text": "Hallo"},
            {"user" : "MaLiMaster", "time": 1308774240669, "text": "Comment"}]
    },
        {   "id" : 2,
            "title" : "Kurios gesammelt",
            "url" : "http://www.heise.de/newsticker/meldung/Messesplitter-Kurioses-und-Bemerkenswertes-von-der-Computex-2217665.html",
            "user" : "MaLiMaster",
            "group" : "fun",
            "rate" : 15,
            "time" : 1308124245826,
            "comments": []
        },
        {  "id" : 3,
            "title" : "Möchtegern Hausbauer",
            "url" : "http://i.imgur.com/RJqRpbM.jpg",
            "user" : "MaLiMaster",
            "group" : "fun",
            "rate" : 22,
            "time" : 1308124245826,
            "comments": [
                {"user" : "tinMan", "time": 1308774240669, "text": "Hallo"}]
        },
        {   "id" : 4,
            "title" : "Giraffes in love",
            "url" : "http://www.freemake.com/blog/wp-content/uploads/2013/07/animated-gifs-giraffes-51.gif",
            "user" : "MaLiMaster",
            "group" : "fun",
            "rate" : 578,
            "time" : 1308124245826,
            "comments": []
        }];


/* GET all the links. */
router.get('/', function(req, res) {
  res.json(data);
});

// create a link
router.route('/links').post(function(req, res) {

    console.dir(req.body);
    linkData = {};
    console.dir('1');
    var time = new Date().getTime();
    linkData.user = req.bodys.user;
    linkData.title = req.bodys.title;
    linkData.url = req.bodys.url;
    console.dir('2');
    linkData.id = linkData.user + '_' + time;
    console.dir('3');
    linkData.group = "test-group";
    console.dir('4');
    linkData.rate  =0;
    console.dir('5');
    linkData.time = time;
    console.dir('6');
    linkData.comments = [];
    console.dir('7');
    console.dir(linkData);

    data.push(linkData);
    console.dir(data);

    res.json({message: 'Link created'});
});


module.exports = router;
