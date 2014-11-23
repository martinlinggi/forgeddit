/**
 * @brief Database functions for the user-management
 *
 * @file user_store.js
 * @author martin linggi
 */

(function() {

    //=====================================================================
    // private variables
    //=====================================================================
    var DataStore = require('nedb');
    var path = require('path');


    var userDb = new DataStore({filename: path.join(__dirname, '../db/user.db')});
    userDb.loadDatabase();

    //=====================================================================
    // private functions
    //=====================================================================
    userDb.findOne({"name": "admin"}, function (err, admin) {
        if (admin === null) {
            userDb.insert({
                    "name":"admin",
                    "blocked":false,
                    "role":"Administrator",
                    "salt":"oaXCEerc/V5TtWn4t4c2pHQGahYdDrtDeg6oEkDmyWjqWnC7ndePDNVLO5y/hizKDbS6qZstKxRkI/ZsV3Svc7rfrX975SyyBPOsIwg+QGXQbs/j/k7m8XFSblFyVBTsf3pB6kDyEpeEq+MOdBhfWwmhNA3osODyYdo1Z3GeHL8=",
                    "hash":[200,90,30,104,97,168,19,107,21,52,17,152,137,142,253,17,194,38,121,130,49,25,10,178,147,58,86,27,220,11,94,5,238,83,182,122,170,73,44,198,22,69,141,4,86,0,54,64,125,28,233,157,56,133,175,196,14,88,193,94,214,116,86,237,248,175,102,71,102,155,23,237,180,135,211,164,24,118,7,130,5,2,233,119,19,208,229,135,48,168,162,180,83,89,245,60,200,31,127,219,81,209,165,5,57,39,225,187,129,134,245,67,157,246,216,15,66,12,116,31,110,61,230,179,17,59,86,131]}
                , function (err, doc) {
                if (err) {
                    console.dir(err);
                }
                else {
                    console.log('user admin created');
                }
            });

        }
        else {
            console.log('user admin already exists: Nothing to do');
        }
    });

    function getAllUsers(func) {
        console.log('UserStore - getAllUsers()');
        userDb.find({}, func);
    }

    function findUser(name, func) {
        console.log('UserStore - findUser()' + name);
        console.dir(userDb);
        userDb.findOne({name: name}, func);
    }

    function addUser(user, func) {
        console.log('UserStoreUserStore - addUser()');
        userDb.insert(user, func);
    }

    function updateUser(name, user, func) {
        console.log('UserStoreUserStore - updateUser()');
        userDb.update({name: name}, user, {}, func);
    }

    function deleteUser(name, func) {
        console.log('UserStore - deleteUser()');
        userDb.remove({name: name}, {}, func);
    }

    //=====================================================================
    // public API
    //=====================================================================
    var UserStore = {};
    UserStore.getAllUsers = getAllUsers;
    UserStore.findUser = findUser;
    UserStore.addUser = addUser;
    UserStore.updateUser = updateUser;
    UserStore.deleteUser = deleteUser;

    module.exports = UserStore;

}());