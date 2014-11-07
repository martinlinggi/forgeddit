/**
 * Created by martinlinggi on 31.10.14.
 */

describe("E2E: User list view", function() {

    beforeEach(function() {
        browser().navigateTo('/#/login');
        browser().reload();
        loginAsAdmin('#submitLogin');
        browser().navigateTo('/#/admin/users');
        browser().reload();
    });

    var selector = 'table.user-list tr';

    it('should show the correct number of users', function() {
        expect(repeater(selector).count()).toEqual(expectedUsers.length);
    });

    it('should show the correct user information', function() {
// Do the other book details (isbn, author) match?
        for (var i = 0, n = expectedUsers.length; i < n; i++) {
            expect(repeater(selector).row(i))
                .toEqual(
                [
                    expectedUsers[i].name,
                    expectedUsers[i].role
                ]
            );
        }
    });

   var loginAsAdmin = function(submitSelector) {
        input('login.email').enter('admin');
        input('login.password').enter('admin_secret');
        element(submitSelector).click();
   };

   var expectedUsers = [
       {
           name: "admin",
           password: "admin_secret",
           role: "Administrator",
           active: true,
           registration_date: new Date(2014,8,1,15,34,0,0).getTime(),
           last_login: new Date(2014,10,20,8,21,0,0).getTime()
       },
       {
           name: "MaliMaster",
           password: "MaliMaster",
           role: "User",
           active: true,
           registration_date: new Date(2014,9,3,14,47,0,0).getTime(),
           last_login: new Date(2014,11,20,13,32,56,0).getTime()
       },
       {
           name: "tinMan",
           password: "tinMan",
           role: "User",
           active: true,
           registration_date: new Date(2014,10,21,21,28,0,0).getTime(),
           last_login: new Date(2014,10,21,21,28,0,0).getTime()
       }
   ];
});