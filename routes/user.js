/**
 * Created by ma-li on 23.10.14.
 */

(function() {
    var express = require('express');
    var router = express.Router();

    var secret = require('./secret.js');
    var userStore = require('../models/user_store.js');
    var sessionStore = require('../models/session_store.js');

    //=====================================================================
    // Helper functions
    //=====================================================================

    function authenticate(username, password, func) {
        // check if usename and password are given
        if (!username || !password) {
            return func(new Error('Please provide username or password.'));
        }

        // check if username exists and password is correct
        userStore.findUser(username, function (err, user) {
            if (err) {
                return func(new Error('User not found'));
            }
            if (user) {
                secret.hash(password, user.salt, function (err, hash) {
                    if (err) return func(err);
                    for (var i = 0, n = hash.length; i < n; i++)
                    {
                        if (hash[i] !== user.hash[i]) {
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
        userStore.findUser(req.body.name, function (err, user) {
            if (user) {
                res.status(400).end('Username already exists. Please choose another one.');
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
                res.status(401).end('Login failed. Please check your username and password.');
            }
            else {
                if (user.blocked) {
                    res.status(401).end('Your account has been blocked. Please contact the administrator.');
                }

                // Update User-Info (last-login)
                user.lastLogin = new Date().getTime();
                userStore.updateUser(user.name, user, function(err, numReplaced) {
                    if (err) {
                        console.log('user update "last-login" failed: '+ user.name);
                    }
                    else {
                        console.log('update "last-login" successful: ' + user.name + ' ' + numReplaced)
                    }
                });

                // Authentication succeded: Create and save the session-token and send answer
                var token = secret.createToken(user.name);
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
            if (!session) {
                res.status(401).end('No session found');
            }
            else {
                res.send(session);
            }
        })
    });


    router.get('/logout', function (req, res) {
        var token = (req.headers.authorization).split(' ')[1];
        sessionStore.removeSession(token, function (err, session) {
            res.send('ok');
        })
    });


// Get users list
    router.get('/', secret.secured(), function (req, res) {
        userStore.getAllUsers(function (err, users) {
            res.json(users);
        });
    });

// Get a user
    router.get('/:userName', secret.secured(), function (req, res) {
        userStore.findUser(req.params.userName, function (err, user) {
            res.json(user);
        });
    });

// Appends a new user record
    router.post('/', userExists, function (req, res) {
        var username = req.body.name;
        var password = req.body.password;
        var role = req.body.role;

        secret.hash(password, function (err, salt, hash) {
            if (err) throw err;
            var user = {
                name: username,
                blocked: false,
                role: role,
                registrationDate: new Date().getTime(),
                salt: salt,
                hash: hash};
            userStore.addUser(user, function (err, doc) {
                res.json(doc);
            })
        });
    });

// Updates a user record
    router.put('/:userName', secret.secured(), function (req, res) {
        var username = req.params.userName;
        userStore.updateUser(username, req.body, function (err, doc) {
            res.json(doc);
        })

    });

// Deletes a user record
    router.delete('/:userName', secret.secured(), function (req, res) {
        var username = req.params.userName;
        userStore.deleteUser(username, function(err, numRemoved) {
            res.json(numRemoved);
        })

    });

    module.exports = router;

}());
