/**
 * Created by ma-li on 11.10.14.
 */

describe("E2E: User functions:", function() {

    function signInAs(user, password) {

        // navigate to login screen
        element(by.css('.signIn')).click();

        // singn in as admin
        element(by.model('login.email')).sendKeys(user);
        element(by.model('login.password')).sendKeys(password);
        element(by.id('submitLogin')).click();

    }

    beforeEach(function() {
        browser.get('http://localhost:3000/#/');
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('Forgeddit');
    });


    it('should sign in and sign out as "admin"', function() {

        signInAs('admin', 'admin_secret');

        // check if signed in as admin
        expect(element(by.css('.userName')).getText()).toEqual('admin');

        // check if link "settings" is visible
        expect(element(by.css('.adminSettings')).isPresent()).toBeTruthy();

        // sign out
        element(by.id('signOut')).click();

        // check if signed oud
        expect(element(by.css('.userName')).isPresent()).toBeFalsy();

    });

    it('should sign in and sing out as "user"', function() {

        signInAs('user', 'user');

        // check if signed in as user
        expect(element(by.css('.userName')).getText()).toEqual('user');

        // check if link "settings" is not visible
        expect(element(by.css('.adminSettings')).isPresent()).toBeFalsy();

        // sign out
        element(by.id('signOut')).click();

        // check if signed oud
        expect(element(by.css('.userName')).isPresent()).toBeFalsy();

    });

    it('should fail to sign in with wrong username and existing password', function() {

        signInAs('xyz', 'user');

        //check if Error appears
        expect(element(by.css('span.error')).isPresent()).toBeTruthy();

    });

    it('should fail to sign in with existing username and wrong password', function() {

        signInAs('user', 'wrong');

        //check if Error appears
        expect(element(by.css('span.error')).isPresent()).toBeTruthy();

    });

    it('admin shoud add a new user "test"', function() {

        // sign in as Admin
        signInAs('admin', 'admin_secret');

        // navigate to the user-form
        element(by.css('.adminSettings')).click();
        element(by.css('.addUser')).click();

        // fill in data
        element(by.id('username')).sendKeys('test1');
        element(by.id('inputPasswordAdmin')).sendKeys('test1');
        element(by.id('confirmAddUser')).click();

        // sign out as admin, sign in as test
        element(by.id('signOut')).click();
        signInAs('test1', 'test1');

        // check if signed in as test and sign out
        expect(element(by.css('.userName')).getText()).toEqual('test1');
        element(by.id('signOut')).click();

    });

    it('shoud create an account and successfully sign in', function() {

        // navigate to the user-form
        element(by.css('.createAccount')).click();

        // fill in data
        element(by.id('username')).sendKeys('test2');
        element(by.id('inputPasswordUser')).sendKeys('test2');
        element(by.id('confirmAddUser')).click();

        //check if No Error appears
        expect(element(by.css('span.error')).isDisplayed()).toBeFalsy();

        // Try to sign in
        element(by.id('signIn')).click();
        signInAs('test2', 'test2');

        // check if signed in as test and sign out
        expect(element(by.css('.userName')).getText()).toEqual('test2');
        element(by.id('signOut')).click();

    });

    it('shoud fail create to an account with an exisitng name  ("user")', function() {

        // navigate to the user-form
        element(by.css('.createAccount')).click();

        // fill in data
        element(by.id('username')).sendKeys('user');
        element(by.id('inputPasswordUser')).sendKeys('userpw');
        element(by.id('confirmAddUser')).click();

        // Try to sign in - should not work
        element(by.id('signIn')).click();
        signInAs('user', 'userpw');

        //check if Error appears
        expect(element(by.css('span.error')).isPresent()).toBeTruthy();

    });


});