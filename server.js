var express = require('express.io');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var debug = require('debug')('express-template');

var routes = require('./routes/index');
var api = require('./routes/api');
var user = require('./routes/user');
var vote = require('./routes/vote');

var app = express();
app.http().io();

app.use(favicon(__dirname + '/app/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app')));

//app.use(expressJwt({secret:user.jwtSecret}).unless({path: ['/', '/api/users/login', '/api/links', '/api/users', '/api/votes/']}));
app.use('/', routes);
app.use('/api', api);
app.use('/api/users', user);
app.use('/api/votes', vote);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.send('<h1>' + err.status + '</h1><p>' + err.message + '</p>');
});

// Start the server
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});

app.io.route('updateLink', function(req) {
   req.io.broadcast('updateLink', req.params.linkId);
});
