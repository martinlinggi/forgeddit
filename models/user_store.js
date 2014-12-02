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
                    "registrationDate": new Date().getTime(),
                    "salt":"oaXCEerc/V5TtWn4t4c2pHQGahYdDrtDeg6oEkDmyWjqWnC7ndePDNVLO5y/hizKDbS6qZstKxRkI/ZsV3Svc7rfrX975SyyBPOsIwg+QGXQbs/j/k7m8XFSblFyVBTsf3pB6kDyEpeEq+MOdBhfWwmhNA3osODyYdo1Z3GeHL8=",
                    "hash":[200,90,30,104,97,168,19,107,21,52,17,152,137,142,253,17,194,38,121,130,49,25,10,178,147,58,86,27,220,11,94,5,238,83,182,122,170,73,44,198,22,69,141,4,86,0,54,64,125,28,233,157,56,133,175,196,14,88,193,94,214,116,86,237,248,175,102,71,102,155,23,237,180,135,211,164,24,118,7,130,5,2,233,119,19,208,229,135,48,168,162,180,83,89,245,60,200,31,127,219,81,209,165,5,57,39,225,187,129,134,245,67,157,246,216,15,66,12,116,31,110,61,230,179,17,59,86,131]}
                , function (err) {
                if (err) {
                    console.dir(err);
                }
                else {
                    console.log('user "admin" created');
                }
            });

        }
        else {
            console.log('user "admin" already exists: Nothing to do');
        }
    });
    userDb.findOne({"name": "user"}, function (err, admin) {
        if (admin === null) {
            userDb.insert({
                    "name":"user",
                    "blocked":false,
                    "role":"User",
                    "registrationDate": new Date().getTime(),
                    "salt":"/c5p/EcWf6MKrcNm+XvgzTJ8fVPe+KrsZXjZ8wo58fvpXhnZo0y8yofmSjoxl0+aKpaS/3+43I+r3o8CnIr6LsECRjCCyE89wxaq/26o3+GtgAh5/EjRAoq6C4ABxruFguZZI5gDa4rowi/GVq52rZ7b3X/+idDNPll1FiueY6g=",
                    "hash":{"0":84,"1":200,"2":248,"3":235,"4":140,"5":244,"6":119,"7":35,"8":81,"9":47,"10":10,"11":59,"12":0,"13":78,"14":189,"15":182,"16":83,"17":179,"18":227,"19":24,"20":74,"21":118,"22":0,"23":255,"24":215,"25":192,"26":164,"27":118,"28":179,"29":139,"30":84,"31":250,"32":206,"33":81,"34":180,"35":201,"36":34,"37":141,"38":160,"39":224,"40":244,"41":75,"42":217,"43":91,"44":221,"45":1,"46":9,"47":99,"48":132,"49":193,"50":184,"51":147,"52":144,"53":83,"54":180,"55":85,"56":116,"57":181,"58":133,"59":130,"60":145,"61":159,"62":72,"63":72,"64":74,"65":184,"66":237,"67":115,"68":108,"69":30,"70":240,"71":255,"72":112,"73":77,"74":81,"75":40,"76":9,"77":230,"78":173,"79":196,"80":78,"81":195,"82":51,"83":186,"84":38,"85":15,"86":45,"87":161,"88":155,"89":228,"90":5,"91":57,"92":99,"93":52,"94":222,"95":181,"96":16,"97":233,"98":90,"99":176,"100":207,"101":134,"102":77,"103":16,"104":182,"105":236,"106":153,"107":19,"108":208,"109":48,"110":32,"111":228,"112":104,"113":70,"114":158,"115":70,"116":80,"117":31,"118":33,"119":194,"120":100,"121":220,"122":89,"123":137,"124":242,"125":11,"126":86,"127":82,"length":128}}
                , function (err) {
                    if (err) {
                        console.dir(err);
                    }
                    else {
                        console.log('user "user" created');
                    }
                });

        }
        else {
            console.log('user "user" already exists: Nothing to do');
        }
    });

    function getAllUsers(func) {
        console.log('UserStore - getAllUsers()');
        userDb.find({}, func);
    }

    function findUser(name, func) {
//        console.log('UserStore - findUser()' + name);
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