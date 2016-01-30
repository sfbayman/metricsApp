var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();
var debug = require('debug')('mindScoper:server');
var http = require('http');

var app = express();

// view engine setup
app.set("root", path.join(__dirname, ''));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

//Initialize Routes
require('./config/routes').init(app);

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
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var port = process.env.PORT || '9999';
app.set('port', port);

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
    console.log("Express server listening on " + bind);
}

/**
 * Create HTTP server.
 */
var server = http.createServer(app);
var io = require('socket.io')(server);
server.listen(port);
server.on('listening', onListening);

/****Socket configuration******/

// io.on('connection', function(socket) {
//     console.log("socket created");
//     socket.emit('open', {
//         hello: 'world'
//     });
//     socket.on('my_other_event', function(data) {
//         console.log(data);
//     });
// });

module.exports = app;