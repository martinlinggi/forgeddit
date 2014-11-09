/**
 * Created by martinlinggi on 30.06.14.
 */


var DataStore = require('nedb');

var userDb = new DataStore();

var UserStore = {};

userDb.insert({
    "name": "admin",
    "password": "admin_secret",
    "role": "Administrator",
    "active": true,
    "registrationDate": new Date(2014,08,01,15,34,0,0).getTime(),
    "lastLogin": new Date(2014,10,20,08,21,0,0).getTime()
}, function(err, doc) {
    if (err) {
        console.dir(err);
    }
    else {
        console.dir(doc);
    }
});

userDb.insert({
    "name": "tinMan",
    "password": "tinMan",
    "role": "User",
    "active": true,
    "registrationDate": new Date(2014,10,21,21,28,0,0).getTime(),
    "lastLogin": new Date(2014,10,21,21,28,0,0).getTime()
}, function(err, doc) {
    if (err) {
        console.dir(err);
    }
    else {
        console.dir(doc);
    }
});

userDb.insert({
    "name": "MaliMaster",
    "password": "MaliMaster",
    "role": "User",
    "active": true,
    "registrationDate": new Date(2014,09,3,14,47,0,0).getTime(),
    "lastLogin": new Date(2014,11,20,13,32,56,0).getTime()
}, function(err, doc) {
    if (err) {
        console.dir(err);
    }
    else {
        console.dir(doc);
    }
});

// User related functions
UserStore.getAllUsers = getAllUsers;
UserStore.findUser = findUser;
UserStore.addUser = addUser;
UserStore.updateUser = updateUser;



function getAllUsers(func) {
    console.log('UserStore - getAllUsers()');
    userDb.find({}, func);
}

function findUser(name, func) {
    console.log('UserStore - findUser()');
    userDb.findOne({name: name}, func);
}

function addUser(user, func) {
    console.log('UserStoreUserStore - addUser()');
    userDb.insert(user, func);
}

function updateUser(name, user, func)
{
    console.log('UserStoreUserStore - updateUser()');
    userDb.update({name: name}, user, {}, func);
}

function deleteUser(name, user, func)
{
    console.log('UserStoreUserStore - deleteUser()');
    userDb.update({name: name}, user, {}, func);
}



module.exports = UserStore;
