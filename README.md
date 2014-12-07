# forgeddit

Mini-Projekt im Rahmen des CAS-Frontend Engineering

## Installation

First clone the project from the git repository and then install the libraries:

```
npm install
bower install
gulp build
```

##Start server
```
npm start
```

##Start development with live-reload environment

```
gulp dev
```

##Run tests

Unit-Tests
```
gulp test-unit
```
E2E-Tests (Server must running)

```
protractor  ./test/protractor.conf.js
```

Protractor installation (if needed)
```
npm install -g protractor
webdriver-manager update
```

##Initial Users:
 - admin password: admin_secret
 - user  password: user

This users will be generated automatically on server-start if they don't exist. For security reasons please change
their passwords as soon as possible after going online!

##Initial links
If the database is empty on server-start, Four links will be generated automatically.

##Features

###Not signed in
 - Browse the links and comments
 - Change sort order: "Newest" or "Most voted"
 - Sign in
 - Create account

###Signed in
 - Set Filter: "No filter", "Just mine", "Commented", "Voted"
 - Add links*
 - Edit link title*
 - Delete own links
 - Vote any links* (once per link up or down)
 - Add Comments to any link
 - Change password
 *(Live-Update in other browsers)

###Signed in as Admin
 - Add a new user
 - Change password
 - Change user role
 - Delete any Link
 - Block an unfriendly user
 - Delete an user

###Specials
 - Screenreader-Support on the icon's
 - Inpage-Editor for the Link-Field
