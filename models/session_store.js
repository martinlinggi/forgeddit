/**
 * @brief Database functions for the session-Management
 *
 * @file session_store.js
 * @author martin linggi
 */


(function() {

    //=====================================================================
    // private variables
    //=====================================================================
    var DataStore = require('nedb');
    var path = require('path');

    var sessionDb = new DataStore({filename: path.join(__dirname, '../db/session.db'), autoload: true});

    //=====================================================================
    // private functions
    //=====================================================================
    function findSession(token, func) {
        console.log('token: ' + token);
        sessionDb.findOne({token: token}, func);
    }

    function addSession(session, func) {
        sessionDb.insert(session, func);
    }

    function deleteSession(token, func) {
        sessionDb.remove({token: token}, {}, func);
    }

    //=====================================================================
    // public API
    //=====================================================================
    var SessionStore = {};
    SessionStore.findSession = findSession;
    SessionStore.addSession = addSession;
    SessionStore.deleteSession = deleteSession;

    module.exports = SessionStore;
}());