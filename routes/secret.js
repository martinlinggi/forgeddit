


(function() {
    var expressJwt = require('express-jwt');
    var jsonToken = require('jsonwebtoken');
    var crypto = require('crypto');

    var jwtSecret = 'xkfo02fySirnyk&aj4iZkjeo';

    var hashLen = 128;
    var hashIterations = 12000;

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

    function createToken(userName) {
        return jsonToken.sign({
            username: userName
        }, jwtSecret);
    }

    function secured() {
        return expressJwt({secret:jwtSecret});
    }

    var secret = {};
    secret.hash = hash;
    secret.createToken = createToken;
    secret.secured = secured;

    module.exports = secret;



}());
