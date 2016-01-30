/**
 * Module dependencies.
 */
var express = require('express'),
    flash = require('connect-flash'),
    helpers = require('view-helpers'),
    compression = require('compression'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    i18n = require('i18n-2'),
    multipart = require('connect-multiparty'),
    multer = require('multer');

var cdsConfig = require('cds-config');

module.exports = function(app, passport) {

    console.log('Initializing Express');

    app.set('showStackError', true);

    app.use(compression({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    //Setting the fav icon and static folder
    //app.use(favicon(cdsConfig.root + '/public/img/icons/favicon.ico'));
    var pbc = app.get("root") + '/public';
    app.use(express.static(pbc));

    //Don't use logger for test env
    if (app.get('env') === 'development') {
        app.locals.pretty = true;
        app.use(logger('dev'));
    }

    //Set views path, template engine and default layout
    app.set('views', pbc + '/views');
    app.engine('html', require('ejs').renderFile);

    //file upload
    app.use(multer({
        dest: cdsConfig.image.rootPath + cdsConfig.image.path,
        rename: function(fieldname, filename) {
            return filename;
        }
    }));

    //Enable jsonp
    app.enable("jsonp callback");

    if (process.env.NODE_ENV === 'development') {
        i18n.expressBind(app, {
            // setup some locales - other locales default to en silently
            locales: ['en', 'de'],
            // set the default locale
            defaultLocale: 'en',
            // set the cookie name
            cookieName: 'locale'
        });

        // set up the middleware
        app.use(function(req, res, next) {
            //req.i18n.setLocaleFromQuery();
            req.i18n.setLocaleFromCookie();
            next();
        });

        //cookieParser should be above session
        app.use(cookieParser());

        // request body parsing middleware should be above methodOverride
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(bodyParser.json());
        app.use(methodOverride());


        app.use(session({
            resave: false, // don't save session if unmodified
            saveUninitialized: false, // don't create session until something stored
            secret: cdsConfig.session.key,
            cookie: {
                _expires: cdsConfig.session.maxAge
            }
        }));

        //connect flash for flash messages
        app.use(flash());

        //dynamic helpers
        app.use(helpers(cdsConfig.app.name));

        //use passport session
        app.use(passport.initialize());
        app.use(passport.session());

        //Assume "not found" in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
        app.use(function(err, req, res, next) {
            //Treat as 404
            if (~err.message.indexOf('not found')) return next();

            //Log it
            console.error(err.stack);

            //Error page
            res.status(500).render('500', {
                error: err.stack
            });
        });

        //Assume 404 since no middleware responded
        app.use(function(err, req, res, next) {
            res.status(404).render('404', {
                url: req.originalUrl,
                error: 'Not found'
            });
        });

    }
};
