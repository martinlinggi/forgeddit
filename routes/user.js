/**
 * Created by ma-li on 23.10.14.
 */

var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();

var ForgedditStore = require('../models/linkStore.js');

var jwtSecret = 'xkfo02fySirnyk&aj4iZkjeo';

// login
router.post('/login', authenticate, function(req, res) {
    console.log('login', req.body);

    var body = req.body;
    var token = jwt.sign({
        username: body.username
    }, jwtSecret);
    res.send({
        token: token,
        user: body.username
    });
});

router.post('/logout', function(req, res) {
    res.json('ok');
});

// Get users list
router.get('/', function(req, res) {
    ForgedditStore.getAllUsers(function (err, docs) {
        res.json(docs);
        console.log('getAllUsers', docs);
    });
});

// Appends a new user record
router.post('/', function(req, res) {

});

// Updates a user record
router.put('/:userId', function(req, res) {

});

// Deletes a user record
router.delete('/:userId', function(req, res) {

});

router.jwtSecret = jwtSecret;

module.exports = router;


// UTIL FUNCTIONS

function authenticate(req, res, next) {
    console.log('authenticate');
    var body = req.body;
    if (!body.username || !body.password) {
        res.status(400).end('Must provide username or password');
    }
    var user = {};
    ForgedditStore.findUser(body.username, function (err, dbuser) {
        console.log('dbuser', dbuser);
        user = dbuser;
        if (!dbuser || body.password !== user.password) {
            res.status(401).end('Username or password incorrect');
        }
        next();
    });
}
