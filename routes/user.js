/**
 * Created by ma-li on 23.10.14.
 */

var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();

var userStore = require('../models/user_store.js');
var sessionStore = require ('../models/session_store.js');

var jwtSecret = 'xkfo02fySirnyk&aj4iZkjeo';

// login
router.post('/login', function(req, res) {

    // check if usename and password are given
    var body = req.body;
    if (!body.username || !body.password) {
        res.status(400).end('Must provide username or password');
    }

    // check if username exists and password is correct
    userStore.findUser(body.username, function (err, user) {
        if (!user || body.password !== user.password) {
            res.status(401).end('Username or password incorrect');
        }
        else {

            // Update User-Info (last-login)
            user.lastLogin = new Date().getTime();
            userStore.updateUser(user.name, user);

            // Authentication succeded: Create and save the session-token and send answer
            var token = jwt.sign({
                username: user.name
            }, jwtSecret);
            var session = {};
            session.token = token;
            session.username = user.name;
            session.role = user.role;
            session.loginDate = new Date().getTime();
            sessionStore.addSession(session, function (err, newSession) {
                if (err) {
                    res.status(500).end('Could not create session');
                }
                else {
                    // Send Answer
                    res.send({
                        token: newSession.token,
                        username: newSession.username
                    });
                }
            });
        }
        console.log("ok: --- ");

    });
});

router.get('/me', function (req, res) {
    var token = (req.headers.authorization).split(' ')[1];
    sessionStore.findSession(token, function(err, session){
        console.log("me: " + session);
        if (!session)
        {
            res.status(401).end('No session found');
        }
        else {
            res.send(session);
        }
    })
});



router.post('/logout', function(req, res) {
    var token = (req.headers.authorization).split(' ')[1];
    sessionStore.removeSession(token, function(err, session){
        console.log('me: ' + session);
            res.send('ok');
    })
});



// Get users list
router.get('/', function(req, res) {
    userStore.getAllUsers(function (err, users) {
        res.json(users);
        console.log('getAllUsers', users);
    });
});

// Get a user
router.get('/:userName', function(req, res) {
    userStore.findUser(req.params.userName, function (err, user) {
        res.json(user);
        console.log('getUser', user);
    });
});

// Appends a new user record
router.post('/', function(req, res) {
    userStore.addUser(req.body, function(err, doc) {
        console.log('addUser',doc);
        res.json(doc);
    })
});

// Updates a user record
router.put('/:userName', function(req, res) {
    userStore.updateUser(req.body, function(err, doc) {
        console.log('addUser',doc);
        res.json(doc);
    })

});

// Deletes a user record
router.delete('/:userName', function(req, res) {

});

router.jwtSecret = jwtSecret;

module.exports = router;


