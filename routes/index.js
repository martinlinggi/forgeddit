(function() {

    var express = require('express');
    var path = require('path');
    var router = express.Router();

    /* GET home page. */
    router.get('/', function (req, res) {
        console.log('/ -route: ');
        console.log(path.join(__dirname, '../app'));
        res.sendFile('index.html');
    });

    module.exports = router;

}());