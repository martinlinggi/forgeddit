

(function() {
    var DataStore = require('nedb');
    var path = require('path');


    var sessionDb = new DataStore({filename: path.join(__dirname, '../db/session.db')});
    sessionDb.loadDatabase();

    var SessionStore = {};

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

    // Public API
    SessionStore.findSession = findSession;
    SessionStore.addSession = addSession;
    SessionStore.deleteSession = deleteSession;

    module.exports = SessionStore;
}());