/**
 * Created by ma-li on 23.10.14.
 */

(function() {
    var jwt = require('jsonwebtoken');
    var express = require('express');
    var crypto = require('crypto');
    var router = express.Router();

    var userStore = require('../models/user_store.js');
    var sessionStore = require('../models/session_store.js');

    var jwtSecret = 'xkfo02fySirnyk&aj4iZkjeo';

    var hashLen = 128;
    var hashIterations = 12000;



    //=====================================================================
    // Helper functions
    //=====================================================================

    function hash(pwd, salt, func) {
        if (3 == arguments.length) {
            crypto.pbkdf2(pwd, salt, hashIterations, hashLen, func);
        } else {
            func = salt;
            crypto.randomBytes(hashLen, function(err, salt){
                if (err) return func(err);
                salt = salt.toString('base64');
                crypto.pbkdf2(pwd, salt, hashIterations, hashLen, function(err, hash){
                    if (err) return func(err);
                    func(null, salt, hash);
                });
            });
        }
    }

    function authenticate(username, password, func) {
        // check if usename and password are given
        if (!username || !password) {
            return func(new Error('Must provide username or password'));
        }

        // check if username exists and password is correct
        userStore.findUser(username, function (err, user) {
            if (err) {
                return func(new Error('User not found'));
            }
            if (user) {
                hash(password, user.salt, function (err, hash) {
                    if (err) return func(err);
                    for (var i = 0, n = hash.length; i < n; i++)
                    {
                        if (hash[i] !== user.hash[i]) {
                            console.log('pw-check: ' + i);
                            func(new Error('invalid password'));
                        }
                    }
                    return func(null, user);
                });
            }
            else {
                return func(new Error('User not found'));
            }
        });
    }

    function userExists(req, res, next) {
        console.log('userExists');
        userStore.findUser(req.body.name, function (err, user) {
            if (user) {
                res.status(400).end('Username already exists');
            }
            else {
                next();
            }
        });
    }

// login
    router.post('/login', function (req, res) {

        var username = req.body.username;
        var password = req.body.password;

        authenticate(username, password, function(err, user) {
            if (err) {
                res.status(401).end('Login failed. Please check your username and password');
            }
            else {
                if (user.blocked) {
                    res.status(401).end('Your account has been blocked. Please contact the administrator');
                }

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
    router.post('/', userExists, function (req, res) {
        var username = req.body.name;
        var password = req.body.password;
        var role = req.body.role;

        hash(password, function (err, salt, hash) {
            if (err) throw err;
            var user = {
                name: username,
                blocked: false,
                role: role,
                registrationDate: new Date().getTime(),
                salt: salt,
                hash: hash};
            userStore.addUser(user, function (err, doc) {
                console.log('addUser', doc);
                res.json(doc);
            })
        });
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
