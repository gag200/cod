// Adding required modules
var config = require('./config');
var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var index = require('./routes/index');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (config.debug) {
    app.use(function(req, res, next) {
        console.log('(%s)[%s] %s', req.ip, req.method, req.path);
        next();
    });
}

//set the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//set the config
app.set('config', config);

// Adding routes
app.use(config.app.wwwroot, express.static(__dirname + '/public'));
app.use(config.app.wwwroot, index);

// error handlers 
app.use(function(req, res, next) {
    res.status(404).redirect('/')
})


var server = app.listen(config.app.port, function() {
    console.log('Listening on port ' + config.app.port);
});

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

module.exports = app;
