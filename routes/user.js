/**
 * Created by ma-li on 23.10.14.
 */

(function() {
    var jwt = require('jsonwebtoken');
    var express = require('express');
    var router = express.Router();

    var userStore = require('../models/user_store.js');
    var sessionStore = require('../models/session_store.js');

    var jwtSecret = 'xkfo02fySirnyk&aj4iZkjeo';

// login
    router.post('/login', function (req, res) {

        // check if usename and password are given
        var body = req.body;
        if (!body.username || !body.password) {
            console.log('status: 400');
            res.status(400).end('Must provide username or password');
        }

        // check if username exists and password is correct
        userStore.findUser(body.username, function (err, user) {
            console.log('findUser: ' + body.username);
            if (!user || body.password !== user.password) {
                console.log('status: 401');
                res.status(401).end('Username or password incorrect');
            }
            else if(user.blocked) {
                res.status(401).end('User account is blocked');
            }
            else {

                // Update User-Info (last-login)
                user.lastLogin = new Date().getTime();
                userStore.updateUser(user.name, user, function(err, numReplaced) {
                    if (err) {
                        console.log('user update failed: '+ user.name);
                    }
                    else {
                        console.log('update successful: ' + user.name + ' ' + numReplaced)
                    }
                });

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
                        console.log('status: 500');
                        res.status(500).end('Could not create session');
                    }
                    else {
                        // Send Answer
                        console.log('ok!');
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
        sessionStore.findSession(token, function (err, session) {
            console.log("me: " + session);
            if (!session) {
                res.status(401).end('No session found');
            }
            else {
                res.send(session);
            }
        })
    });


    router.post('/logout', function (req, res) {
        var token = (req.headers.authorization).split(' ')[1];
        sessionStore.removeSession(token, function (err, session) {
            console.log('me: ' + session);
            res.send('ok');
        })
    });


// Get users list
    router.get('/', function (req, res) {
        userStore.getAllUsers(function (err, users) {
            res.json(users);
            console.log('getAllUsers', users);
        });
    });

// Get a user
    router.get('/:userName', function (req, res) {
        userStore.findUser(req.params.userName, function (err, user) {
            res.json(user);
            console.log('getUser', user);
        });
    });

// Appends a new user record
    router.post('/', function (req, res) {
        userStore.addUser(req.body, function (err, doc) {
            console.log('addUser', doc);
            res.json(doc);
        })
    });

// Updates a user record
    router.put('/:userName', function (req, res) {
        var username = req.params.userName;
        userStore.updateUser(username, req.body, function (err, doc) {
            console.log('addUser', doc);
            res.json(doc);
        })

    });

// Deletes a user record
    router.delete('/:userName', function (req, res) {
        var username = req.params.userName;
        userStore.deleteUser(username, function(err, numRemoved) {
            res.json(numRemoved);
        })

    });

    router.jwtSecret = jwtSecret;

    module.exports = router;

}());
