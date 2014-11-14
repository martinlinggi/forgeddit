/**
 * Created by martinlinggi on 30.06.14.
 */

(function() {

    var DataStore = require('nedb');
    var path = require('path');

    var userDb = new DataStore({filename: path.join(__dirname, '../db/user.db'), autoload: true});

    userDb.findOne({"name": "admin"}, function (err, admin) {
        if (admin === null) {
            userDb.insert({
                "name": "admin",
                "password": "admin_secret",
                "role": "Administrator",
                "active": true,
                "registrationDate": new Date().getTime(),
                "lastLogin": 0
            }, function (err, doc) {
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

    function deleteUser(name, user, func) {
        console.log('UserStoreUserStore - deleteUser()');
        userDb.update({name: name}, user, {}, func);
    }

    var UserStore = {};
    UserStore.getAllUsers = getAllUsers;
    UserStore.findUser = findUser;
    UserStore.addUser = addUser;
    UserStore.updateUser = updateUser;

    module.exports = UserStore;

}());