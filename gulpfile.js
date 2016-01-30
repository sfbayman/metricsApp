//*********** IMPORTS *****************//
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    cssBase64 = require('gulp-css-base64'),
    gutil = require('gulp-util'),
    rename = require("gulp-rename"),
    map = require("map-stream"),
    livereload = require("gulp-livereload"),
    concat = require("gulp-concat"),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    gulpIgnore = require('gulp-ignore'),
    concatCss = require('gulp-concat-css'),
    gulpCopy = require('gulp-copy'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    clean = require('gulp-clean'),
    browserSync = require('browser-sync').create(),
    sourcemaps = require('gulp-sourcemaps'),
    add = require('gulp-add'),
    vsource = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    babelify = require('babelify'),
    open = require('gulp-open'),
    gls = require('gulp-live-server'),
    webpack = require("webpack"),
    WebpackDevServer = require("webpack-dev-server"),
    webpackConfig = require("./webpack.config.js"),
    stream = require('webpack-stream');

var env = process.env.NODE_ENV || 'development',
    gConfig = require("./config/gulpConfig_" + env);

var gServer = gls.new('app.js'),
    serverPromise;

global.errorMessage = '';

//build datestamp for cache busting
var getStamp = function() {
    var stampDate = new Date();
    var stampYear = stampDate.getFullYear().toString();
    var stampMonth = ('0' + (stampDate.getMonth() + 1)).slice(-2);
    var stampDay = ('0' + stampDate.getDate()).slice(-2);
    var stampSeconds = stampDate.getSeconds().toString();
    var stampFullDate = stampYear + stampMonth + stampDay + stampSeconds;
    return stampFullDate;
};


var sassConfig = [{
    watch: 'public/src/scss/**/*.scss',
    paths: ['public/src/scss/app-main.scss', 'public/src/scss/webfonts/**.scss'],
    output: 'public/dist/css/',
    name: 'app-main.css',
    excludedFiles: 'public/src/css/webfonts/**.scss',
    compileOptions: {
        'style': 'expanded', // expanded compressed
        'unixNewlines': true,
        'cacheLocation': './.sass_cache',
        'sourcemap': true
    }
}];

var filePaths = {
    src: 'public/src',
    dist: 'public/dist/',
    js: ['scripts/**/*.js', '!scripts/libs/**/*.js'],
    libs: ['public/src/js/lib/**/*.js'],
    libsTarget: 'public/dist/js/lib/',
    styles: ['styles/**/*.css'],
    views: "public/src/views/layouts/index.html",
    viewsTarget: "public/dist/",
    images: "public/src/images/**/**",
    imagesTarget: "public/dist/images/",
    fonts: "public/src/fonts/**/**",
    fontsTarget: "public/dist/fonts/",
    extras: ['crossdomain.xml', 'humans.txt', 'manifest.appcache', 'robots.txt', 'favicon.ico']
};

gulp.task('clean', function() {
    return gulp.src(filePaths.dist)
        .pipe(clean());
});

gulp.task("copysource", function() {
    gulp.src(filePaths.images)
        .pipe(gulp.dest(filePaths.imagesTarget));
    gulp.src(filePaths.fonts)
        .pipe(gulp.dest(filePaths.fontsTarget));
})


gulp.task('sass', function() {
    return sass(sassConfig[0].paths[0], sassConfig[0].compileOptions)
        .on('error', sass.logError)
        .pipe(sourcemaps.write())
        .pipe(cssBase64({
            baseDir: "./public",
            maxWeightResource: 1000000
        }))
        .pipe(gulp.dest(sassConfig[0].output))
});

gulp.task('server', function() {
    var serverPromise = gServer.start();
    serverPromise.then(function() {});

    /*Available app options*/
    /*'google-chrome' // Linux 
    'chrome' // Windows 
    'google chrome' or 'Google Chrome' // OSX 
    'firefox'*/

    gulp.src('./public/views/layouts/index.html')
        .pipe(open({
            uri: 'http://localhost:' + gConfig.port,
            app: gConfig.browser || 'chrome'
        }));

    gulp.watch(['./public/views/**/*.html', './public/dist/css/**/*.css', './public/dist/js/**/*.js'], function(file) {
        gServer.notify.call(gServer, file);
    });

    gulp.watch('app.js', function() {
        gServer.start.bind(gServer)()
    });
});

/*****Webpack task configuartion*****/

var path = {
    HTML: 'src/index.html',
    ALL: ['public/src/js/**/*.jsx', 'public/src/js/**/*.js'],
    MINIFIED_OUT: 'build.min.js',
    DEST_SRC: 'dist/src',
    DEST_BUILD: 'public/dist/js',
    DEST: 'dist'
};
gulp.task('webpack', [], function() {
    return gulp.src(path.ALL) // gulp looks for all source files under specified path
        .pipe(sourcemaps.init()) // creates a source map which would be very helpful for debugging by maintaining the actual source code structure
        .pipe(stream(webpackConfig)) // blend in the webpack config into the source files
        .pipe(uglify()) // minifies the code for better compression
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.DEST_BUILD));
});


gulp.task("webpack-dev-server", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "eval";
    myConfig.debug = true;
    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        publicPath: "/" + myConfig.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function(err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
});



gulp.task("build", ["copysource", "sass"]);
gulp.task("default", ["copysource", "sass"]);